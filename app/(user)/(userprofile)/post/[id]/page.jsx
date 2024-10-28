"use client"; // Required for client-side rendering

import instance from "@/axiosInstance";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreHorizontalIcon,
  MoreVertical,
  MoreVerticalIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast, { ToastBar } from "react-hot-toast";
import LikeSection from "@/components/LikeSection";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useSocket } from "@/app/lib/SocketContext";
import { Trash } from "lucide-react";
import OptionsModal from "@/components/modals/OptionsModal";
import useAdminRedirect from "@/app/utils/useAdminRedirect";

export default function Page({ params }) {
  const { data: session } = useSession();
  const { id } = params;
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [showButtons, setShowButtons] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const socket = useSocket();

  const [reply, setReply] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  useAdminRedirect()
  async function likePost() {
    try {
      await instance.post("/api/user/likepost", {
        postId: post._id,
        originalUser: session.id,
      });
      console.log("clicked");
      if (!hasLiked) {
        toast("you have liked the photo.");
      }
      setHasLiked((prev) => !prev);
      setLikes((prev) => prev + (hasLiked ? -1 : 1));

      console.log(session?.id, "sessionid");

      socket.emit("notification", {
        user: post.userId,
        type: hasLiked ? "like" : "unlike",
        originalUser: session?.id,
        postId: post._id,
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    if (reply.trim()) {
      // Submit the reply to the backend
      const res = await instance.post("/api/user/user-posted-reply", {
        content: reply,
        userId: session?.id,
        postId: post._id,
        parentId: commentId,
      });

      console.log(res);

      const replyComment = res.data; // The backend returns the new reply with MongoDB _id

      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            replies: comment.replies
              ? [...comment.replies, replyComment]
              : [replyComment],
          };
        }
        return comment;
      });

      setComments(updatedComments);
      setReply("");
      toast.success("Reply added.");
      setReplyingTo(null); // Reset replying state
    }
  };

  const getPost = useCallback(async () => {
    try {
      if (!session) {
        return;
      }
      const response = await instance.post("/api/user/visitPost", {
        postId: id,
      });
      setPost(response.data.result);
      // setComments(response.data.comments);

      console.log(response.data.result.userId.savedPosts, session.id);
      setBookmarked(response.data.result.userId.savedPosts.includes(id));
      setLikes(response.data.result.likes.length);
      setHasLiked(response.data.result.likes.includes(session?.id));
      console.log(response.data.result.likes.includes(session?.id));
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }, [id, session]);

  useEffect(() => {
    getPost();
  }, [getPost]);
  const fetchComments = useCallback(async () => {
    if (!session) {
      return;
    }
    const res = await instance.post("/api/user/fetch-post-comment", {
      postId: id,
    });
    console.log(res.data.comments[0]);

    setComments(res.data.comments);
  }, [session, id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  async function handleDeleteComment(comment) {
    const commentId = comment._id;
    console.log(comment);
    const updatedComments = comments.filter((item) => item._id !== commentId);
    setComments(updatedComments);

    const response = await instance.post("/api/user/delete-comment", {
      commentId,
    });
    if (response.status === 200) {
      toast("The comment was deleted");
    }
  }
  function handleMouseHover(cd) {
    console.log(cd);
    setShowButtons(cd);
  }
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("hi");

    if (newComment.trim()) {
      // Submit the new comment to the backend
      const res = await instance.post("/api/user/user-posted-comment", {
        content: newComment,
        userId: session?.id,
        postId: post._id,
      });

      console.log(res);

      const comment = res.data; // The backend returns the new comment with MongoDB _id

      // Add the new comment to the list of comments
      setComments([...comments, comment]);
      setNewComment("");
      toast.success("Comment posted.");
    }
  };
  function handleMouseHoverLeft(cd) {
    if (showButtons === cd) {
      setShowButtons("");
    }
  }

  async function handleDeletePost() {
    const response = await instance.post("/api/user/delete-post", {
      postId: id,
    });
    if (response.status === 200) {
      setOpen(false);
      // setPostDeleted(true);
      toast.success("Post has been deleted");
      window.history.back();
    }
  }
  function onChangeOptionsModal() {
    setIsOpen(false);
  }
  // Avoid rendering certain elements until session is loaded on the client-side
  console.log(comments);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-4 p-4 bg-background bg-black h-screen ">
      <OptionsModal
        isOpen={isOpen}
        onChangeOptionsModal={onChangeOptionsModal}
        id={id}
      />
      <div className="flex flex-col z-10">
        <Button
          variant="ghost"
          className="text-white hover:text-purple-700"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Button>
      </div>

      <Card className="w-full md:w-[538px] border border-gray-700 rounded">
        <CardContent className="p-0 ">
          <Carousel className="w-full">
            <CarouselContent>
              {post?.imageUrl?.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square ">
                    <Image
                      src={url}
                      alt={`Post image ${index + 1} of ${post.imageUrl.length}`}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {post?.imageUrl?.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </CardContent>
      </Card>

      <Card className="w-full md:w-[334px] bg-black text-white border border-gray-700">
        <CardHeader className="flex-row items-center justify-between py-4 border-b border-b-gray-700 mb-2">
          <div className="flex items-center gap-2 ">
            <Avatar>
              <AvatarImage
                src={post?.userId?.profilePicture || ""}
                alt={post?.userId?.username || "User"}
              />
              <AvatarFallback>
                {post?.userId?.username?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-start ml-1">
              <span className="font-semibold">{post?.userId?.username}</span>
              <span className="font-sm mb-2">{post?.caption}</span>
            </div>
          </div>
          {session?.id !== post?.userId._id && (
            <div className="flex cursor-pointer">
              <MoreVerticalIcon onClick={() => setIsOpen(true)} />
            </div>
          )}
          {session?.id === post?.userId._id && (
            <Dialog>
              <DialogTrigger asChild>
                <div className="text-black rounded">
                  <Trash className="text-white cursor-pointer hover:scale-75" />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your post and remove its data from our servers.
                    <div className="flex gap-4">
                      <Button onClick={handleDeletePost} variant="outline">
                        Delete
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent className="pb-0 bg-black text-white">
          <ScrollArea className="h-[80px] md:h-[263px] mb-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                onMouseOver={() => handleMouseHover(comment._id)}
                onMouseLeave={() => handleMouseHoverLeft(comment._id)}
                className="flex flex-col mb-4"
              >
                <div className="flex space-x-4">
                  <Avatar className="border-2 border-purple-700">
                    <AvatarImage src={comment.avatar} alt="failed" />
                  </Avatar>
                  <p className="text-white">{comment.caption}</p>
                  <div>
                    <div className="flex-1">
                      <p className="font-semibold">{comment.author}</p>
                      <p className="">{comment.content}</p>
                    </div>
                    {showButtons === comment._id && (
                      <div className="flex gap-1">
                        {session.username !== comment.author && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs ml-12 border border-gray-700 transform duration-300"
                            onClick={() => setReplyingTo(comment._id)}
                          >
                            Reply
                          </Button>
                        )}
                        {session.username === comment.author && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs border border-gray-700 "
                            onClick={() => handleDeleteComment(comment)}
                          >
                            <p> Delete </p>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {comment.replies &&
                  comment.replies.map((reply) => (
                    <div key={reply._id} className="flex space-x-4 ml-8 mt-2">
                      <Avatar className="border-2 border-purple-700">
                        <AvatarImage
                          src={
                            typeof reply.avatar === "string"
                              ? reply.avatar
                              : reply.avatar[0]
                          }
                          alt="failed"
                        />
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">
                          {typeof reply.author === "string"
                            ? reply.author
                            : reply.author[0]}
                        </p>
                        <p className="text-muted-foreground">{reply.content}</p>
                      </div>
                    </div>
                  ))}

                {replyingTo === comment._id && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, comment._id)}
                    className="mt-2 relative"
                  >
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="absolute top-0 right-0 p-1 bg-transparent hover:bg-gray-800 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    <Textarea
                      placeholder="Add a reply..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className="w-full text-white bg-black border-purple-700 focus:border-purple-900"
                    />
                    <Button className="bg-purple-700 mt-2" type="submit">
                      Post Reply
                    </Button>
                  </form>
                )}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex-col items-start">
          {session && (
            <form className="space-y-4 ">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full md:w-[280px] bg-black text-white border-purple-700 border-2 focus:border-purple-900"
              />
            </form>
          )}
        </CardFooter>
        <CardFooter className="flex justify-between border-t h-[70px] border-gray-700">
          <div className="flex items-center justify-center">
            {hasLiked ? (
              <HiHeart
                onClick={likePost}
                className="text-red-500 cursor-pointer text-4xl mt-4 hover:scale-125 transition-transform duration-200 ease-out"
              />
            ) : (
              <HiOutlineHeart
                onClick={likePost}
                className="cursor-pointer text-4xl mt-4 hover:scale-125 transition-transform duration-200 ease-out"
              />
            )}
            <div className="mt-2" onClick={() => setStatus(true)}>
              {likes > 0 && (
                <p className="text-gray-500 ">
                  {likes} {likes === 1 ? "like" : "likes"}
                </p>
              )}
            </div>
          </div>
          <form action="" onSubmit={handleCommentSubmit}>
            <Button className="bg-purple-700 mt-4" type="submit">
              Post Comment
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
