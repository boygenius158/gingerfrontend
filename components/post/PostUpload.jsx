import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { HiPhoto } from "react-icons/hi2";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Modal from "react-modal";
import { useRef, useState } from "react";
import axios from "axios";
import { RefreshCcw } from "lucide-react";

import instance from "@/axiosInstance";

export default function PostUpload({ onNewPost }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [imageFileUrls, setImageFileUrls] = useState([]);
  const filePickerRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [spin, setSpin] = useState(false);

  const uploadFiles = async (uploadUrls) => {
    try {
      await Promise.all(
        uploadUrls.map(async (uploadInfo, index) => {
          console.log(uploadInfo, index);

          const file = selectedFiles[index];
          try {
            await axios.put(uploadInfo.uploadUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
              onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log(`File ${file.name} is ${progress}% uploaded`);
              },
            });
            setIsOpen(false);
            setSelectedFiles([]);
            setImageFileUrls([]);
            setCaption("");
            setSpin(false);
          } catch (error) {
            console.error(`Error uploading file: ${file.name}`, error);
          }
        })
      );
      // setUploadStatus("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      // setUploadStatus("Error uploading files");
    }
  };
  const saveFileDatabase = async (uploadUrls) => {
    console.log(uploadUrls);
  };
  const getPresignedUrls = async () => {
    const fileData = selectedFiles.map((file) => ({
      fileName: file.name,
      fileType: file.type,
    }));

    try {
      console.log("hi", session);
      if (!session) return;
      const response = await instance.post("/api/getPresignedUrls", {
        files: fileData,
        caption: caption,
        userId: session?.id,
      });

      console.log("Presigned URLs:", response.data.presignedUrls);
      console.log("Post data:", response.data.post); // Check this output
      console.log(response);

      const newPost = response.data.post; // New post returned from API
      if (onNewPost) {
        console.log(newPost);

        onNewPost(newPost);
      }

      return response.data.presignedUrls;
    } catch (error) {
      console.error("Error getting presigned URLs:", error);
      // Handle error accordingly
    }
  };

  const handleUpload = async () => {
    try {
      setSpin(true);

      const uploadUrls = await getPresignedUrls();
      await uploadFiles(uploadUrls);
      const place = await saveFileDatabase(uploadUrls);
      console.log(place);
    } catch (error) {
      console.error("Upload failed:", error);
      // setUploadStatus("Upload failed");
    }
  };
  function addImageToPost(e) {
    const files = Array.from(e.target.files);
    if (files.length) {
      setSelectedFiles(files);

      setImageFileUrls(files.map((file) => URL.createObjectURL(file)));
    }
  }
  function handleCaptionChange(e) {
    setCaption(e.target.value);
  }
  console.log(session);
  function closeUploadModal() {
    setIsOpen(false);
    setSelectedFiles([]);
    setImageFileUrls([]);
    setCaption("");
  }
  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          ariaHideApp={false}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col items-center ">
            <h2 className="text-xl text-gray-500 font-semibold mb-4">
              Create new post
            </h2>
            <div>
              <AiOutlineClose
                className="cursor-pointer absolute top-4 right-4 hover:text-red-600 transition duration-300"
                onClick={closeUploadModal}
              />
            </div>
            <div className="border-b w-full"></div>
            <div className="p-2 ">
              <Tabs defaultValue="images" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="caption">Caption</TabsTrigger>
                </TabsList>

                <div className="flex flex-col">
                  <div className="flex items-center justify-center">
                    <TabsContent value="images">
                      <div className="p-2 text-gray-500">
                        <p>Tap on the images to remove selection</p>
                      </div>
                      <div className="flex items-center justify-center">
                        {imageFileUrls.length > 0 ? (
                          <Carousel>
                            {/* Wrap the actual items */}
                            <CarouselContent>
                              {imageFileUrls.map((url, index) => (
                                <CarouselItem
                                  key={index}
                                  className="shrink-b0 w-full h-full flex items-center justify-center relative"
                                >
                                  <div className="relative group flex items-center justify-center border cursor-pointer">
                                    <Image
                                      src={url}
                                      alt={`selected file ${index}`}
                                      width={150}
                                      height={150}
                                      className="cursor-pointer hover:opacity-70 w-[150px] h-[150px] object-fit "
                                      onClick={() => handleImageClick(index)}
                                    />
                                    {/* Red overlay */}
                                    <div
                                      onClick={() => handleImageClick(index)}
                                      className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center"
                                    >
                                      <span className="text-white text-sm">
                                        Remove
                                      </span>
                                    </div>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>

                            {/* Navigation buttons */}
                            <CarouselPrevious className="text-blue-400 hover:text-blue-500" />
                            <CarouselNext className="text-blue-400 hover:text-blue-500" />
                          </Carousel>
                        ) : (
                          <div onClick={() => filePickerRef.current.click()}>
                            <div className="relative inline-block">
                              <HiPhoto className="text-8xl text-blue-400 hover:text-blue-500 cursor-pointer" />
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <TabsContent value="caption">
                    <input
                      type="text"
                      maxLength="150"
                      onChange={handleCaptionChange}
                      placeholder="Please enter your caption..."
                      className="m-4 border p-2 rounded text-center  focus:ring-0 outline-none"
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <input
              hidden
              ref={filePickerRef}
              type="file"
              name="file"
              accept="image/*"
              multiple
              onChange={addImageToPost}
            />

            <Button
              // onClick={handleSubmit}
              onClick={handleUpload}
              disabled={selectedFiles.length === 0}
              className="w-full  text-white p-2 shadow-md rounded-lg hover:bg-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              {!spin && <p>Upload</p>}
              {spin && (
                <AiOutlineLoading3Quarters className="text-2xl text-white animate-spin" />
              )}
            </Button>
          </div>
        </Modal>
      )}
      <Card className="w-[690px]  mx-auto mt-5 bg-black text-black border-gray-700">
        {/* <CardHeader className="border-b">
        <h2 className="text-lg font-semibold">Home</h2>
      </CardHeader> */}
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <Image
              alt="Profile picture"
              className="rounded-full"
              height="40"
              src={session?.profilePicture}
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
            <div className="flex-1  curp">
              <p className="w-full bg-black border-0 text-lg text-gray-700 focus-visible:ring-0">
                What's happening?
              </p>
              <div className="flex justify-between items-center gap-2 mt-6">
                <Button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="bg-purple-700 hover:bg-purplhwe-600 text-white"
                >
                  Create New Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
