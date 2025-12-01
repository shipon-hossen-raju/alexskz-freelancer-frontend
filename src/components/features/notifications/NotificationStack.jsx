// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X } from 'lucide-react';
// // import '@/styles/Notification.css'

// export function NotificationStack() {
//   const [notifications, setNotifications] = useState([
//     {
//       id: '1',
//       title: 'Message from Sarah',
//       message: 'Hey! How are you doing today?',
//       icon: '💬',
//     },
//     {
//       id: '2',
//       title: 'New Comment',
//       message: 'Someone liked your post',
//       icon: '❤️',
//     },
//     {
//       id: '3',
//       title: 'Reminder',
//       message: 'Your meeting starts in 5 minutes',
//       icon: '📅',
//     },
//   ]);

//   const removeNotification = (id) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   const addNotification = () => {
//     const newNotif = {
//       id: Date.now().toString(),
//       title: 'New Notification',
//       message: 'This is a new notification from the stack',
//       icon: '✨',
//     };
//     setNotifications((prev) => [newNotif, ...prev]);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
//       {/* Header */}
//       <div className="w-full max-w-md">
//         <h1 className="text-2xl font-bold text-foreground mb-2">iOS Notifications stack</h1>
//         <p className="text-sm text-muted-foreground">Smooth staggered animations with Framer Motion</p>
//       </div>

//       {/* Notification Stack */}
//       <div className="w-full max-w-md h-96 relative">
//         <AnimatePresence mode="popLayout">
//           {notifications.map((notification, index) => (
//             <motion.div
//               key={notification.id}
//               layout
//               initial={{ opacity: 0, y: -20, scale: 0.95 }}
//               animate={{
//                 opacity: 1,
//                 y: index * 12,
//                 scale: 1 - index * 0.02,
//                 zIndex: notifications.length - index,
//               }}
//               exit={{ opacity: 0, y: -20, scale: 0.95 }}
//               transition={{
//                 type: 'spring',
//                 stiffness: 300,
//                 damping: 30,
//                 delay: index * 0.05,
//               }}
//               className="absolute w-full"
//             >
//               <motion.div
//                 whileHover={{ y: -2 }}
//                 className="bg-card rounded-2xl p-4 shadow-lg border border-border cursor-pointer group"
//                 onClick={() => removeNotification(notification.id)}
//               >
//                 <div className="flex items-start gap-3">
//                   {notification.icon && (
//                     <span className="text-2xl flex-shrink-0">{notification.icon}</span>
//                   )}
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-card-foreground text-sm truncate">
//                       {notification.title}
//                     </h3>
//                     <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
//                       {notification.message}
//                     </p>
//                   </div>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeNotification(notification.id);
//                     }}
//                     className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
//                   >
//                     <X size={16} />
//                   </motion.button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* Add Notification Button */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={addNotification}
//         className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
//       >
//         Add Notification
//       </motion.button>

//       {/* Info Text */}
//       {notifications.length === 0 && (
//         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-muted-foreground text-sm">
//           All notifications cleared! Click "Add Notification" to see the stack.
//         </motion.p>
//       )}
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationStack() {
  const [items, setItems] = useState([
    {
      id: '1',
      title: 'A new message has arrived',
      unreadCount: 12,
      time: '8:03am, today',
    },
  ]);

  const markAllRead = () => setItems([]);
  const onView = (id) => {
    // navigate or open details
    // console.log('view', id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="rounded-[20px] bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-[15px] font-semibold text-gray-800">Notification</div>
          <button
            onClick={markAllRead}
            className="px-4 py-1.5 rounded-md bg-[#144A6C] text-white text-sm font-semibold shadow-sm hover:brightness-95"
          >
            Mark as Read
          </button>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        {/* List */}
        <div className="p-3">
          <AnimatePresence initial={false}>
            {items.map((n, idx) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28, delay: idx * 0.03 }}
                className="rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="p-4">
                  <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
                    {/* Left: text */}
                    <div>
                      <div className="text-[13px] text-gray-600">{n.title}</div>
                      <a
                        href="#"
                        className="mt-1 inline-block text-[13px] font-semibold text-[#108a55] hover:underline"
                      >
                        {n.unreadCount} Unread message
                      </a>
                    </div>

                    {/* Right: time + button */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-[12px] text-gray-400">{n.time}</div>
                      <button
                        onClick={() => onView(n.id)}
                        className="inline-flex items-center justify-center px-3 py-1.5 text-[13px] font-semibold rounded-md border border-gray-300 hover:bg-gray-50"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
