"use client";

import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function CommentSectionPost({ post }) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = useCallback(async () => {
    if (!session) {
      return;
    }
    const res = await instance.post("/api/user/fetch-post-comment", {
      // userId:session.id,
      postId: post._id,
    });
    console.log(res.data.comments);
    setComments(res.data.comments);

    // setComments(res.comments);
  }, [session, post._id]);
  console.log(session);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        _id: comments.length + 1,
        author: session.username,
        content: newComment.trim(),
        // userId: "/placeholder.svg?height=40&width=40",
        // avatar:"https://i.pinimg.com/564x/15/8a/eb/158aeb64810994c8bdacce8bdce895a0.jpg"
        avatar: session.profilePicture,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
    const res = await instance.post("/api/user/user-posted-commented", {
      content: newComment,
      userId: session?.id,
      postId: post._id,
    });
    console.log(res);
    if(res){
      toast.success('Comment added.')
    }
  };
  console.log(session.username);

  console.log(post.userDetails.username !== session.username);

  return (
    <div className="w-full mx-auto p-4 bg-background rounded-lg shadow text-white bg-black">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ScrollArea className="h-[120px] mb-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex space-x-4 mb-4">
            <Avatar className="border-2 border-purple-700">
              <AvatarImage className="" src={comment.avatar} alt="failed" />
              {/* <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback> */}
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{comment.author}</p>
              <p className="text-muted-foreground">{comment.content}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      {session && session.username !== post.userDetails.username && (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full text-black  border-purple-700 border-2 focus:border-purple-900"
            />
            <Button className="bg-purple-700" type="submit">
              Post Comment
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
