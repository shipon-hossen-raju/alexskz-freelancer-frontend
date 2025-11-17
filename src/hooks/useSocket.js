
// 'use client'
// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

// export const useSocket = () => {

//   const token = localStorage.getItem('user-token')
  
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
//     setSocket(skt); // 🔑 triggers re-render so consumers get a non-null socket

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

//   return  socket;
// };

'use client'
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const token = localStorage.getItem('user-token');
  const backendUrl = "http://10.10.20.2:5005";
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) {
      console.warn("No token provided, socket will not be initialized.");
      return;
    }

    const skt = io(backendUrl, { auth: { token } });
    socketRef.current = skt;
    setSocket(skt);

    const onConnect = () => console.log("Socket connected from hook:", skt.id);
    const onDisconnect = () => console.log("Socket disconnected");

    skt.on("connect", onConnect);
    skt.on("disconnect", onDisconnect);

    return () => {
      skt.off("connect", onConnect);
      skt.off("disconnect", onDisconnect);
      skt.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [token]);

  const connected = socket?.connected || false; // ✅ define connected

  return { socket, connected }; // ✅ now this works
};
