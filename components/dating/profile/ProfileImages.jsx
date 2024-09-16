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
    // Get the selected files from the input
    const newFiles = Array.from(e.target.files);

    // Generate URLs for the new files to display as previews
    const newFileUrls = newFiles.map((file) => URL.createObjectURL(file));

    // Update the files and selectedFileUrls state with the new files and URLs
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
    console.log(files);

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
      setIsOpen(false);
      setUploadUrls(edgeUploads);
    }
  }

  return (
    <di className="">
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
            className="flex items-center justify-center cursor-pointer m-2"
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-center">
            Click here to upload an image
          </div>
          <Button onClick={uploadDatingImages} variant="">
            Add Image
          </Button>
        </div>
      </Modal>
      <div className="p-2 flex justify-center items-center ">
        <Card className="overflow-hidden sm:w-full lg:w-1/2 ">
          <div className="border-b p-2 w-full h-full ">
            <Switch
              onClick={() => uploadImageDb(!toggleStatus)}
              checked={toggleStatus}
              onCheckedChange={() => toggleSave(!toggleStatus)}
            />
          </div>
          <CardHeader>
            <div className="flex justify-between ">
              <div>
                <CardTitle>Profile Images</CardTitle>
                <CardDescription>Upload your profile images.</CardDescription>
              </div>
              <div
                className={`flex cursor-pointer hover:text-gray-600 text-gray-400 items-center justify-center ${
                  isEditing ? "block" : "hidden"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {selectedFileUrls ? (
                <Image
                  alt="Profile image"
                  className="aspect-square rounded-md object-cover"
                  height="300"
                  src={selectedFileUrls[0]}
                  width="300"
                  loading="lazy"
                />
              ) : (
                <Skeleton className="h-[300px] w-[300px] rounded-xl" />
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
                    <Skeleton className="h-[84px] w-[84px] rounded-xl" />
                    <Skeleton className="h-[84px] w-[84px] rounded-xl" />
                  </>
                )}
                <button
                  disabled={!isEditing}
                  onClick={handleOpenModal}
                  className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                >
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Add Image</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </di>
  );
}
