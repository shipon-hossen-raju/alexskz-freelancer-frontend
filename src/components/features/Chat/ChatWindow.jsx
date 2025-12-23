"use client";
import { ZoomTitleInputModal } from "@/components/modals/ZoomTitleInputModal";
import { useSocket } from "@/hooks/useSocket";
import { Drawer } from "antd";
import { format } from "date-fns";
import { ChevronLeft, Video } from "lucide-react";
import Image from "node_modules/next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MessageInput from "./MessageInput";
import RightSidebar from "./RightSidebar";

export default function ChatWindow({ onBack = () => {} }) {
  const { socket, authenticate } = useSocket();
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [messages, setMessages] = useState([]); // ascending oldest -> newest
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const messagesRef = useRef(null);
  const pageRef = useRef(1);
  const limit = 500 ;
  const userProfile = useSelector((state) => state.user?.user || null);

  // Redux: selected conversation
  const {
    receiver,
    chatRoomId: roomId,
    unreadMessage,
  } = useSelector((state) => state.chat);

  // Keep refs for latest room & receiver so socket handlers read latest values
  const roomRef = useRef(roomId);
  useEffect(() => {
    roomRef.current = roomId;
  }, [roomId]);

  // Helper: current user id
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
      if (messagesRef.current)
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    } catch {}
  };

  const fetchMessages = (roomToFetch, page = 1) => {
    if (!socket || !roomToFetch) return;
    setLoading(true);
    setError(null);
    socket.emit("getMessages", { roomId: roomToFetch, page, limit });
  };

  // --- register socket listeners ONCE (stable) ---
  useEffect(() => {
    if (!socket) return;

    // try authenticate if token exists
    const token = localStorage.getItem("user-token");
    if (token) authenticate(token);

    const onGetMessages = (payload) => {
      const msgs = Array.isArray(payload?.messages)
        ? payload.messages.slice().reverse()
        : [];
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
      // console.error("[chat] socket error:", err);
      setError(err?.message || "Socket error");
      setLoading(false);
    };

    socket.on("getMessages", onGetMessages);
    socket.on("receiveMessage", onReceiveMessage);

    socket.on("receiveMessage", (message) => {
      console.log("[SOCKET] receiveMessage event triggered");
      console.log("Message data:", message);
    });
    socket.on("error", onError);

    return () => {
      socket.off("getMessages", onGetMessages);
      socket.off("receiveMessage", onReceiveMessage);
      socket.off("error", onError);
    };
  }, [socket]);

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

  const handleSendTitle = async (title) => {
    // console.log("Title sent:", title)
    // Add your logic here
    setIsZoomModalOpen(false);
  };

  //for right sidebar
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // --- UI render ---
  return (
    <div className="h-screen flex flex-col lg:flex">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={onBack}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {receiver && (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={showDrawer}
            >
              {receiver?.profileImage ? (
                <img
                  src={receiver.profileImage}
                  alt={receiver.firstName}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    {receiver?.firstName?.[0]}
                  </span>
                </div>
              )}

              <div>
                <div className="flex gap-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {receiver?.firstName ?? ""}
                  </h2>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {receiver?.lastName ?? ""}
                  </h2>
                </div>
                {/* <p className="text-sm text-gray-500">Online</p> */}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsZoomModalOpen(true)}
          className=" p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <Video className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* unread indicator */}
      {unreadMessage > 0 && (
        <div className="flex items-center justify-center py-2 bg-transparent">
          <div className="rounded-full px-4 py-1 text-xs text-gray-600 shadow-sm">
            {unreadMessage} unread messages
          </div>
        </div>
      )}

      {/* messages */}
      <Messages
        messages={messages}
        loading={loading}
        error={error}
        currentUserId={currentUserId}
        messagesRef={messagesRef}
        receiver={receiver}
        userProfile={userProfile}
      />

      {/* drawer */}
      <div>
        <Drawer
          title="Settings"
          closable={{ "aria-label": "Close Button" }}
          onClose={onClose}
          open={open}
        >
          <RightSidebar receiver={receiver} />
        </Drawer>
      </div>

      {/* read-only input area (UI only) */}
      <div className="">
        <MessageInput chatRoomId={roomId} />
      </div>

      {/* Zoom Modal */}
      <ZoomTitleInputModal
        isOpen={isZoomModalOpen}
        onClose={() => setIsZoomModalOpen(false)}
        chatRoomId={roomId}
      />
    </div>
  );
}

