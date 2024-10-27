import { useSocket } from "@/app/lib/SocketContext";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiCamera, HiOutlineDotsVertical } from "react-icons/hi";
import { HiPaperAirplane } from "react-icons/hi";
import { Player } from "@lottiefiles/react-lottie-player";
import Modal from "react-modal";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import MessageStatusCard from "./MessageStatusCard";
import { useEdgeStore } from "@/app/lib/edgestore";
import ReactPlayer from "react-player";
import WaveForm from "./WaveForm";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export default function Chat({ recipient }) {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const socket = useSocket();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientOnline, setRecipientOnline] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [imageFileUrls, setImageFileUrls] = useState("");
  const [file, setFile] = useState();
  const [spin, setSpin] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);
  // const [showStatus, setShowStatus] = useState(false);
  const [showStatusFor, setShowStatusFor] = useState(null);

  // Audio Message
  const [audioMessage, setAudioMessage] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const CancelRecording = () => {
    setAudioMessage(false);
    setTimer(0);
    setIsRecording(false);
    audioChunks.current = [];
  };

  const handleAudioStart = async () => {
    setIsRecording(true);
    setAudioMessage(true);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.start();
  };

  const handleAudioStop = async (e) => {
    console.log(e);

    e.preventDefault();
    setIsRecording(false);
    setTimer(0);
    setAudioMessage(false);
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });
      setAudioBlob(blob);
      console.log("Blob size:", blob.size);
      console.log("Blob:", blob);
      audioChunks.current = [];

      if (blob) {
        console.log(blob);

        const formData = new FormData();
        formData.append("file", blob, "audio.webm");

        console.log("FormData to upload:", formData);

        try {
          const res = await edgestore.publicFiles.upload({
            file: formData.get("file"),
            onProgressChange: (progress) => {
              console.log("Upload progress:", progress);
            },
          });
          console.log("Upload response:", res);

          if (!socket) {
            console.log("socket not exist");
          }
          socket.emit("audio-chat", {
            recipientEmail: recipient.email,
            senderEmail: session?.user?.email,
            message: res.url, // Ensure this matches what your server expects
            type: "audio",
          });
        } catch (error) {
          console.error("Upload error:", error);
        }
      }
    };
  };

  useEffect(() => {
    console.log(messages);

    if (socket) {
      socket.on("audio-chat-return", (data) => {
        console.log(data);
        console.log(messages);

        setMessages((prev) => [...prev, data]);
      });
      return () => {
        socket.off("audio-chat-return");
      };
    }
  }, [socket, messages]);

  const filePickerRef = useRef();
  function handleMouseEnterMessage(index) {
    setShowStatusFor(index); // Set the index of the hovered message
  }

  function handleMouseLeaveMessage() {
    setShowStatusFor(null); // Clear the hovered message index
  }
  function handleScroll(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    console.log(scrollTop, scrollHeight, clientHeight);

    // Check if the user has scrolled to the bottom
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      // Allowing a small margin
      setReachedBottom(true);
    } else {
      setReachedBottom(false);
    }
  }

  function closeModal() {
    setIsOpen(false);
    setFile(null);
    setImageFileUrls("");
    console.log("Modal closed. Image file URL:", imageFileUrls, "File:", file);
    if (filePickerRef.current) {
      filePickerRef.current.value = ""; // Clear the file input value
    }
  }
  function addImageToPost(e) {
    console.log("add");

    const file = e.target.files[0];
    setFile(file);
    setImageFileUrls(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    setSpin(true);
    if (file) {
      // Upload the file and track progress
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });

      // Check if there is a valid session
      if (session) {
        if (session) {
          setFile(null);
          setImageFileUrls(null);
          setIsOpen(false);

          // Emit the socket event for real-time updates
          socket.emit("ImageMessage", {
            recipientEmail: recipient.email,
            senderEmail: session?.user?.email,
            message: res.url,
            type: "image",
          });
        } else {
          console.error("Failed to send image:", response?.data?.message);
        }
      }
      setSpin(false);
    }
  }

  console.log(imageFileUrls);

  console.log(session);

  console.log(recipient);

  // }
  const fetchHistoricalData = useCallback(async () => {
    if (session && recipient?._id) {
      try {
        console.log("hi");

        const response = await instance.post("/api/user/fetchHistoricalData", {
          senderId: session.id,
          receiverId: recipient._id,
        });

        if (response) {
          console.log("response was received", response.data.messages);
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    }
  }, [session, recipient]);

  // Fetch historical data whenever recipient or session changes
  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  const updateReadStatus = useCallback(async () => {
    if (session) {
      try {
        await instance.post("/api/user/updateReadStatus", {
          sender: session?.id,
          recipient: recipient?._id,
        });
      } catch (error) {
        console.error("Error updating read status:", error);
      }
    }
  }, [session, recipient]);

  useEffect(() => {
    if (reachedBottom) {
      updateReadStatus();
    }
  }, [reachedBottom, updateReadStatus]);

  useEffect(() => {
    if (socket) {
      socket.on("statusOnline", (data) => {
        console.log(data);

        setRecipientOnline(data);
      });
      socket.on("caller_notification", (data) => {
        console.log(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && session?.user?.email) {
      socket.emit("onlineStatus", recipient?.email, session.user.email);
    }
  }, [socket, recipient, session?.user?.email]);

  useEffect(() => {
    if (!socket) {
      console.log("socket is missing");
      return;
    }

    socket.emit("register", session?.user?.email);

    socket.on("receive_message", (object) => {
      console.log(object);
      setMessages((prev) => [...prev, object]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, session]);

  function handleMediaSent(e) {
    console.log(";;;");

    e.preventDefault();
    console.log("handle media sent");
  }
  async function handleAudioSent() {
    console.log("yes");
  }
  function handleMesssageSent(e) {
    e.preventDefault();
    console.log(input);

    if (input.trim()) {
      socket.emit("message", {
        recipientEmail: recipient.email,
        senderEmail: session?.user?.email,
        message: input,
        type: "text",
      });
    }

    setInput("");
    console.log(input);
  }
  console.log(messages);
  if (!recipient) {
    return (
      <div className="h-screen ">
        <div className="lg:mt-8 h-16 bg-black  rounded flex justify-between ">
          <div className="flex justify-center items-center">
            <div>{recipient.username}</div>
          </div>
          <div className="flex gap-4  ">
            <div className="flex items-center justify-center"></div>
            <div className="flex items-center justify-center"></div>
            <div className="flex items-center justify-center mr-3">
              {/* <HiOutlineDotsVertical className="h-5 cursor-pointer" /> */}
            </div>
          </div>
        </div>
        <div className=" h-96  bg-black flex items-center justify-center">
          <div className="">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
              Start Messaging!
            </h1>
            <div className="">
              <Player
                src="https://lottie.host/ad46920e-be46-4429-beb6-6158cb2bba67/uvrRhaKmT2.json"
                className="player"
                loop
                autoplay
                style={{ height: "300px", width: "300px" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="lg:mt-8  bg-black h-screen border-gray-800">
        <div className="">
          <div className="h-16 text-gray-400 border border-gray-700 rounded flex justify-between ">
            <div className="flex justify-center items-center">
              <div className="p-4">
                <Image
                  src={recipient.profilePicture}
                  alt={recipient.username}
                  height={40}
                  width={40}
                  className="rounded-full object-cover h-[40px] w-[40px]"
                />
              </div>
              <div>
                <Link
                  href={`/u/${recipient.username}`}
                  className="hover:underline cursor-pointer"
                >
                  {recipient.username}
                </Link>
                <div>
                  {recipientOnline && (
                    <div>
                      <span
                        className="text-green-500 font-bold cursor-pointer"
                        aria-live="polite"
                        aria-label="User is online"
                      >
                        {/* Online */}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4  ">
              <div className="flex items-center justify-center"></div>
              {/* <div className="flex items-center justify-center cursor-pointer">
                <span onClick={setCallNotification} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 text-purple-700 hover:scale-125 transition-transform 300"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </span>
              </div> */}
              <div className="flex items-center justify-center mr-3">
                <HiOutlineDotsVertical className="h-5 cursor-pointer text-purple-700" />
              </div>
            </div>
          </div>
        </div>

        <ScrollArea
          className="h-96 border p-4 space-y-2 border-gray-800"
          onScroll={handleScroll}
        >
          {messages.map((msg, index) => {
            // Add console logs for debugging
            console.log("Message sender:", msg);
            console.log("Session ID:", session?.id);

            const isSender = msg.sender === session?.id;

            return (
              <div
                key={index}
                className={`flex ${
                  isSender ? "justify-end" : "justify-start"
                } mt-2`}
              >
                <div
                  onMouseEnter={() => handleMouseEnterMessage(index)}
                  onMouseLeave={() => handleMouseLeaveMessage()}
                  className={`inline-block cursor-pointer p-2 max-w-xs ${
                    isSender
                      ? "bg-purple-600 text-white rounded-tl-2xl rounded-bl-2xl rounded-tr-md transition-transform duration-300 hover:bg-purple-800"
                      : "bg-gray-200 text-black rounded-tr-2xl rounded-br-2xl rounded-tl-md transition-transform duration-300 hover:bg-gray-300"
                  }`}
                >
                  {msg.type === "image" ? (
                    <Image
                      src={msg.message}
                      height={250}
                      width={250}
                      alt="User uploaded content"
                      className="max-w-full rounded"
                    />
                  ) : msg.type === "audio" ? (
                    <>
                      <WaveForm
                        audioSrc={msg.message}
                        audioMessage={audioMessage}
                      />
                    </>
                  ) : (
                    // <ReactPlayer
                    //   url={msg.message}
                    //   controls={true}
                    //   width="100%"
                    //   height="50px"
                    // />
                    <span>{msg.message}</span>
                  )}
                </div>
                {showStatusFor === index && isSender && (
                  <div className="absolute bottom-0 right-0 mb-2 mr-2">
                    <MessageStatusCard
                      isSeen={msg.isRead}
                      time={msg.timestamp}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </ScrollArea>

        {!audioMessage && (
          <form action="" onSubmit={handleMesssageSent}>
            <div className="bg-black p-3 border border-gray-700  flex items-center space-x-3">
              <div
                onClick={handleAudioStart}
                className="text-purple-700 inline-flex items-center justify-center w-12 h-12 bg-gray-200 border border-purple-700 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-300 hover:border-gray-400"
              >
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
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                  />
                </svg>
              </div>
              <div
                onClick={() => setIsOpen(true)}
                className="text-purple-600  inline-flex items-center justify-center w-12 h-12 bg-gray-200 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-300 hover:border-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-purple-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Type a message..."
                className="text-white bg-black border border-purple-700 flex-1 p-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
              />
              <button
                type="submit"
                className="bg-black p-2 rounded-full text-white hover:bg-purple-600 focus:outline-none"
              >
                <HiPaperAirplane className="h-5 w-5 transform rotate-45" />
              </button>
            </div>
          </form>
        )}
        {audioMessage && (
          <div className="bg-black border border-purple-700 p-3 border-t flex items-center space-x-3">
            <div className="flex gap-2 items-center">
              <div>{timer} seconds</div>
              <button className="text-red-800" onClick={CancelRecording}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>

            <div className="w-full" ref={waveformRef}></div>
            <form action="" onSubmit={handleAudioSent}>
              <div className="flex">
                <button
                  onClick={handleAudioStop}
                  className="bg-red-500 text-white p-2 rounded-lg hover:animate-bounce"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
        {isOpen && (
          <form action="" onSubmit={handleMediaSent}>
            <Modal
              onClick={() => closeModal()}
              isOpen={isOpen}
              // onRequestClose={}
              className="fixed inset-0 flex items-center justify-center p-4"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50"
              ariaHideApp={false}
            >
              <div className="relative  rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col items-center bg-gray-300">
                <h2 className="text-xl font-semibold mb-2">Send Image</h2>
                <p className="mb-2 text-muted-foreground">
                  click here to select images.
                </p>
                {imageFileUrls ? (
                  <div className="flex items-center justify-center bg-red-600">
                    {/* <div className="grid grid-cols-2 gap-4"> */}
                    {/* {imageFileUrls.map((url, index) => ( */}
                    <div className="">
                      <Image
                        // key={index}
                        onClick={() => {
                          setImageFileUrls();
                          setFile();
                        }}
                        src={imageFileUrls}
                        alt={`selected file `}
                        width={150}
                        height={150}
                        className="cursor-pointer"
                      />
                    </div>
                    {/* ))} */}
                    {/* </div> */}
                  </div>
                ) : (
                  <HiCamera
                    onClick={() => filePickerRef.current.click()}
                    className="text-5xl text-gray-400 cursor-pointer"
                  />
                )}

                <input
                  hidden
                  ref={filePickerRef}
                  type="file"
                  name="file"
                  accept="image/*"
                  multiple
                  onChange={addImageToPost}
                />

                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!file}
                  className="w-full mt-4 text-white p-2 bg-purple-800 shadow-md rounded-lg hover:brightness-105  disabled:cursor-not-allowed disabled:hover:brightness-100"
                >
                  {!spin && <p>Upload</p>}
                  {spin && (
                    <AiOutlineLoading3Quarters className="text-2xl text-white animate-spin" />
                  )}
                </Button>
                <AiOutlineClose
                  className="cursor-pointer absolute top-4 right-4 hover:text-red-600 transition duration-300"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </Modal>
          </form>
        )}
      </div>
    );
  }
}
