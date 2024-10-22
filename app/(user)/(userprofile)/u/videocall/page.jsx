// "use client";

// import useComponentsStore from "@/app/store/user/componentsStore";
// import instance from "@/axiosInstance";
// import Chat from "@/components/Chat";
// import MiniChat from "@/components/MiniChat";
// import VideoCallUser from "@/components/VideoCallUser";
// import { useSession } from "next-auth/react";
// import React, { useCallback, useEffect, useState } from "react";
// import ReactModal from "react-modal";

// export default function Page() {
//   const { data: session } = useSession();
//   const [list, setList] = useState([]);
//   const [user, setUser] = useState("");
//   const [callFrom, setCallFrom] = useState(false);
//   const [incomingCall, setIncomingCall] = useState(false);

//   // Memoize fetchList to avoid unnecessary re-renders
//   const fetchList = useCallback(async () => {
//     if (!session?.id) {
//       console.error("Session ID is not available");
//       return;
//     }

//     try {
//       const response = await instance.post("/api/user/fetchChatList", {
//         userId: session.id,
//       });

//       if (response) {
//         console.log("response received", response.data.followingUsers);
//         setList(response.data.followingUsers);
//       }
//     } catch (error) {
//       console.error("Error fetching chat list:", error);
//     }
//   }, [session?.id]);

//   useEffect(() => {
//     fetchList();
//   }, [fetchList]); // Include fetchList in the dependency array

//   // Handle user selection
//   function handleUser(user) {
//     setUser(user);
//   }

//   // Close modal function
//   function closeModal() {
//     setIncomingCall(false);
//   }

//   const isVedioCallActive = useComponentsStore(
//     (state) => state.isVedioCallActive
//   );

//   return (
//     <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto gap-4">
//       <ReactModal
//         isOpen={incomingCall}
//         onRequestClose={closeModal}
//         contentLabel="Incoming Call Modal"
//         style={{
//           content: {
//             top: "50%",
//             left: "50%",
//             right: "auto",
//             bottom: "auto",
//             marginRight: "-50%",
//             transform: "translate(-50%, -50%)",
//             width: "300px",
//             padding: "20px",
//             borderRadius: "10px",
//           },
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.75)",
//           },
//         }}
//       >
//         <div>Incoming call modal content</div>
//       </ReactModal>

//       <section className="md:col-span-2">
//         {isVedioCallActive ? (
//           <VideoCallUser
//             user={user}
//             setIncomingCallFunction={setIncomingCall}
//           />
//         ) : (
//           <Chat recipient={user} />
//         )}
//       </section>

//       <section className="hidden md:inline-grid md:col-span-1">
//         <div className="fixed w-[380px]">
//           {/* <Sidebar /> */}
//           <MiniChat userSelected={handleUser} list={list} />
//         </div>
//       </section>
//     </main>
//   );
// }
