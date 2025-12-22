
// hooks/useSocket.js
"use client";

import { config } from "@/config";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const BACKEND_URL = config.backend_url

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
