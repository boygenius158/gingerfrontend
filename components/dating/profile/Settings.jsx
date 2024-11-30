import React, { useCallback, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const { data: session } = useSession();
  const [toggleStatus, setToggleStatus] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [age, setAge] = useState(20);
  const [profileVisibility, setProfileVisibility] = useState(false);
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountExist, setAccountExist] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const handleSliderChange = (value) => {
    setAge(value[0]); // Assuming value is an array with one number
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  async function toggleSave(state) {
    setToggleStatus(state);
    setIsEditing((prev) => !prev);

    if (state) {
      try {
        const data = {
          maximumAge: age,
          interestedGender: gender,
        };

        // Make an API request to your backend
        const response = await instance.post("/api/user/dating-tab4", data);
        console.log("Settings saved:", response.data);
      } catch (error) {
        console.error("Error saving settings:", error);
        setError("Failed to save settings.");
      }
    }
  }

  // const fetchProfileComplete = useCallback(async () => {
  //   // Check if session or userId is available
  //   if (!session?.id) {
  //     console.error("User ID is required to fetch profile completion status.");
  //     setIsProfileComplete(false); // Set profile as incomplete or handle as needed
  //     return;
  //   }

  //   try {
  //     const response = await instance.post(
  //       "/api/user/profile-completion-status",
  //       {
  //         userId: session.id,
  //       }
  //     );

  //     setIsProfileComplete(response.data.isProfileComplete);
  //   } catch (error) {
  //     console.error("Error fetching profile completion status:", error);
  //     // Optionally set profile as incomplete or handle error display in the UI
  //   }
  // }, [session]);

  // useEffect(() => {
  //   if (!session) return;
  //   fetchProfileComplete();
  // }, [session, fetchProfileComplete]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        if (!session) {
          return;
        }
        const response = await instance.get("/api/user/settings", {
        });
        console.log(response);

        if (response.data) {
          setAge(response.data.data.maximumAge || 18);
          setProfileVisibility(response.data.data.profileVisibility || false);
          setGender(response.data.data.gender || "not specified");
          setAccountExist(true);
        }
      } catch (error) {
        setAccountExist(false);
        console.error("Error fetching settings:", error);
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    if (session?.id) {
      fetchSettings();
    }
  }, [session]);

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loading indicator
  }

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
    <div className="w-[400px] h-[280px] border rounded-md flex flex-col bg-black  border-gray-500">
      <div className="p-2">
        <Switch
          onClick={() => toggleSave(!toggleStatus)}
          checked={toggleStatus}
        />
      </div>
      <div className="border-b"></div>
      <div className="border-b"></div>
      <div className="mb-6">
        <div className="p-4">Maximum Age Interested: {age}</div>
        <div className="ml-2 mr-2">
          <Slider
            disabled={isEditing}
            onValueChange={handleSliderChange}
            defaultValue={[age]}
            min={18}
            max={40}
            step={1}
          />
        </div>
      </div>
      <div className="border-b"></div>
      <div className="flex flex-col mt-4 gap-2">
        <div className="ml-2">Gender Preference</div>
        <div className="text-4xl ml-4">
          <Label>Select Gender</Label>

          <Select
            disabled={isEditing}
            value={gender}
            onValueChange={handleGenderChange}
          >
            <SelectTrigger className="w-[180px] bg-gray-700 text-gray-300">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* <div className="border-b mt-4"></div> */}
     
    </div>
  );
}
