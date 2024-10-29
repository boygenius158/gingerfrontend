"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  Ban,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import instance from "@/axiosInstance";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

function PostGUI() {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    console.log(id);
    
    await instance.post("/api/admin/delete-record", { id });
    setReportedPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== id)
    );
  }

  async function confirmBanPost(postId) {
    try {
      const response = await instance.post("/api/admin/banPost", { postId });
      if (response) {
        toast.success("Post has been banned and deleted.");
        await handleDeleteRecord(postId);
        fetchReportedPosts();
        setSelectedPost(null);
      }
    } catch (error) {
      console.error("Error banning post:", error);
      setError("Failed to ban post. Please try again.");
    } finally {
      setShowConfirmation(false);
    }
  }

  useEffect(() => {
    fetchReportedPosts();
  }, []);
  console.log(reportedPosts);
  
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex gap-2">
        <h1 className="text-3xl font-bold">Reported Posts</h1>
        <div
          onClick={() => fetchReportedPosts()}
          className="mt-2 cursor-pointer hover:animate-spin hover:duration-[2000ms]"
        >
          <RefreshCcw />
        </div>
      </div>

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
              <TableHead>Action</TableHead>
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
                    // variant={post?.postId?.isBanned ? "destructive" : "success"}
                  >
                    take action
                  </Badge>
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

              <Card className="relative">
                <CardContent className="p-0">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {selectedPost?.postId?.imageUrl?.map((url, index) => (
                        <CarouselItem key={index}>
                          <div className="relative aspect-square">
                            <Image
                              src={url}
                              alt={`Post image ${index + 1} of ${
                                selectedPost?.postId?.imageUrl.length
                              }`}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {selectedPost?.postId?.imageUrl?.length > 1 && (
                      <>
                        <CarouselPrevious />
                        <CarouselNext />
                      </>
                    )}
                  </Carousel>
                </CardContent>
              </Card>

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

              {!selectedPost?.postId?.isBanned && (
                <Button
                  variant="destructive"
                  onClick={() => setShowConfirmation(true)}
                  className="w-full"
                >
                  <Ban className="mr-2 h-4 w-4" /> Ban Post
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Ban</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to ban this post? This action is irreversible.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmBanPost(selectedPost?.postId?._id)}
            >
              Confirm Ban and Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostGUI;
