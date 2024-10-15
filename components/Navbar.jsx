"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import {
  AiOutlineClose,
  AiOutlineLoading3Quarters,
  AiOutlineLogout,
} from "react-icons/ai";
import Modal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import instance from "@/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { HiPhoto } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Menu, Terminal } from "lucide-react";
// import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { useSocket } from "@/app/lib/SocketContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Lobster } from "next/font/google";
import useProfileStore from "@/app/store/user/profileStore";

const lobsterFont = Lobster({
  subsets: ["latin"],
  weight: ["400"], // Lobster only comes in one weight
});

export default function Navbar() {
  const router = useRouter();
  const socket = useSocket();
  const [user, setUser] = useState("");
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [notificationHandled, setNotificationHandled] = useState(false);
  const [imageFileUrls, setImageFileUrls] = useState([]);
  const [caller, setCaller] = useState();
  const [spin, setSpin] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  console.log(session);
  const handleRoomShift = useCallback(
    (data) => {
      router.push(`/u/room/${data}`);
    },
    [router]
  );
  const { feed, setFeed } = useProfileStore((state) => ({
    feed: state.feed,
    setFeed: state.setFeed,
  }));

  console.log(feed[0]);

  useEffect(() => {
    if (socket) {
      const callNotificationHandler = (data) => {
        console.log(data);
        setCaller(data);
        setNotificationHandled(false); // Reset notification status when a new call comes in
      };

      const joinRoomHandler = (data) => {
        console.log(data);
        handleRoomShift(data);
      };

      // Register socket listeners
      socket.on("call_notification_sent", callNotificationHandler);
      socket.on("join_room", joinRoomHandler);

      return () => {
        // Unregister socket listeners during cleanup
        socket.off("call_notification_sent", callNotificationHandler);
        socket.off("join_room", joinRoomHandler);
      };
    }
  }, [socket, handleRoomShift]);

  const callAccept = useCallback(
    (caller) => {
      console.log("call accepted");

      socket.emit("rec_accepted_call", {
        rec: session?.user?.email,
        caller: caller.email,
      });

      // Reset caller state and mark the notification as handled
      setCaller(null);
      setNotificationHandled(true);
    },
    [socket, session]
  );

  const callReject = () => {
    console.log("call rejected");

    // Reset caller state and mark the notification as handled
    setCaller(null);
    setNotificationHandled(true);
  };

  useEffect(() => {
    if (caller && !notificationHandled) {
      toast(
        <Alert>
          <div>
            <div className="flex items-center justify-center">
              <AlertTitle>
                <span className="tracking-tight text-4xl">
                  {caller.username}
                </span>
              </AlertTitle>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={caller?.profilePicture}
                alt="Profile"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
            <div className="flex items-center justify-center mt-2 space-x-4">
              <Button>
                <div onClick={() => callAccept(caller)}>Accept</div>
              </Button>
              <Button>
                <div onClick={() => callReject()}>Reject</div>
              </Button>
            </div>
          </div>
        </Alert>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
        }
      );
    }
  }, [caller, callAccept, notificationHandled]);

  console.log(caller);

  const filePickerRef = useRef(null);

  function handleCaptionChange(e) {
    setCaption(e.target.value);
  }
  function handleImageClick(index) {
    const newurls = [...imageFileUrls];
    newurls.splice(index, 1);
    setImageFileUrls(newurls);
    const newfiles = [...selectedFiles];
    newfiles.splice(index, 1);
    setSelectedFiles(newfiles);
  }
  function closeUploadModal() {
    setIsOpen(false);
    setSelectedFiles([]);
    setImageFileUrls([]);
    setCaption("");
  }
  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const { signal } = controller; // Extract the signal from the controller

    async function fetchData() {
      try {
        if (status === "authenticated") {
          const response = await instance.post("/api/user/miniProfile", {
            id: session?.id,
            signal, // Pass the signal to the fetch request
          });

          if (!signal.aborted) {
            // Check if the request was not aborted
            setUser(response.data.user); // Update the state only if the component is still mounted
          }
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error("Error fetching profile details:", error);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort(); // Abort the fetch request if the component is unmounted
    };
  }, [status, session?.id]);

  const saveFileDatabase = async (uploadUrls) => {
    console.log(uploadUrls);
  };
  const getPresignedUrls = async () => {
    const fileData = selectedFiles.map((file) => ({
        fileName: file.name,
        fileType: file.type,
    }));

    try {
        console.log("hi", session);

        const response = await instance.post("/api/getPresignedUrls", {
            files: fileData,
            caption: caption,
            userId: session?.id,
        });

        console.log("Presigned URLs:", response.data.presignedUrls);
        console.log("Post data:", response.data.post); // Check this output

        if (response.data?.post) {
            // Log current feed state before updating
            console.log("Current feed before update:", feed);

            setFeed(response.data.post); // Append the new post object

            // Log feed state after updating
            console.log("Updated feed after setFeed:", feed);
        }

        return response.data.presignedUrls;
    } catch (error) {
        console.error("Error getting presigned URLs:", error);
        // Handle error accordingly
    }
};


  useEffect(() => {
    console.log(feed);
    console.log("hi ja");
  }, [feed]);

  console.log(feed);

  const uploadFiles = async (uploadUrls) => {
    try {
      await Promise.all(
        uploadUrls.map(async (uploadInfo, index) => {
          console.log(uploadInfo, index);

          const file = selectedFiles[index];
          try {
            await axios.put(uploadInfo.uploadUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
              onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log(`File ${file.name} is ${progress}% uploaded`);
              },
            });
            setIsOpen(false);
            setSelectedFiles([]);
            setImageFileUrls([]);
            setCaption("");
            setSpin(false);
          } catch (error) {
            console.error(`Error uploading file: ${file.name}`, error);
          }
        })
      );
      // setUploadStatus("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      // setUploadStatus("Error uploading files");
    }
  };
  const handleUpload = async () => {
    try {
      setSpin(true);

      const uploadUrls = await getPresignedUrls();
      await uploadFiles(uploadUrls);
      const place = await saveFileDatabase(uploadUrls);
      console.log(place);
    } catch (error) {
      console.error("Upload failed:", error);
      // setUploadStatus("Upload failed");
    }
  };

  function addImageToPost(e) {
    const files = Array.from(e.target.files);
    if (files.length) {
      setSelectedFiles(files);

      setImageFileUrls(files.map((file) => URL.createObjectURL(file)));
    }
  }
  function showList() {
    console.log(feed);
  }
  return (
    <div className="shadow-sm  sticky lg:static  top-0 bg-black p-4 border-gray-700 border-b z-20">
      
      <div>
        <Toaster />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="">
        <div className="flex justify-between">
          <Link href="/">
            <div className="hidden lg:block w-[170px] cursor-pointer text-white ml-4">
              <h1
                className={`scroll-m-20 text-4xl  lg:text-5xl ${lobsterFont.className}`}
              >
                Ginger
              </h1>
            </div>
          </Link>
          <div className="hidden lg:block">
            {status === "loading" ? (
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <AiOutlineLoading3Quarters className="text-2xl text-white animate-spin" />
              </div>
            ) : session ? (
              <div className="flex gap-2 items-center">
                <div
                  onMouseEnter={() => setIsHovered(true)} // Set hover state
                  onMouseLeave={() => setIsHovered(false)} // Reset hover state
                >
                  {isHovered ? (
                    <AiOutlineLogout
                      className="text-white cursor-pointer transform hover:scale-110 transition duration-300"
                      onClick={signOut} // Click to sign out
                      size={60} // Set the size of the logout icon
                    />
                  ) : (
                    <Image
                      src={user?.profilePicture || "/path/to/default-image.jpg"} // Fallback image if no profile picture
                      alt={user?.name}
                      width={60}
                      height={60}
                      className="rounded-full cursor-pointer transform hover:scale-110 transition duration-300 w-[60px] h-[60px] object-cover border-2 border-purple-700"
                      onClick={signOut}
                    />
                  )}
                </div>
                <div className="flex">
                  <IoIosAddCircle
                    className="text-white text-2xl cursor-pointer transform hover:scale-150 transition duration-300 hover:text-purple-600"
                    onClick={() => setIsOpen(true)}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/home",
                  })
                }
                className="text-sm font-semibold text-blue-500"
              >
                Log In
              </button>
            )}
          </div>
        </div>
        <div className="">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/home"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <h1 className="scroll-m-20 text-blue-500 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Ginger
                  </h1>
                  {/* <Package2 className="h-6 w-6" /> */}

                  <span className="sr-only">Ginger</span>
                </Link>
                <p
                  onClick={() => setIsOpen(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  upload post
                </p>
                <p className="text-muted-foreground hover:text-foreground">
                  upload story
                </p>
                <Link href="/u/settings" className="hover:text-foreground">
                  Settings
                </Link>
                <Link
                  href="/u/swipe"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Swipe
                </Link>
                <Link
                  href="/u/premium"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Premium
                </Link>
                <Link
                  href="/u/notifications"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Notifications
                </Link>
                <Link
                  href="/u/messages"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Messages
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          ariaHideApp={false}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col items-center ">
            <h2 className="text-xl text-gray-500 font-semibold mb-4">
              Create new post
            </h2>
            <div>
              <AiOutlineClose
                className="cursor-pointer absolute top-4 right-4 hover:text-red-600 transition duration-300"
                onClick={closeUploadModal}
              />
            </div>
            <div className="border-b w-full"></div>
            <div className="p-2 ">
              <Tabs defaultValue="images" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="caption">Caption</TabsTrigger>
                </TabsList>

                <div className="flex flex-col">
                  <div className="flex items-center justify-center">
                    <TabsContent value="images">
                      <div className="p-2 text-gray-500">
                        <p>Tap on the images to remove selection</p>
                      </div>
                      <div className="flex items-center justify-center">
                        {imageFileUrls.length > 0 ? (
                          <Carousel>
                            {/* Wrap the actual items */}
                            <CarouselContent>
                              {imageFileUrls.map((url, index) => (
                                <CarouselItem
                                  key={index}
                                  className="shrink-b0 w-full h-full flex items-center justify-center relative"
                                >
                                  <div className="relative group flex items-center justify-center border cursor-pointer">
                                    <Image
                                      src={url}
                                      alt={`selected file ${index}`}
                                      width={150}
                                      height={150}
                                      className="cursor-pointer hover:opacity-70 w-[150px] h-[150px] object-fit "
                                      onClick={() => handleImageClick(index)}
                                    />
                                    {/* Red overlay */}
                                    <div
                                      onClick={() => handleImageClick(index)}
                                      className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center"
                                    >
                                      <span className="text-white text-sm">
                                        Remove
                                      </span>
                                    </div>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>

                            {/* Navigation buttons */}
                            <CarouselPrevious className="text-blue-400 hover:text-blue-500" />
                            <CarouselNext className="text-blue-400 hover:text-blue-500" />
                          </Carousel>
                        ) : (
                          <div onClick={() => filePickerRef.current.click()}>
                            <div className="relative inline-block">
                              <HiPhoto className="text-8xl text-blue-400 hover:text-blue-500 cursor-pointer" />
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <TabsContent value="caption">
                    <input
                      type="text"
                      maxLength="150"
                      onChange={handleCaptionChange}
                      placeholder="Please enter your caption..."
                      className="m-4 border p-2 rounded text-center  focus:ring-0 outline-none"
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

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
              // onClick={handleSubmit}
              onClick={handleUpload}
              disabled={selectedFiles.length === 0}
              className="w-full  text-white p-2 shadow-md rounded-lg hover:bg-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              {!spin && <p>Upload</p>}
              {spin && (
                <AiOutlineLoading3Quarters className="text-2xl text-white animate-spin" />
              )}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
