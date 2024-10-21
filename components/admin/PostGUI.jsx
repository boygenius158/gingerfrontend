"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { AlertCircle, Ban, ExternalLink } from "lucide-react";
import instance from "@/axiosInstance";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function PostGUI() {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchReportedPosts() {
    try {
      setIsLoading(true);
      const response = await instance.post("/api/admin/filterPost");
      if (response && response.data) {
        setReportedPosts(response.data.posts);
      }
    } catch (error) {
      console.error("Error fetching reported posts:", error);
      setError("Failed to fetch reported posts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleDeleteRecord(id) {
    const response = await instance.post("/api/admin/delete-record", {
      id,
    });
    const updatedRecords = reportedPosts.filter((post) => post._id !== id);
    setReportedPosts(updatedRecords);
  }
  async function banPost(postId) {
    try {
      await instance.post("/api/admin/banPost", { postId });
      fetchReportedPosts();
      setSelectedPost(null);
    } catch (error) {
      console.error("Error banning post:", error);
      setError("Failed to ban post. Please try again.");
    }
  }

  useEffect(() => {
    fetchReportedPosts();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Reported Posts</h1>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post ID</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Delete Record</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportedPosts.map((post) => (
              <TableRow key={post._id} className="cursor-pointer">
                <TableCell className="font-medium">{post._id}</TableCell>
                <TableCell>@{post?.postId?.userId?.username}</TableCell>
                <TableCell>
                  <Badge
                    onClick={() => setSelectedPost(post)}
                    variant={post?.postId?.isBanned ? "destructive" : "success"}
                  >
                    {post?.postId?.isBanned ? "Banned" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {/* {format(new Date(post?.postId?.createdAt), "PPpp")} */}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteRecord(post._id)}
                    variant="outline"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <div>
                <strong>Post ID:</strong> {selectedPost._id}
              </div>
              <div>
                <strong>Owner:</strong> @
                {selectedPost?.postId?.userId?.username}
              </div>
              <div className="relative h-48 w-full">
                <Image
                  src={selectedPost?.postId?.imageUrl[0]}
                  alt="Post image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <Badge
                  variant={
                    selectedPost?.postId?.isBanned ? "destructive" : "success"
                  }
                >
                  {selectedPost?.postId?.isBanned ? "Banned" : "Active"}
                </Badge>
              </div>
              <div>
                <strong>Created At:</strong>{" "}
                {format(new Date(selectedPost?.postId?.createdAt), "PPpp")}
              </div>
              <div className="flex items-center space-x-2">
                <strong>Visit Post:</strong>
                <Link
                  href={`/post/${selectedPost?.postId?._id}`}
                  className="text-blue-500 hover:underline flex items-center"
                >
                  Link <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </div>
              {!selectedPost?.postId?.isBanned && (
                <Button
                  variant="destructive"
                  onClick={() => banPost(selectedPost?.postId?._id)}
                  className="w-full"
                >
                  <Ban className="mr-2 h-4 w-4" /> Ban Post
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostGUI;
