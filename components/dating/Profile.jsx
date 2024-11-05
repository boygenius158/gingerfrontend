"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEdgeStore } from "@/app/lib/edgestore";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProfileImages from "./profile/ProfileImages";
import Settings from "./profile/Settings";
import Visibility from "./profile/Visibility";

export default function Profile() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bio: "",
    gender: "",
  });
  const [selectedFileUrls, setSelectedFileUrls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.id) {
        try {
          const response = await instance.post("/api/user/dating-tab1-getdetails", {
            userId: session.id,
          });
          setFormData(response.data.formData);
        } catch (error) {
          console.error("Error loading profile:", error);
          setError("Failed to load profile data.");
        }
      }
    };

    fetchProfile();
  }, [session?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const validateForm = () => {
    const { name, age, bio, gender } = formData;

    if (!name || !age || !bio || !gender) {
      toast.error("All fields are required.");
      return false;
    }

    if (age < 18 || age > 100) {
      toast.error("Age must be between 18 and 100.");
      return false;
    }

    return true;
  };
  const handleSaveOrEdit = async () => {
    if (isEditing) {
      // Save the form data
      if (validateForm()) {
        try {
          const response = await instance.post("/api/user/dating-tab1", {
            formData,
            userId: session?.id,
          });

          if (response) {
            toast.success("Profile updated successfully!");
          } else {
            toast.error("Failed to update profile.");
          }

          setIsEditing(false);
        } catch (error) {
          toast.error("Error updating profile.");
          console.error("Error updating profile:", error);
        }
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="sm:ml-8 lg:ml-0 min-h-screen bg-black text-white">
      <div className="flex justify-center items-center p-4">
        <Tabs defaultValue="profile-details" className="w-full max-w-3xl">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile-details">Profile Details</TabsTrigger>
            <TabsTrigger value="profile-image">Profile Images</TabsTrigger>
            <TabsTrigger value="Filter">Settings</TabsTrigger>
            <TabsTrigger value="Status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="profile-details">
            <div className="flex flex-col items-center justify-center p-4 w-full">
              <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-4">
                Create your dating profile
              </h1>
              <form className="w-full max-w-md space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    disabled={!isEditing}
                    value={formData?.name}
                    onChange={handleChange}
                    className="bg-gray-800 text-white"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    disabled={!isEditing}
                    value={formData?.age}
                    onChange={handleChange}
                    className="bg-gray-800 text-white"
                    placeholder="Age"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    disabled={!isEditing}
                    value={formData?.bio}
                    onChange={handleChange}
                    className="bg-gray-800 text-white min-h-[100px]"
                    placeholder="Bio"
                    required
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select
                    disabled={!isEditing}
                    value={formData?.gender}
                    onValueChange={handleOptionChange}
                  >
                    <SelectTrigger className="w-[180px] bg-black">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Toggle between Edit and Save */}
                <Button
                  onClick={handleSaveOrEdit}
                  className="w-full bg-purple-700"
                  type="button"
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="profile-image">
            <ProfileImages fileUrls={selectedFileUrls} />
          </TabsContent>

          <TabsContent value="Filter">
            <div className="flex items-center justify-center">
              <Settings />
            </div>
          </TabsContent>
          <TabsContent value="Status">
            <div className="flex items-center justify-center">
              <Visibility/>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
