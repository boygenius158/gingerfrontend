import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Settings() {
  const { data: session } = useSession();
  const [toggleStatus, setToggleStatus] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [age, setAge] = useState(20);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountExist, setAccountExist] = useState(true);

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
          profileVisibility,
          maximumAge: age,
          interestedGender: gender,
          userId: session?.id,
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

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        if (!session) {
          return;
        }
        const response = await instance.post("/api/user/settings", {
          userId: session?.id,
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
    <div className="w-[400px] h-screen border rounded-md flex flex-col bg-gray-800">
      <div className="p-2">
        <Switch
          onClick={() => toggleSave(!toggleStatus)}
          checked={toggleStatus}
        />
      </div>
      <div className="border-b"></div>
      <div className="border-b"></div>
      <div className="mb-6">
        <div className="p-4">Maximum Age: {age}</div>
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
          <Select
            disabled={isEditing}
            value={gender}
            onValueChange={handleGenderChange}
          >
            <SelectTrigger className="w-[180px] bg-black text-gray-300">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="border-b mt-4"></div>
      <div className="flex justify-between p-4">
        <div>Profile Visibility</div>
        <div>
          <Switch
            disabled={isEditing}
            checked={profileVisibility}
            onClick={() => setProfileVisibility((prev) => !prev)}
          />
        </div>
      </div>
      <div className="border-b mt-4"></div>
    </div>
  );
}
