import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

  function handleUploadClick() {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  }

  function handleOpenModal() {
    setFiles(null);
    setSelectedFileUrls(null);
    setIsOpen(true);
  }

  const fetchProfileImages = useCallback(async () => {
    if (session?.id) {
      try {
        const response = await instance.post("/api/user/dating-tab3", {
          userId: session.id,
        });
        if (response) {
          setSelectedFileUrls(response.data.images);
        }
      } catch (error) {
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
    // Uncomment this if you intend to make a save call:
    // const response = await instance.post("/api/user/dating-tab2");
  }

  function addImage(e) {
    const newFiles = Array.from(e.target.files);
    const newFileUrls = newFiles.map((file) => URL.createObjectURL(file));
    setFiles(newFiles);
    setSelectedFileUrls(newFileUrls);
  }

  function closeModal() {
    setIsOpen(false);
    setFiles([]);
    setSelectedFileUrls([]);
  }

  async function uploadImageDb(toggleStatus) {
    if (toggleStatus) {

      const response = await instance.post("/api/user/dating-tab2", {
        url: uploadUrls,
        userId: session?.id,
      });

      if (response) {
        setFiles([]);
        setSelectedFileUrls([]);
        setIsOpen(false);
      }
    }
  }

  async function uploadDatingImages() {
    setSpin(true);

    if (files.length > 0) {
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
      toast('You have successfully added images.Save to keep changes.')

      setSpin(false);

      setIsOpen(false);
      setUploadUrls(edgeUploads);
    }
  }

  return (
    <div className="p-4 flex justify-center items-center">
      <Card className="w-full sm:max-w-md lg:w-1/2">
        <div className="border-b p-4 flex justify-between items-center">
          <CardTitle>Profile Images</CardTitle>
          <div className="flex flex-col">
            <Switch
              onClick={() => uploadImageDb(!toggleStatus)}
              checked={toggleStatus}
              onCheckedChange={() => toggleSave(!toggleStatus)}
            />
            {/* <p className="text-sm">save </p> */}
          </div>
        </div>
        <CardHeader className="text-center">
          <div className="flex gap-4">
            <CardDescription>Upload your profile images.</CardDescription>
            <CardDescription>
              <button
                disabled={!isEditing}
                onClick={handleOpenModal}
                className="flex items-center justify-center aspect-square rounded-md border border-dashed "
              >
                <Upload className="h-4 w-4 text-muted-foreground  hover:scale-125 cursor-pointer" />
                <span className="sr-only">Add Image</span>
              </button>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {selectedFileUrls?.length ? (
              <Image
                alt="Profile image"
                className="aspect-square rounded-md object-cover"
                height="300"
                src={selectedFileUrls[0]}
                width="300"
                loading="lazy"
              />
            ) : (
              <Skeleton className="h-[250px] w-[250px] rounded-md" />
            )}
            <div className="grid grid-cols-3 gap-2">
              {selectedFileUrls && selectedFileUrls.length > 1 ? (
                selectedFileUrls
                  .slice(1, 4)
                  .map((url, index) => (
                    <Image
                      key={index}
                      alt={`Profile thumbnail ${index + 1}`}
                      className="aspect-square rounded-md object-cover"
                      height="84"
                      src={url}
                      width="84"
                      loading="lazy"
                    />
                  ))
              ) : (
                <>
                  <Skeleton className="h-[84px] w-[84px] rounded-md" />
                  <Skeleton className="h-[84px] w-[84px] rounded-md" />
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        contentLabel="Upload Images Modal"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            &times;
          </button>
          <input
            ref={filePickerRef}
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={addImage}
            multiple
          />
          <h1 className="text-xl font-semibold mb-4">Upload Images</h1>
          <div
            onClick={handleUploadClick}
            className="flex items-center justify-center cursor-pointer mb-4 border border-dashed p-4 rounded-md"
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="ml-2 text-gray-600">Click to select images</span>
          </div>
          <Button onClick={uploadDatingImages} variant="">
            {!spin && <p>Add Images</p>}
            {spin && (
              <AiOutlineLoading3Quarters className="text-2xl text-white animate-spin" />
            )}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
