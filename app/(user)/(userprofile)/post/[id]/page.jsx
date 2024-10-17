"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import instance from "@/axiosInstance";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import NotFound from "@/components/NotFound";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function Page({ params }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { data: session, status } = useSession();
  const [postDeleted, setPostDeleted] = useState(false);
  const [open, setOpen] = useState(false);

  const { id } = params;
  const [newComment, setNewComment] = useState("");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getPost = useCallback(async () => {
    const response = await instance.post("/api/user/visitPost", {
      postId: id,
    });
    setPost(response.data.result);
    setComments(response.data.comments);
  }, [id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.imageUrl.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
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
  console.log(post);

  async function handleDeletePost() {
    const response = await instance.post("/api/user/delete-post", {
      postId: post._id,
    });
    if (response.status === 200) {
      setOpen(false);
      setPostDeleted(true);
      toast("Post has been deleted");
      window.history.back();
    }
  }
  if (!post) return null;
  // if (postDeleted) {
  //   // <NotFound />;
  //   return (
  //     <div class="bg-red-100 text-red-600 border border-red-300 p-4 rounded-md">
  //       Post has been removed
  //     </div>
  //   );
  // }
  return (
    <div className="flex justify-center items-start gap-4 p-4 bg-background bg-black h-screen">
      <Card className="w-[538px]">
        <CardContent className="p-0">
          <Carousel className="w-full">
            <CarouselContent>
              {post.imageUrl.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square">
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
            {post.imageUrl.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </CardContent>
      </Card>
      <Button
        variant="ghost"
        className="text-white hover:text-purple-700"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go back
      </Button>
      <>
        {/* <Button onClick={() => setOpen(true)} variant="outline">
          Delete Post
        </Button> */}

        {/* <Dialog>
          <DialogDescription open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <p>Are you sure you want to delete this post?</p>
            </DialogContent>
            <DialogTrigger>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleDeletePost} variant="danger">
                Delete
              </Button>
            </DialogTrigger>
          </DialogDescription>
        </Dialog> */}
        <Dialog>
          <DialogTrigger className="bg-white rounded">
            <Button onClick={() => setOpen(true)} variant="outline">
              Delete Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
                <div className="flex gap-4">
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleDeletePost} variant="danger">
                    Delete
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>

      {/* <Card className="w-[334px]">
        <CardHeader className="flex-row items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={post.userId.profilePicture}
                alt={post.userId.username}
              />
              <AvatarFallback>{post.userId.username[0]}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{post.userId.username}</span>
          </div>
          <Button variant="ghost" size="icon" aria-label="More options">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="pb-0">
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              <div>
                <span className="text-muted-foreground">{post.caption}</span>
              </div>
              {comments.map((comment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={comment.userId.profilePicture}
                        alt={comment.userId.username}
                      />
                      <AvatarFallback>
                        {comment.userId.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-semibold">
                        {comment.userId.username}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {comment.content}
                      </span>
                    </div>
                  </div>
                  {comment.replies && (
                    <div className="ml-8 space-y-2">
                      {comment.replies.map((reply) => (
                        <div key={reply._id} className="flex items-start gap-2">
                          <Avatar className="w-5 h-5 border border-primary">
                            <AvatarImage
                              src={reply.userId.profilePicture}
                              alt={reply.userId.username}
                            />
                            <AvatarFallback>
                              {reply.userId.username[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-semibold">
                              {reply.userId.username}
                            </span>{" "}
                            <span className="text-muted-foreground">
                              {reply.content}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex-col items-start">
          {session && (
            // session.username !== post.userDetails.username &&
            // !hidePostComment &&
            <form onSubmit={handleCommentSubmit} className="space-y-4 ">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-black text-white  border-purple-700 border-2 focus:border-purple-900"
              />
              <Button className="bg-purple-700" type="submit">
                Post Comment
              </Button>
            </form>
          )}
        </CardFooter>
      </Card> */}
    </div>
  );
}
