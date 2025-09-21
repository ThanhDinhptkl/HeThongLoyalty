// "use client";
// import { useEffect, useState } from "react";
// import { Bell } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// interface Notification {
//   id: string;
//   message: string;
//   created_at: string;
//   read: boolean;
// }

// export default function NotificationBell() {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [open, setOpen] = useState(false);

//   const fetchNotifications = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/notifications?unread=true"); // chỉnh port BE
//       const data = await res.json();
//       if (data.ok) {
//         setNotifications(data.notifications);
//       }
//     } catch (e) {
//       console.error("Lỗi load notification:", e);
//     }
//   };

//   const markAsRead = async (id: string) => {
//     await fetch(`http://localhost:4000/notifications/${id}/read`, {
//       method: "POST",
//     });
//     fetchNotifications();
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 5000); // refresh mỗi 5s
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative">
//       <Button variant="ghost" onClick={() => setOpen(!open)}>
//         <Bell />
//         {notifications.length > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
//             {notifications.length}
//           </span>
//         )}
//       </Button>

//       {open && (
//         <Card className="absolute right-0 mt-2 w-80 z-50">
//           <CardContent>
//             <h2 className="font-bold mb-2">Thông báo</h2>
//             {notifications.length === 0 ? (
//               <p className="text-sm text-gray-500">Không có thông báo mới</p>
//             ) : (
//               <ul className="space-y-2">
//                 {notifications.map((n) => (
//                   <li
//                     key={n.id}
//                     className="flex justify-between items-center border-b pb-1"
//                   >
//                     <span className="text-sm">{n.message}</span>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => markAsRead(n.id)}
//                     >
//                       Đọc
//                     </Button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
