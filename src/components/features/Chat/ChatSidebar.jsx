"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { setChatData } from "@/redux/slices/messageSlice";

export default function ChatSidebar() {
  const { socket, connected, authenticate } = useSocket();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const dispatch = useDispatch();

  const normalizeChatUsers = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.users)) return payload.users;
    if (Array.isArray(payload.data)) return payload.data;
    const arr = Object.values(payload).find((v) => Array.isArray(v));
    return arr || [];
  };

  const dedupeUsers = (arr) => {
    if (!Array.isArray(arr)) return [];
    const map = new Map();
    for (const item of arr) {
      const uid = String(item.user?.id ?? item.roomId ?? item._id ?? "");
      if (!uid) continue;
      if (!map.has(uid)) {
        map.set(uid, item);
      } else {
        const existing = map.get(uid);
        map.set(uid, {
          ...existing,
          ...item,
          lastMessage: item.lastMessage || existing.lastMessage,
          unreadMessageCount: item.unreadMessageCount ?? existing.unreadMessageCount,
        });
      }
    }
    return Array.from(map.values());
  };

  const { receiver: reduxReceiver, chatRoomId: reduxRoomId } = useSelector((state) => state.chat ?? {});

  useEffect(() => {
    if (!socket) return;
    setLoading(true);

    const onAuthenticated = () => {
      // console.log("[CHAT] authenticated by server");
      socket.emit("getChatUsers");
    };

    const onChatUsers = (usersList) => {
      // console.log("[CHAT] getChatUsers event:", usersList);
      const normalized = normalizeChatUsers(usersList);
      const unique = dedupeUsers(normalized);
      setUsers(unique);
      setLoading(false);
      setError(null);
    };

    const onError = (err) => {
      // console.error("[CHAT] error:", err);
      setError(err?.message || "Something went wrong");
      setLoading(false);
    };

    // NEW: update online/offline status for a single user
    const onUserStatus = (data) => {
      if (!data) return;
      const userId = String(data.userId ?? data.id ?? "");
      const isOnline = !!data.isOnline;
      if (!userId) return;

      setUsers((prev) => {
        // update matching item(s)
        const updated = prev.map((item) => {
          const uid = String(item.user?.id ?? item.roomId ?? "");
          if (uid === userId) {
            return { ...item, isOnline };
          }
          return item;
        });

        // optional: move that conversation to top when user comes online
        // uncomment to enable:
        // if (isOnline) {
        //   const idx = updated.findIndex(it => String(it.user?.id ?? it.roomId ?? "") === userId);
        //   if (idx > -1) {
        //     const [item] = updated.splice(idx, 1);
        //     updated.unshift(item);
        //   }
        // }

        return updated;
      });
    };

    // update last message + unread (existing behavior)
    const onReceiveMessage = (payload) => {
      const msg = payload?.message ?? payload;
      if (!msg) return;
      setUsers((prev) => {
        const copy = prev.map((item) => {
          const roomId = String(item.roomId ?? item.room?.id ?? "");
          if (roomId && msg?.roomId && roomId === String(msg.roomId)) {
            return {
              ...item,
              lastMessage: { message: msg.message, createdAt: msg.createdAt },
              unreadMessageCount: (item.unreadMessageCount || 0) + (msg.senderId === (item.user?.id ?? "") ? 0 : 1),
            };
          }
          return item;
        });
        // keep same order
        return copy;
      });
    };

    socket.on("authenticate", onAuthenticated);
    socket.on("getChatUsers", onChatUsers);
    socket.on("error", onError);
    socket.on("userStatus", onUserStatus);
    socket.on("receiveMessage", onReceiveMessage);

    // start auth attempt
    const token = localStorage.getItem("user-token");
    if (token) {
      authenticate(token);
    } else {
      setLoading(false);
      setError("Please login to see your chats.");
    }

    return () => {
      socket.off("authenticate", onAuthenticated);
      socket.off("getChatUsers", onChatUsers);
      socket.off("error", onError);
      socket.off("userStatus", onUserStatus);
      socket.off("receiveMessage", onReceiveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const filtered = users.filter((item) => {
    if (!query) return true;
    const name = (item.user?.firstName ?? item.user?.name ?? "").toString().toLowerCase();
    return name.includes(query.toLowerCase());
  });

  // console.log('chat users: ', users) 

  const handleSelectChat = (selectedUser) =>{

    // console.log('selectedUser', selectedUser?.user)
    const id = selectedUser?.user?.id;
    setSelectedUserId(id);
    setSelectedUser(selectedUser);
    
}


    const roomId = selectedUser?.roomId;
    const unreadMessage = selectedUser?.unreadMessageCount;
    const receiver = selectedUser?.user;

    // console.log('receiver: ', receiver)

    useEffect(() => {
      
      if(selectedUser) {
        dispatch(
          setChatData({
            receiver: receiver,
            chatRoomId: roomId,
            unreadMessage: unreadMessage
          })
        );
      }
    }, [selectedUser, dispatch])

  // Auto-select a conversation when Redux `receiver` is set (e.g., from details page)
  useEffect(() => {
    if (!reduxReceiver) return;
    if (!users || users.length === 0) return;

    // try to find matching user by id or by roomId
    const match = users.find((item) => {
      const uid = String(item.user?.id ?? item.roomId ?? "");
      if (!uid) return false;
      if (String(item.user?.id) === String(reduxReceiver.id)) return true;
      if (String(item.roomId) === String(reduxRoomId)) return true;
      return false;
    });

    if (match) {
      setSelectedUser(match);
      const id = String(match.user?.id ?? match.roomId ?? "");
      setSelectedUserId(id);
    } else {
      // if no existing conversation found, optionally create a temporary item to show selected state
      const temp = {
        user: reduxReceiver,
        roomId: reduxRoomId ?? null,
        lastMessage: null,
        unreadMessageCount: 0,
        isOnline: reduxReceiver?.isOnline ?? false,
      };
      setSelectedUser(temp);
      const id = String(reduxReceiver.id ?? "");
      setSelectedUserId(id);
      // also prepend to users so it appears in sidebar (avoid duplicates thanks to dedupe)
      setUsers((prev) => {
        const merged = [temp, ...(prev || [])];
        return dedupeUsers(merged);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxReceiver, reduxRoomId, users]);

    

  return (
    <div className="w-full lg:w-80 h-screen border-r border-gray-200 flex flex-col lg:flex">
      <div className="p-6 ">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Inbox</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#144A6C]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && <div className="px-6 py-4 text-sm text-gray-500">Loading users…</div>}
        {error && !loading && <div className="px-6 py-4 text-sm text-red-500">{error}</div>}

        {!loading && !error && filtered.length === 0 && <div className="px-6 py-4 text-sm text-gray-500">No users found</div>}

        {!loading &&
          !error &&
          filtered.map((item) => {
            
            const userObj = item.user ?? item;
            const id = userObj.id ?? item.roomId ?? item._id ?? JSON.stringify(item);
            const name = `${userObj.firstName ?? userObj.name ?? "User"} ${userObj.lastName ?? ""}`.trim();
            const avatar = userObj.profileImage;
            const lastMessage = item.lastMessage?.message ?? "";
            const unread = item.unreadMessageCount ?? 0;
            const isOnline = item.isOnline ?? false;

            return (
              <div
                key={id}
                className={`flex items-center gap-3 px-6 py-4 hover:bg-gray-50 cursor-pointer ${selectedUserId === id? "bg-gray-100": ""}`}
                onClick={() => handleSelectChat(item)}
              >
                <div className="relative">
                  {avatar ? (
                    <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center">
                      <p className="text-xl font-semibold ">{name[0]}</p>
                    </div>
                  )}
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                      isOnline ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
                    {unread > 0 && (
                    <span className="text-xs text-gray-900  px-[5px] py-[1px] bg-[#d8ecdc] rounded-full font-medium">{unread}</span>

                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{lastMessage}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

