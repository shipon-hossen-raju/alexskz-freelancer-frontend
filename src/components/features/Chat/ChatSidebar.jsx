 "use client"
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";

export default function ChatSidebar({ onSelectConversation } = {}) {
  const { socket, connected } = useSocket();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Normalize server payload
  const normalizeChatUsers = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.users)) return payload.users;
    if (Array.isArray(payload.data)) return payload.data;
    const arr = Object.values(payload).find((v) => Array.isArray(v));
    return arr || [];
  };

  useEffect(() => {
    if (!socket) return;

    const token = localStorage.getItem("user-token");
    if (!token) {
      setError("No token found in localStorage ('user-token'). Please login.");
      setLoading(false);
      return;
    }

    // --- Event Handlers ---
    const onAuthenticated = () => {
      console.log("[CHAT] authenticated by server");
      socket.emit("getChatUsers"); // fetch chat users
    };

    const onChatUsers = (usersList) => {
      console.log("[CHAT] getChatUsers event:", usersList);
      setUsers(normalizeChatUsers(usersList));
      setLoading(false);
    };

    const onError = (err) => {
      console.error("[CHAT] error:", err);
      setError(err?.message || "Something went wrong");
      setLoading(false);
    };

    const onConnect = () => {
      console.log("[CHAT] socket reconnected");
      socket.emit("authenticate", { token });
    };

    // --- Register Event Listeners ---
    socket.on("authenticate", onAuthenticated);
    socket.on("getChatUsers", onChatUsers);
    socket.on("error", onError);
    socket.on("connect", onConnect);

    // --- Start Authentication ---
    console.log("[CHAT] emit authenticate");
    socket.emit("authenticate", { token });

    // --- Cleanup ---
    return () => {
      socket.off("authenticate", onAuthenticated);
      socket.off("getChatUsers", onChatUsers);
      socket.off("error", onError);
      socket.off("connect", onConnect);
    };
  }, [socket]);

  // --- Filter users based on search query ---
  const filtered = users.filter((item) => {
    console.log(item)
    if (!query) return true;
    const name =
    //   (item.user?.firstName ?? item.user?.name ?? item.user?.username ?? item.firstName ?? item.name ?? "")
        (item.user?.firstName)
        .toString()
        .toLowerCase();
    return name.includes(query.toLowerCase());
  });

  return (
    <div className="w-full lg:w-80 h-[80vh] border-r border-gray-200 flex flex-col lg:flex">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 font-open-sans">Inbox</h1>
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
        {loading && <div className="px-6 py-4 text-sm text-gray-500 font-poppins">Loading users…</div>}
        {error && <div className="px-6 py-4 text-sm text-red-500">{error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="px-6 py-4 text-sm text-gray-500 font-poppins">No users found</div>
        )}

        {!loading &&
          !error &&
          filtered.map((item) => {
            const userObj = item.user ?? item;
            const id = userObj.id ?? item.roomId ?? item._id ?? JSON.stringify(item);
            const name = `${userObj.firstName ?? userObj.name ?? "User"} ${userObj.lastName ?? ""}`.trim();
            const avatar =
              userObj.profileImage ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || id)}`;
            const lastMessage = item.lastMessage?.message ?? "";
            const unread = item.unreadMessageCount ?? 0;
            const isOnline = item.isOnline ?? null;

            return (
              <div
                key={id}
                className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectConversation?.(item)}
              >
                <div className="relative">
                  <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                      isOnline ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 truncate font-poppins">{name}</h3>
                    <span className="text-xs text-gray-500">{unread ? `${unread}` : ""}</span>
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


