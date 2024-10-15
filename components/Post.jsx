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
import CommentSectionPost from "./CommentSectionPost";
import HoverCardPost from "./HoverCardPost";
import LikedList from "./modals/LikedList";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton

export default function Post({ post, isSaved, loading }) {
  const notify = () => {
    toast.success("Post Has Been Reported!", {
      position: <toast className="POSITION TOP_CENTER"></toast>,
      autoClose: 5000,
    });
  };
  const [CommentSectionVisible, setCommentSectionVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  function HandleCommentVisible() {
    setCommentSectionVisible(!CommentSectionVisible);
  }

  async function handleReportSubmit(e) {
    e.preventDefault();
    const response = await instance.post("/api/user/reportPost", {
      postId: post._id,
      victimUser: session.id,
    });

    if (response) {
      setIsOpen(false);
      notify();
    }
  }
  console.log(post); 

  return (
    <>
      <div className="bg-black border  border-gray-600 text-white my-7 rounded-md">
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            ariaHideApp={false}
          >
            <div className="relative border-2 border-white bg-black rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 text-white">Action</h2>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-purple-700 bg-gray-300"
                  >
                    Report Post
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="text-white bg-black">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Are you sure you want to
                      report this post?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-purple-700">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction>
                      <span onClick={handleReportSubmit}>Yes</span>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AiOutlineClose
                className="cursor-pointer text-white absolute top-4 right-4 hover:text-purple-600 transition duration-300"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </Modal>
        )}

        <div className="flex items-center p-5 border-gray-100 gap-x-3">
          <div className="relative w-12 h-12">
            {loading ? ( // Check if loading
              <Skeleton className="rounded-full w-full h-full" /> // Use Skeleton here
            ) : (
              <Image
                src={post?.userDetails?.profilePicture}
                alt="Profile Picture"
                layout="fill"
                className="rounded-full object-cover border-purple-800 border-2 p-1"
              />
            )}
          </div>

          <div className="flex-1 ">
            {loading ? ( // Check if loading
              <Skeleton className="w-24 h-4 mb-2" /> // Skeleton for username
            ) : (
              <Link href={`/u/${post?.userDetails?.username}`}>
                <p className="font-bold first-letter:uppercase">
                  <HoverCardPost user={post.userDetails}></HoverCardPost>
                </p>
              </Link>
            )}
          </div>

          {session?.username &&
            post?.userDetails?.username &&
            session.username !== post.userDetails.username && (
              <div className="flex justify-end items-center">
                <HiOutlineDotsVertical className="text-2xl cursor-pointer" />
              </div>
            )}
        </div>

        <ImageSection data={post} />

        <LikeSection
          post={post}
          HandleCommentVisible={HandleCommentVisible}
          isSaved={isSaved}
        />

        <p className="p-5 truncate flex">
          {loading ? ( // Check if loading
            <Skeleton className="w-3/4 h-4" /> // Skeleton for caption
          ) : (
            <>
              <span className="font-bold mr-2">
                {post?.userDetails?.username}
              </span>
              <div>
                {post.caption === "*" ? <p></p> : <p>{post.caption}</p>}
              </div>
            </>
          )}
        </p>

        <div>
          {CommentSectionVisible && (
            <div>
              <CommentSectionPost post={post} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
