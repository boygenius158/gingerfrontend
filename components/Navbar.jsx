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

import { Menu, Search, Terminal } from "lucide-react";
// import { Button } from "./ui/button";
import { useSocket } from "@/app/lib/SocketContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Lobster } from "next/font/google";
import useProfileStore from "@/app/store/user/profileStore";
import SearchUser from "./SearchUser";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const lobsterFont = Lobster({
  subsets: ["latin"],
  weight: ["400"], // Lobster only comes in one weight
});

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

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
  const handleClose = () => {
    setSearchOpen(false);
  };
  console.log(feed[0]);

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
          console.log(response);

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
  const handleLinkClick = () => {
    setIsOpen(false); // Close the sidebar on link click
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
      {searchOpen && (
        <Modal
          onClose={handleClose}
          isOpen={searchOpen}
          className="fixed inset-0 flex top-32 justify-center "
        >
          <div>
            <SearchUser
              // className="bg-red-500"
              handleClose={handleClose}
            />
          </div>
        </Modal>
      )}
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
                      // onClick={signOut} // Click to sign out
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      size={60} // Set the size of the logout icon
                    />
                  ) : (
                    <Image
                      src={user?.profilePicture || "/path/to/default-image.jpg"} // Fallback image if no profile picture
                      alt={user?.name}
                      width={60}
                      height={60}
                      className="rounded-full cursor-pointer transform hover:scale-110 transition duration-300 w-[60px] h-[60px] object-cover border-2 border-purple-700"
                      // onClick={signOut}
                      // onClick={() => signOut({ callbackUrl: "/login" })}
                    />
                  )}
                </div>
                {/* <div className="flex">
                  <IoIosAddCircle
                    className="text-white text-2xl cursor-pointer transform hover:scale-150 transition duration-300 hover:text-purple-600"
                    onClick={() => setIsOpen(true)}
                  />
                </div> */}
              </div>
            ) : (
              // <button
              //   onClick={() =>
              //     signIn("google", {
              //       callbackUrl: "/home",
              //     })
              //   }
              //   className="text-sm font-semibold text-blue-500"
              // >
              //   Log In
              // </button>
              <Link
                className="text-purple-700 font-semibold text-sm"
                href="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="">
          <>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle asChild>
                    <Link
                      href="/u/home"
                      onClick={handleLinkClick}
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <h1 className="scroll-m-20 text-primary text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Ginger
                      </h1>
                      <span className="sr-only">Ginger</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/u/home" onClick={handleLinkClick}>
                      Feed
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/u/settings" onClick={handleLinkClick}>
                      Settings
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/u/swipe" onClick={handleLinkClick}>
                      Swipe
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/u/premium" onClick={handleLinkClick}>
                      Premium
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/u/notifications" onClick={handleLinkClick}>
                      Notifications
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/u/messages" onClick={handleLinkClick}>
                      Messages
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      setSearchOpen(true);
                      setIsOpen(false);
                    }}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Sidebar */}
            {/* {isOpen && (
              <div className="fixed inset-0 z-50 bg-black text-gray-500 w-44 h-[480px] shadow-lg transition-transform transform translate-x-0 md:translate-x-0">
                <nav className="flex flex-col gap-6 text-lg font-medium p-4">
                  <Link
                    href="/u/home"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <h1 className="scroll-m-20 text-blue-500 text-4xl font-extrabold tracking-tight lg:text-5xl">
                      Ginger
                    </h1>
                    <span className="sr-only">Ginger</span>
                  </Link>
                  <Link
                    href="/u/home"
                    onClick={handleLinkClick}
                    className="hover:text-blue-500 transition-colors"
                  >
                    Feed
                  </Link>
                  <Link
                    href="/u/settings"
                    onClick={handleLinkClick}
                    className="hover:text-blue-500 transition-colors"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/u/swipe"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    Swipe
                  </Link>
                  <Link
                    href="/u/premium"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    Premium
                  </Link>
                  <Link
                    href="/u/notifications"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    Notifications
                  </Link>
                  <Link
                    href="/u/messages"
                    onClick={handleLinkClick}
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    Messages
                  </Link>
                  <div
                    onClick={() => {
                      setSearchOpen(true);
                      setIsOpen(false); // Close the sidebar on search click
                    }}
                    className="text-gray-500 hover:text-blue-500 transition-colors cursor-pointer"
                  >
                    Search
                  </div>
                </nav>
              </div>
            )} */}
          </>
        </div>
      </div>
      
    </div>
  );
}
