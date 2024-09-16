//videoCalluser.jsx

import { useSocket } from "@/app/lib/SocketContext";
import { Player } from "@lottiefiles/react-lottie-player";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiCamera, HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "react-modal";
import {  toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { AddIcCall, CallToActionSharp } from "@mui/icons-material";
import useComponentsStore from "@/app/store/user/componentsStore";
export default function VideoCallUser({
  setIncomingCallFunction,
  setCallFrom,
  user,
}) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [incomingCall, setIncomingCall] = useState(true);
  
  const socket = useSocket();
  console.log(user);
  const { isVedioCallActive, startVideoCall, endVideoCall } = useComponentsStore();

  useEffect(() => {
    const pc = new RTCPeerConnection();
    setPeerConnection(pc);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("ice-candidate emit", socket.id);
        socket.emit("ice-candidate", event.candidate, user.email);
      }
    };
    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      })
      .then(() => {
        console.log("media device working");
      })
      .catch((error) => console.error("Error accessing media devices.", error));

    socket.on("offer", (receivedOffer) => {
      // setIncomingCall(true);
      // setIncomingCallFunction(true)

      // setCallFrom(true);
      console.log(receivedOffer);
      const remoteDescription = new RTCSessionDescription(receivedOffer);
      pc.setRemoteDescription(remoteDescription)
        .then(() => pc.createAnswer())
        .then((answer) => pc.setLocalDescription(answer))
        .then(() => socket.emit("answer", pc.localDescription, user.email))
        .catch((error) => console.error("errrr handling offer", error));
    });

    socket.on("answer", (answer) => {
      console.log(answer);

      pc.setRemoteDescription(new RTCSessionDescription(answer)).catch(
        (error) => console.error("error setting remote description")
      );
    });
    socket.on("ice-candidate", (candidate) => {
      console.log("ice-candidate on", socket.id);

      pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) =>
        console.error("Error adding ice candidate.", error)
      );
    });
    return () => {
      pc.close();
    };
  }, [socket,user?.email]);

  const handleCall = () => {
    console.log("handlecall");

    const offerOptions = { offerToReceiveVideo: 1 };
    peerConnection
      .createOffer(offerOptions)
      .then((offer) => peerConnection.setLocalDescription(offer))
      .then(() =>
        socket.emit("offer", peerConnection.localDescription, user.email)
      )
      .catch((error) => console.error("error creating offer", error));
  };
  console.log(setIncomingCallFunction);

  return (
    <div>
      <div>
        <div className="h-16 bg-white border rounded flex justify-between mt-8">
          <div className="flex justify-center items-center">
            <div>{user.username}</div>
          </div>
          <div className="flex gap-4  ">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </div>
            <div className="flex items-center justify-center"></div>
            <div className="flex items-center justify-center mr-3">
              <HiOutlineDotsVertical className="h-5 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="relative h-96 bg-gray-50 flex items-center justify-center">
          <video
            ref={remoteVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
          />
          <div className="absolute bottom-4 right-4 w-32 h-24 border border-gray-300 rounded-md shadow-lg">
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover rounded-md"
              autoPlay
              muted
            />
          </div>
        </div>

        <div className=" h-20 flex justify-center items-center gap-4">
          <div className="flex items-center space-x-4 cursor-pointer">
            <div
              onClick={handleCall}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 transform hover:scale-110"
            >
              <AddIcCall />
            </div>
            <div 
            onClick={endVideoCall}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 transform hover:scale-110">
              <CallEndIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
