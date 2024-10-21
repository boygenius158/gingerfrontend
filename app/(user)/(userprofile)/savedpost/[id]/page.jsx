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
  MoreVertical,
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
  const [bookmarked, setBookmarked] = useState(true);
  const socket = useSocket();

  const [reply, setReply] = useState("");
  const [hasLiked, setHasLiked] = useState(false);

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

      console.log(response.data.result.userId, session.id);
      // setBookmarked(response.data.result.userId.savedPosts.includes(id));
      // console.log(response.data.result.userId.savedPosts,id);  
      
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
  async function handleSavePost() {
    // setIsSaved((prev) => !prev);
    setBookmarked((prev) => !prev);
    if (bookmarked) {
      toast.success("Removed.");
    } else {
      toast.success("Added.");
    }
    console.log("save post");
    const res = await instance.post("/api/user/savePost", {
      postId: post._id,
      userId: session.id,
    });
  }
  // Avoid rendering certain elements until session is loaded on the client-side
  if (status === "loading") return null;

  return (
    <div className="flex justify-center items-start gap-4 p-4 bg-background bg-black h-screen ">
      <div className="flex flex-col">
        <Button
          variant="ghost"
          className="text-white hover:text-purple-700"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Button>
        {/* <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="text-white">
              Delete Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                post.
                <div className="flex gap-4">
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button
                    className="border border-white "
                    // Add delete post functionality
                  >
                    Delete
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
      </div>
      <Card className="w-[538px] border border-gray-700 rounded">
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

      <Card className="w-[334px] bg-black text-white border border-gray-700">
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
            <span className="font-semibold">{post?.userId?.username}</span>
          </div>
          <Button
            onClick={handleSavePost}
            variant="ghost"
            size="icon"
            aria-label="More options"
          >
            {/* <AlertDialog>
              <AlertDialogTrigger asChild> */}
            {/* <MoreVertical className="h-5 w-5" /> */}
            
            {bookmarked ? (
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
                  d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                  // onClick={handleSavePost}
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-purple-700"
                // onClick={handleSavePost}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            )}
          </Button>
        </CardHeader>
        <CardContent className="pb-0 bg-black text-white">
          <ScrollArea className="h-[263px]  mb-4">
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

                  <div>
                    <div className="flex-1">
                      <p className="font-semibold">{comment.author}</p>
                      <p className="text-white">{comment.content}</p>
                    </div>
                    {showButtons === comment._id && (
                      <div className="flex gap-1">
                        {session.username !== comment.author && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs ml-12 border border-gray-700 transform duration-300"
                            onClick={() => setReplyingTo(comment._id)} // Set replyingTo to the current comment's ID
                          >
                            Reply
                          </Button>
                        )}
                        {session.username === comment.author && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs  border border-gray-700 "
                            onClick={() => handleDeleteComment(comment)}
                          >
                            <p> Delete </p>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Render replies if they exist */}
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

                {/* Render reply textarea if replying to the current comment */}
                {replyingTo === comment._id && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, comment._id)}
                    className="mt-2"
                  >
                    <Textarea
                      placeholder="Add a reply..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className="w-full text-black border-purple-700 border-2 focus:border-purple-900"
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
                className="w-[280px] bg-black text-white border-purple-700 border-2 focus:border-purple-900"
              />
            </form>
          )}
        </CardFooter>
        <CardFooter className=" flex   justify-between  border-t h-[70px] border-gray-700">
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
            )}{" "}
            <div className="mt-2" onClick={() => setStatus(true)}>
              {likes > 0 && (
                <p className="text-gray-500 ">
                  {likes} {likes === 1 ? "like" : "likes"}
                </p>
              )}
              {/* {likes} {likes === 1 ? "like" : "likes"} */}
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
