"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "react-modal";
import { HiCamera, HiPhone } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import instance from "@/axiosInstance";
import SearchInput from "./SearchInput";
import { HiPaperAirplane } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { RiImageAddFill } from "react-icons/ri";
import { HiPhoto } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { CircleUser, Search, Package2, Menu } from "lucide-react";
// import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { EdgeStoreProvider, useEdgeStore } from "@/app/lib/edgestore";
import { useSocket } from "@/app/lib/SocketContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GingerLogo from "./GingerLogo";

export default function Navbar() {
  const socket = useSocket();
  const [user, setUser] = useState("");
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageFileUrls, setImageFileUrls] = useState([]);
  const [caller, setCaller] = useState();
  const [spin, setSpin] = useState(false);
  console.log(session);

  useEffect(() => {
    if (socket) {
      const handleUserCalling = (msg) => {
        console.log("User calling:", msg);
        setCaller(msg);
      };

      socket.on("user_calling", handleUserCalling);

      return () => {
        socket.off("user_calling", handleUserCalling);
      };
    }
  }, [socket]);
  // Use useEffect to call notify after the caller state is updated
  useEffect(() => {
    if (caller) {
      toast(
        <div className="flex items-center space-x-3 p-4 shadow-lg rounded-lg  border-gray-200">
          <Image
            src={caller?.profilePicture}
            // src="https://i.pinimg.com/564x/34/16/cf/3416cfaa54b60042a5f354471d841358.jpg"
            alt="Profile"
            width={25}
            height={25}
            className="rounded-full"
          />
          {/* <p>{caller}</p> */}
          <div className="flex-1">
            <p className="text-gray-700 font-semibold">
              {caller.username} is calling you
            </p>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
          progressClassName: "custom-toast-progress",
          hideProgressBar: false,
        }
      );
    }
  }, [caller]);

  console.log(caller);

  const filePickerRef = useRef(null);
  // const notify = () => {
  //   toast(
  //     <div className="flex items-center space-x-3 p-4 shadow-lg rounded-lg  border-gray-200">
  //       <Image
  //         src={caller?.profilePicture}
  //         // src="https://i.pinimg.com/564x/34/16/cf/3416cfaa54b60042a5f354471d841358.jpg"
  //         alt="Profile"
  //         width={25}
  //         height={25}
  //         className="rounded-full"
  //       />
  //       {/* <p>{caller}</p> */}
  //       <div className="flex-1">
  //         <p className="text-gray-700 font-semibold">
  //           {caller.username} is calling you
  //         </p>
  //       </div>
  //     </div>,
  //     {
  //       position: "top-center",
  //       autoClose: false,
  //       className: "custom-toast",
  //       bodyClassName: "custom-toast-body",
  //       progressClassName: "custom-toast-progress",
  //       hideProgressBar: false,
  //     }
  //   );
  // };
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
  }, [status,session?.id]);

  async function handleSubmit() {
    setSpin(true);
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });
      if (caption) {
        formData.append("caption", caption);
      } else {
        formData.append("caption", "*"); // Default empty caption
      }
      formData.append("email", session.user.email);
      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      try {
        const response = await instance.post(
          "/api/storageMediaInCloud",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          console.log("Files uploaded successfully.");
        } else {
          console.error("File upload failed.");
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }

      setIsOpen(false);
      setSelectedFiles([]);
      setImageFileUrls([]);
      setCaption("");
      setSpin(false);
    } else {
      console.error("No files selected.");
    }
  }

  function addImageToPost(e) {
    const files = Array.from(e.target.files);
    if (files.length) {
      setSelectedFiles(files);

      setImageFileUrls(files.map((file) => URL.createObjectURL(file)));
    }
  }

  return (
    <div className="shadow-sm  sticky lg:static  top-0 bg-white p-4 border-blue-500 z-20">
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
            <div className="hidden lg:block w-[170px] cursor-pointer bg-blue-500 text-white">
              {/* <GingerLogo /> */}
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Ginger
              </h1>
            </div>
          </Link>
          <div className="hidden lg:block">
            {status === "loading" ? (
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
              </div>
            ) : session ? (
              <div className="flex gap-2 items-center">
                <Image
                  src={user?.profilePicture}
                  alt={user?.name}
                  width={60}
                  height={60}
                  className="rounded-full cursor-pointer transform hover:scale-110 transition duration-300 w-[60px] h-[60px] object-cover border"
                  onClick={signOut}
                />
                <div className="flex">
                  <IoIosAddCircle
                    className="text-2xl cursor-pointer transform hover:scale-150 transition duration-300 hover:text-blue-600"
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
                <p className="text-muted-foreground hover:text-foreground">
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
              onClick={handleSubmit}
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
