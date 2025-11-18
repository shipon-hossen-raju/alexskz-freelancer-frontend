"use client";
import React, { useEffect, useRef, useState } from "react";
import { Video, ChevronLeft } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "@/redux/auth/authApi";


export default function ChatWindow({ onBack = () => {} }) {
  // --- hooks (declare at top) ---
  const { socket, authenticate } = useSocket();

  const [messages, setMessages] = useState([]); // ascending oldest -> newest
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const messagesRef = useRef(null);
  const pageRef = useRef(1);
  const limit = 50;

  const { data: userProfile, isLoading: profileLoading } = useGetUserProfileQuery();

  // Redux: selected conversation
  const { receiver, chatRoomId: roomId, unreadMessage } = useSelector((state) => state.chat);

  // Keep refs for latest room & receiver so socket handlers read latest values
  const roomRef = useRef(roomId);
  useEffect(() => {
    roomRef.current = roomId;
  }, [roomId]);

  // Helper: current user id (must be stored at login)
  const getCurrentUserId = () => {
    try {
      if (typeof window === "undefined") return null;
      return localStorage.getItem("user-id") || null;
    } catch {
      return null;
    }
  };
  const currentUserId = getCurrentUserId();



  // --- helpers ---
  const scrollToBottom = () => {
    try {
      if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    } catch {}
  };

  const fetchMessages = (roomToFetch, page = 1) => {
    if (!socket || !roomToFetch) return;
    setLoading(true);
    setError(null);
    socket.emit("getMessages", { roomId: roomToFetch, page, limit });
  };

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return iso ? iso.split("T")[0] : "";
    }
  };
  const formatTime = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  // --- register socket listeners ONCE (stable) ---
  useEffect(() => {
    if (!socket) return;

    // try authenticate if token exists
    const token = localStorage.getItem("user-token");
    if (token) authenticate(token);

    const onGetMessages = (payload) => {
      const msgs = Array.isArray(payload?.messages) ? payload.messages.slice().reverse() : [];
      setMessages(msgs);
      setLoading(false);
      setError(null);
      setTimeout(scrollToBottom, 50);
    };

    const onReceiveMessage = (payload) => {
      const msg = payload?.message ?? payload;
      if (!msg) return;
      // append only if the incoming message belongs to the currently selected room
      if (String(msg.roomId) === String(roomRef.current)) {
        setMessages((prev) => [...prev, msg]);
        setTimeout(scrollToBottom, 50);
      } else {
        // not current room — optionally update sidebar unread counts elsewhere
      }
    };

    const onError = (err) => {
      console.error("[chat] socket error:", err);
      setError(err?.message || "Socket error");
      setLoading(false);
    };

    socket.on("getMessages", onGetMessages);
    socket.on("receiveMessage", onReceiveMessage);
    socket.on("error", onError);

    return () => {
      socket.off("getMessages", onGetMessages);
      socket.off("receiveMessage", onReceiveMessage);
      socket.off("error", onError);
    };
  }, [socket, authenticate]);

  // --- when roomId changes: reset messages and fetch the new room's messages ---
  useEffect(() => {
    if (!socket || !roomId) return;
    // clear previous conversation immediately so UI shows loading state for new convo
    setMessages([]);
    pageRef.current = 1;
    fetchMessages(roomId, 1);
  }, [socket, roomId]);

  // --- if there's no roomId but we have a receiver id, ask server to join/create room ---
  useEffect(() => {
    if (!socket) return;
    if (roomId) return; // already have a room
    if (!receiver?.id) return;
    socket.emit("joinRoom", { receiverId: receiver.id });
  }, [socket, receiver?.id, roomId]);

  // --- UI render ---
  return (
    <div className="h-screen flex flex-col lg:flex">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg" onClick={onBack}>
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex items-center gap-3">
            {receiver?.profileImage ? (
              <img src={receiver.profileImage} alt={receiver.firstName} className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold">{receiver?.firstName?.[0] ?? "U"}</span>
              </div>
            )}

            <div>
              <div className="flex gap-1">
                <h2 className="text-lg font-semibold text-gray-900">{receiver?.firstName ?? ""}</h2>
                <h2 className="text-lg font-semibold text-gray-900">{receiver?.lastName ?? ""}</h2>
              </div>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
        </div>

        <button className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg">
          <Video className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* unread indicator */}
      {unreadMessage > 0 && (
        <div className="flex items-center justify-center py-2 bg-transparent">
          <div className="rounded-full px-4 py-1 text-xs text-gray-600 shadow-sm">{unreadMessage} unread messages</div>
        </div>
      )}

      {/* messages */}
      <div ref={messagesRef} className="flex-1 overflow-auto px-4 py-6 space-y-4 bg-white">
        {loading && <div className="text-sm text-gray-500 px-2 text-center">Loading messages…</div>}
        {error && <div className="text-sm text-red-500 px-2">{error}</div>}

        {!loading && !error && messages.length === 0 && (
          <div className="text-sm text-gray-500 px-2 text-center">Select a user to start or No messages yet.</div>
        )}

        {messages.map((m) => {
          const isMe = currentUserId ? String(m.senderId) === String(currentUserId) : false;
          const text = m.message ?? "";
          const date = m.createdAt ? formatDate(m.createdAt) : "";
          const time = m.createdAt ? formatTime(m.createdAt) : "";

          if (isMe) {
            // sender (right)
            return (
              <div key={m.id} className="flex gap-3 justify-end">
                <div className="max-w-[44%]">
                  <div style={{ background: "#EEF8F0" }} className="rounded-2xl rounded-br-none px-4 py-3 break-words">
                    <p className="text-sm text-gray-800">{text}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 mr-2 text-right">{`${date} ${time}`}</p>
                </div>
                {userProfile?.data?.profileImage ? (
                  <img src={userProfile.data.profileImage} alt={userProfile.data.firstName} className="w-12 h-12 rounded-full" />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg">{userProfile?.data?.firstName?.[0] ?? "U"}</span>
                  </div>
                )}
              </div>
            );
          }

          // receiver (left)
          return (
            <div key={m.id} className="flex items-start gap-3">
              {receiver?.profileImage ? (
                <img src={receiver.profileImage} alt={receiver.firstName} className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg">{receiver?.firstName?.[0] ?? "U"}</span>
                </div>
              )}

              <div className=" max-w-[44%]">
                <div style={{ background: "#E8EDF0" }} className="rounded-2xl rounded-bl-none px-4 py-3 break-words">
                  <p className="text-sm text-gray-800">{text}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-2">{`${date} — ${time}`}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* read-only input area (UI only) */}
      <div className="">
        <MessageInput disabled />
      </div>
    </div>
  );
}