function Messages({
  messages,
  loading,
  error,
  currentUserId,
  messagesRef,
  receiver,
  userProfile,
}) {
  return (
    <div
      ref={messagesRef}
      className="flex-1 overflow-auto px-4 py-6 space-y-4 bg-white"
    >
      {loading && (
        <div className="text-sm text-gray-500 px-2 text-center">
          Select an user to start chatting
        </div>
      )}
      {error && <div className="text-sm text-red-500 px-2">{error}</div>}

      {!loading && !error && messages.length === 0 && (
        <div className="text-sm text-gray-500 px-2 text-center">
          Select a user to start or No messages yet.
        </div>
      )}

      {messages.map((m) => {
        const isMe = currentUserId
          ? String(m.senderId) === String(currentUserId)
          : false;
        const text = m.message ?? "";
        const date = m.createdAt ? formatDate(m.createdAt) : "";
        const time = m.createdAt ? formatTime(m.createdAt) : "";
        const images = m.images ?? "";
        const meeting = m.meeting ?? "";
        const meetingTime = m.meeting?.startTime ?? "";
        const meetingLink = m.meeting?.joinUrl ?? "";

        let formattedMeetingTime = "";
        if (meetingTime) {
          const meetingdate = new Date(meetingTime);
          formattedMeetingTime = format(
            meetingdate,
            "EEEE, MMM dd, yyyy • h:mm a"
          );
        }

        // console.log("single meeting:", meeting)

        if (isMe) {
          // sender (right)
          return (
            <div key={m.id} className="flex gap-3 justify-end">
              <div className="max-w-[44%]">
                {text && (
                  <div
                    style={{ background: "#EEF8F0" }}
                    className="rounded-2xl rounded-br-none px-4 py-3 break-words"
                  >
                    <p className="text-sm text-gray-800">{text}</p>
                  </div>
                )}

                {images &&
                  images.map((image) => {
                    // console.log('single msg images: ', image)
                    return (
                      <div>
                        <Image
                          src={image}
                          alt="images"
                          width={100}
                          height={100}
                          className="rounded"
                        />
                      </div>
                    );
                  })}

                {meeting && (
                  <div>
                    {/* meeting card */}
                    <div className="flex flex-col md:flex-row items-center gap-4 border border-gray-200 rounded-xl p-4 max-w-full md:max-w-md shadow-sm">
                      <div className="bg-blue-500 rounded-lg p-3">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h4 className="text-sm font-semibold text-gray-900 font-adamina">
                          {meeting.topic ?? "Topic"}
                        </h4>
                        <p className="text-xs text-gray-500">Zoom Meeting</p>
                        <p className="text-xs text-gray-500">
                          {formattedMeetingTime}
                        </p>
                      </div>
                      <a
                        href={meetingLink}
                        target="_blank"
                        className="bg-[#1DBF73] cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        Join
                      </a>
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1 mr-2 text-right">{`${date} ${time}`}</p>
              </div>
              {userProfile?.profileImage ? (
                <img
                  src={userProfile.profileImage}
                  alt={userProfile.firstName}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg">
                    {userProfile?.firstName?.[0] ?? "U"}
                  </span>
                </div>
              )}
            </div>
          );
        }

        // receiver (left)
        return (
          <div key={m.id} className="flex items-start gap-3">
            {receiver?.profileImage ? (
              <img
                src={receiver.profileImage}
                alt={receiver.firstName}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg">
                  {receiver?.firstName?.[0] ?? "U"}
                </span>
              </div>
            )}

            <div className=" max-w-[44%]">
              {text && (
                <div
                  style={{ background: "#E8EDF0" }}
                  className="rounded-2xl rounded-bl-none px-4 py-3 break-words"
                >
                  <p className="text-sm text-gray-800">{text}</p>
                </div>
              )}

              {images &&
                images.map((image) => {
                  // console.log('single msg images: ', image)
                  return (
                    <div>
                      <Image
                        src={image}
                        alt="images"
                        width={100}
                        height={100}
                        className="rounded"
                      />
                    </div>
                  );
                })}
              <p className="text-xs text-gray-400 mt-1 ml-2">{`${date} — ${time}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso ? iso.split("T")[0] : "";
  }
}
function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}
