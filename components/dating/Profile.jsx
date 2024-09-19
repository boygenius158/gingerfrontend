"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEdgeStore } from "@/app/lib/edgestore";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Modal from "react-modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProfileImages from "./profile/ProfileImages";
import Settings from "./profile/Settings";

export default function Profile() {
  const { edgestore } = useEdgeStore();
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFileUrls, setSelectedFileUrls] = useState([]);
  const [user, setUser] = useState({});
  const [toggleStatus, setToggleStatus] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bio: "",
    gender: "",
  });

  const filePickerRef = useRef(null);

  const handleOptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
    console.log(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadDatingImages = async () => {
    if (files.length > 0) {
      const uploadUrls = await Promise.all(
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

      const response = await instance.post("/api/user/upload-dating-images", {
        formData: formData,
        url: uploadUrls,
        userId: session?.id,
      });
      if (response) {
        setFiles([]);
        setSelectedFileUrls([]);
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.id) {
        try {
          const response = await instance.post(
            "/api/user/dating-tab1-getdetails",
            {
              userId: session.id,
            }
          );
          console.log(response.data.formData);
          setFormData(response.data.formData);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setError("Failed to load profile data.");
        }
      }
    };

    fetchProfile();
  }, [session?.id]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUploadClick = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  const addImage = (e) => {
    const file = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...file]);

    const fileUrl = file.map((file) => URL.createObjectURL(file));
    setSelectedFileUrls((prev) => [...prev, ...fileUrl]);
  };

  const toggleSave = async (data) => {
    setIsEditing((prev) => !prev);
    setToggleStatus((prev) => !prev);
    if (data) {
      console.log("profile updated", formData);
      const response = await instance.post("/api/user/dating-tab1", {
        formData,
        userId: session?.id,
      });
      if (response) {
        console.log("success");
      }
    }
  };

  return (
    <div className="sm:ml-8 lg:ml-0 h-screen overflow-hidden">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </div>
          <div className="flex items-center justify-center">
            Click here to upload an image
          </div>
          <Button onClick={uploadDatingImages} variant="">
            Upload
          </Button>
        </div>
      </Modal>
      <div className="flex justify-center items-center ">
        <Tabs defaultValue="profile-details" className="w-[600px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile-details">Profile Details</TabsTrigger>
            <TabsTrigger value="profile-image">Profile Images</TabsTrigger>
            <TabsTrigger value="Filter">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="profile-details">
            <div className="flex  items-center justify-center p-4  w-full ">
              <div>
                <form className="">
                  <div className="border rounded">
                    <div className="mb-4">
                      <div className="p-2">
                        <Switch
                          checked={toggleStatus}
                          onCheckedChange={() => toggleSave(!toggleStatus)}
                        />
                      </div>
                      <div className="border-b"></div>
                      <div className="p-4">
                        <label className="block mb-2 text-gray-700">
                          Name:
                          <input
                            onChange={handleChange}
                            value={formData.name}
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            disabled={!isEditing}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </label>
                        <div className="mb-4">
                          <label className="block mb-2 text-gray-700">
                            Age:
                            <input
                              onChange={handleChange}
                              value={formData.age}
                              type="number"
                              name="age"
                              placeholder="Enter your age"
                              disabled={!isEditing}
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </label>
                        </div>

                        <div className="mb-4">
                          <label className="block mb-2 text-gray-700">
                            Bio:
                            <textarea
                              onChange={handleChange}
                              name="bio"
                              value={formData.bio}
                              placeholder="Write a short bio"
                              disabled={!isEditing}
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </label>
                        </div>

                        <div className="mb-4">
                          <Label>Gender:</Label>
                          <RadioGroup
                            value={formData.gender}
                            onValueChange={handleOptionChange}
                            className="flex flex-col mt-2"
                          >
                            <div className="flex items-center">
                              <RadioGroupItem
                                value="male"
                                id="male"
                                className="mr-2"
                              />
                              <Label htmlFor="male" className="cursor-pointer">
                                Male
                              </Label>
                            </div>
                            <div className="flex items-center mt-2">
                              <RadioGroupItem
                                value="female"
                                id="female"
                                className="mr-2"
                              />
                              <Label
                                htmlFor="female"
                                className="cursor-pointer"
                              >
                                Female
                              </Label>
                            </div>
                            {/* <div className="flex items-center mt-2">
                              <RadioGroupItem
                                value="other"
                                id="other"
                                className="mr-2"
                              />
                              <Label htmlFor="other" className="cursor-pointer">
                                Other
                              </Label>
                            </div> */}
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                    {/* <div className="border-t">
                      <div className="p-2">
                        <Button
                          type="submit"
                          disabled={!isEditing}
                          onClick={() => toggleSave(formData)}
                        >
                          {isEditing ? "Save" : "Edit"}
                        </Button>
                      </div>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="profile-image">
            <ProfileImages
              openModal={() => setIsOpen(true)}
              fileUrls={selectedFileUrls}
            />
          </TabsContent>
          <TabsContent value="Filter">
            <div className="flex items-center justify-center">
              <Settings />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
