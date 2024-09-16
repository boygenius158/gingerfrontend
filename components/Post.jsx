import Image from "next/image";
import { HiCamera, HiOutlineDotsVertical } from "react-icons/hi";
import LikeSection from "./LikeSection";
import CommentSection from "./CommentSection";
import { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageSection from "./ImageSection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function Post({ post, isSaved }) {
  const notify = () => {
    toast.success("Post Has Been Reported!", {
      position: <toast className="POSITION TOP_CENTER"></toast>,
      autoClose: 5000,
    });
  };

  console.log(post);
  const [isOpen, setIsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const { data: session, status } = useSession();
  console.log(session);
  async function handleReportSubmit(e) {
    console.log("handle report s");
    e.preventDefault();
    const response = await instance.post("/api/user/reportPost", {
      postId: post._id,
      victimUser: session.id,
    });
    console.log(response);

    if (response) {
      setIsOpen(false);
      setIsReportOpen(false);
      notify();
    }
  }
  // Debugging
  return (
    <div className="bg-white my-7 border-2  rounded-md">
      {/* <ToastContainer
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
      /> */}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          ariaHideApp={false}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Action</h2>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Report Post</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Are you sure you want to
                    report this post?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>
                    <span onClick={handleReportSubmit}>Yes</span>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AiOutlineClose
              className="cursor-pointer absolute top-4 right-4 hover:text-red-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </Modal>
      )}
      <div className="flex items-center p-5 border-b border-gray-100 gap-x-1">
        <div className="relative w-12 h-12">
          <Image
            src={post?.userDetails?.profilePicture}
            alt="hell world"
            layout="fill"
            className="rounded-full object-cover border p-1"
          />
        </div>

        <div className="flex-1">
          <p className="font-bold">{post.userDetails.username}</p>
          {/* <p className="text-gray-500 first-letter:uppercase">
            Asheville, North Carolina
          </p> */}
        </div>

        <div className="flex justify-end items-center">
          <HiOutlineDotsVertical
            className="h-5 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          ></HiOutlineDotsVertical>
        </div>
      </div>

      <ImageSection data={post} />

      <LikeSection post={post} isSaved={isSaved} />
      <p className="p-5 truncate flex">
        <span className="font-bold mr-2">{post.userDetails.username}</span>
        <div>{post.caption === "*" ? <p></p> : <p>{post.caption}</p>}</div>
      </p>
    </div>
  );
}
