
// 'use client'
// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

// export const useSocket = () => {
//   const token = localStorage.getItem('user-token');
//   const backendUrl = "http://10.10.20.2:5005";
//   const socketRef = useRef(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (!token) {
//       console.warn("No token provided, socket will not be initialized.");
//       return;
//     }

//     const skt = io(backendUrl, { auth: { token } });
//     socketRef.current = skt;
//     setSocket(skt);

//     const onConnect = () => console.log("Socket connected from hook:", skt.id);
//     const onDisconnect = () => console.log("Socket disconnected");

//     skt.on("connect", onConnect);
//     skt.on("disconnect", onDisconnect);

//     return () => {
//       skt.off("connect", onConnect);
//       skt.off("disconnect", onDisconnect);
//       skt.disconnect();
//       socketRef.current = null;
//       setSocket(null);
//     };
//   }, [token]);

//   const connected = socket?.connected || false; // ✅ define connected

//   return { socket, connected }; // ✅ now this works
// };


// hooks/useSocket.js
"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const BACKEND_URL = "http://10.10.20.2:5005"; // keep your URL

// singleton socket so HMR/dev doesn't create duplicates
let singletonSocket = null;

export function useSocket(backendUrl = BACKEND_URL) {
  const [connected, setConnected] = useState(false);

  // Ensure single socket instance
  useEffect(() => {
    if (!singletonSocket) {
      singletonSocket = io(backendUrl, {
        autoConnect: true,
        transports: ["websocket"],
        // DON'T pass token here unless you want to use handshake auth.
        // We'll use an explicit authenticate event instead.
      });
    }

    const s = singletonSocket;

    const onConnect = () => {
      setConnected(true);

      // auto re-authenticate on reconnect if token exists
      try {
        const token = localStorage.getItem("user-token");
        if (token) {
          s.emit("authenticate", { token });
        }
      } catch (e) {
        /* ignore in non-browser env */
      }
    };
    const onDisconnect = () => setConnected(false);

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
      // do not disconnect here (we want singleton to survive component unmounts)
    };
  }, [backendUrl]);

  // helper wrappers
  const socket = () => singletonSocket;
  const emit = (ev, payload, ack) => singletonSocket?.emit(ev, payload, ack);
  const on = (ev, cb) => {
    singletonSocket?.on(ev, cb);
    return () => singletonSocket?.off(ev, cb);
  };

  // explicit authenticate function to call when you have a token (e.g. after login)
  const authenticate = (token) => {
    if (!token) return;
    emit("authenticate", { token });
  };

  return {
    socket: singletonSocket,
    connected,
    emit,
    on,
    authenticate,
  };
}
