"use client";

import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import instance from "@/axiosInstance";

export default function Visibility() {
  const { data: session, status } = useSession();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(false);
  const handleProfileVisibilityToggle = async () => {
    if (!isProfileComplete) {
      toast.error(
        "You must complete your profile before turning on visibility."
      );
    } else {
      if (!session) {
        return;
      }
      setProfileVisibility((prev) => !prev);
      try {
        const response = await instance.post("/api/user/profile-visibility", {
          profileVisibility: !profileVisibility,
          userId: session?.id,
        });
        console.log(response);  
      } catch (error) {
        console.error("error in handleProfileVisibility"); 
      } 
    }
  };

  const fetchProfileComplete = useCallback(async () => {
    // Check if session or userId is available
    if (!session?.id) {
      console.error("User ID is required to fetch profile completion status.");
      setIsProfileComplete(false); // Set profile as incomplete or handle as needed
      return;
    }

    try {
      const response = await instance.post(
        "/api/user/profile-completion-status",
        {
          userId: session.id,
        }
      );
      console.log(response);

      setIsProfileComplete(response.data.isProfileComplete);
      setProfileVisibility(response.data.profile.profileVisibility)
    } catch (error) {
      console.error("Error fetching profile completion status:", error);
      // Optionally set profile as incomplete or handle error display in the UI
    }
  }, [session]);
  useEffect(() => {
    if (!session) return;
    fetchProfileComplete();
  }, [session, fetchProfileComplete]);
  return (
    <div>
      {" "}
      <div className="flex justify-between p-4">
        <div className="flex flex-col">
          <div>Profile Visibility</div>
          <div className="text-sm text-muted-foreground">
            turn visibility on to show your profile to others and see their
            profiles
          </div>
        </div>
        <div>
          <Switch
            checked={profileVisibility}
            onClick={handleProfileVisibilityToggle}
          />
        </div>
      </div>
    </div>
  );
}
