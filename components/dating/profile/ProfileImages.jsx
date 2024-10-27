import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Modal from "react-modal";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import instance from "@/axiosInstance";
import { useEdgeStore } from "@/app/lib/edgestore";
import { useCallback } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ProfileImages() {
  const { edgestore } = useEdgeStore();
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const filePickerRef = useRef(null);
  const [toggleStatus, setToggleStatus] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFileUrls, setSelectedFileUrls] = useState([]);
  const [uploadUrls, setUploadUrls] = useState([]);
  const [spin, setSpin] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [accountExist, setAccountExist] = useState(false);
  async function uploadImageDb(toggleStatus) {
    if (toggleStatus) {
      if (uploadUrls.length === 0) {
        toast.error("No Changes Detected.");
        return;
      }

      try {
        const response = await instance.post("/api/user/dating-tab2", {
          url: uploadUrls,
          userId: session?.id,
        });

        if (response) {
          setUploadUrls([]); // Clear the upload URLs after saving
          setIsOpen(false);
          toast.success("Changes saved.");
        }
      } catch (error) {
        console.error("Error saving images:", error);
        toast.error("Failed to save changes.");
      }
    }
  }

  const fetchProfileImages = useCallback(async () => {
    if (session?.id) {
      try {
        const response = await instance.post("/api/user/dating-tab3", {
          userId: session.id,
        });
        if (response) {
          setSelectedFileUrls(response.data.images);
          setAccountExist(true);
        }
      } catch (error) {
        setAccountExist(false);
        console.error("Error fetching profile images:", error);
      }
    }
  }, [session?.id]);

  useEffect(() => {
    fetchProfileImages();
  }, [fetchProfileImages]);

  async function toggleSave(state) {
    setToggleStatus(state);
    setIsEditing(!state);
  }

  function addImage(e) {
    const newFiles = Array.from(e.target.files);
    const newFileUrls = newFiles.map((file) => URL.createObjectURL(file));
    setFiles(newFiles);
    setSelectedFileUrls(newFileUrls);
  }

  function handleModalClose() {
    setIsOpen(false);
    setFiles([]);
    setSelectedFileUrls([]);
  }

  async function uploadDatingImages() {
    setSpin(true);
    if (files.length > 0 && files.length < 4) {
      setIsUploading(true);

      const edgeUploads = await Promise.all(
        files.map(async (file) => {
          const res = await edgestore.publicFiles.upload({
            file,
            onProgressChange: (progress) => {
              console.log(progress);
            },
          });
          return res.url;
        })
      );
      toast.success("Image Added.Save to keep changes.");

      setSpin(false);
      setIsUploading(false);

      setIsOpen(false);
      setUploadUrls(edgeUploads);
      setFiles([]);
      setSelectedFileUrls((prevUrls) => [...prevUrls, ...edgeUploads]);
    } else {
      toast.error("Maximum 3 Images");
    }
  }

  console.log(selectedFileUrls);

  if (!accountExist) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-black p-6 rounded-lg shadow-lg">
          <h2 className="scroll-m-20 text-white border-b pb-2 text-3xl font-semibold tracking-tight mb-4">
            Complete Profile Details First.
          </h2>
          <p className="text-gray-400 text-lg">
            Please fill out your profile information to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-black text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Profile Images</CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              onClick={() => uploadImageDb(!toggleStatus)}
              checked={toggleStatus}
              onCheckedChange={toggleSave}
            />
            <span className="text-sm text-muted-foreground">
              {toggleStatus ? "Saved" : "Editing"}
            </span>
          </div>
        </div>
        <CardDescription>Select a maximum of 3 images.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {selectedFileUrls?.length ? (
            <Image
              alt="Profile image"
              className="aspect-square rounded-lg object-cover"
              height={300}
              src={selectedFileUrls[0]}
              width={300}
            />
          ) : (
            <Skeleton className="h-[300px] w-full rounded-lg" />
          )}
          <div className="grid grid-cols-3 gap-2">
            {selectedFileUrls && selectedFileUrls.length > 0
              ? selectedFileUrls.slice(0, 3).map((url) => (
                  <Image
                    key={url} // Using the URL as a unique key if it's guaranteed to be unique
                    alt={`Profile thumbnail`} // Consider a more descriptive alt text
                    className="aspect-square rounded-md object-cover"
                    height={84}
                    src={url}
                    width={84}
                  />
                ))
              : Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[84px] w-full rounded-md"
                    />
                  ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setIsOpen(true)}
          disabled={!isEditing}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Images
        </Button>
      </CardFooter>

      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Profile Images</DialogTitle>
            <DialogDescription>
              Select images to upload for your profile. Click or drag files to
              the upload area.
            </DialogDescription>
          </DialogHeader>
          <div
            onClick={() => filePickerRef.current?.click()}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Click to select images or drag and drop
            </p>
          </div>
          <input
            ref={filePickerRef}
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={addImage}
            multiple
          />
          {files.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {files.map((file, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Selected image ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-0 right-0 h-6 w-6"
                    onClick={() => {
                      const newFiles = files.filter((_, i) => i !== index);
                      setFiles(newFiles);
                      setSelectedFileUrls(newFiles.map(URL.createObjectURL));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => handleModalClose()} variant="outline">
              Cancel
            </Button>
            <Button onClick={uploadDatingImages} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Add Images"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
