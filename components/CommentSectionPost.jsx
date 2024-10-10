"use client";

import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

export default function CommentSectionPost({ post }) {
  const { data: session, status } = useSession();
  const [hidePostComment, setHidePostComment] = useState(false);
  const [hideReplyComment, setHideReplyComment] = useState(false);
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [reply, setReply] = useState("");

  const fetchComments = useCallback(async () => {
    if (!session) {
      return;
    }
    const res = await instance.post("/api/user/fetch-post-comment", {
      postId: post._id,
    });
    setComments(res.data.comments);
  }, [session, post._id]);

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
    if (res) {
      toast.success("Comment added.");
    }
  };

  
  

  function switchComment() {
    setHidePostComment(!hidePostComment); 
    setHideReplyComment(!hideReplyComment);
  }
  console.log(comments);

  return (
    <div className="w-full mx-auto p-4 bg-background rounded-lg shadow text-white bg-black">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ScrollArea className="h-[120px] mb-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex flex-col mb-4">
            <div className="flex space-x-4">
              <Avatar className="border-2 border-purple-700">
                <AvatarImage src={comment.avatar} alt="failed" />
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-muted-foreground">{comment.content}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs ml-12"
               
              >
                Reply
              </Button>
            </div>

           
          </div>
        ))}
      </ScrollArea>

      
      {session &&
        session.username !== post.userDetails.username &&
        !hidePostComment && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full text-black border-purple-700 border-2 focus:border-purple-900"
            />
            <Button className="bg-purple-700" type="submit">
              Post Comment
            </Button>
          </form>
        )}
    </div>
  );
}
