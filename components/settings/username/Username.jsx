import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

export default function Username() {
  const { data: session, update } = useSession();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [bio, setBio] = useState("");
  const [disabled, setDisabled] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (session) {
          const response = await instance.post(
            "/api/user/fetch-name-username",
            {
              // id: session?.id,
            }
          );
          console.log(response);

          setName(response.data.user.name);
          setUsername(response.data.user.username);
          setBio(response.data.user.bio);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [session]);

  // Handle form input changes
  const handleUsernameChange = (e) => {
    const value = e.target.value.trim(); // Trim whitespace from the username
    const alphanumericRegex = /^[a-zA-Z0-9]*$/; // Regular expression to allow only alphanumeric characters

    // Check for spaces or symbols
    if (!alphanumericRegex.test(value)) {
      toast.error("Username should only contain letters and numbers.");
      setDisabled(true);
    } else if (value.length > 10) {
      // Check for length greater than 10
      toast.error("Username cannot be more than 10 letters.");
      setDisabled(true);
    } else if (value.length === 0) {
      // Check if username is just spaces
      toast.error("Username cannot be empty.");
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    setUsername(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length > 20) {
      toast.error("Name cannot exceed 20 characters.");
      setDisabled(true);
    } else {
      setName(value);
      setDisabled(false);
    }
  };

  const handleBioChange = (e) => {
    const value = e.target.value;
    if (value.length > 30) {
      toast.error("Bio cannot exceed 30 characters.");
      setDisabled(true);
    } else {
      setBio(value);
      setDisabled(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing error
    if (!username.trim()) {
      toast.error("username is empty");
      return;
    }

    try {
      const response = await instance.put("/api/user/update-user", {
        name,
        username,
        bio,
      }); // Adjust the endpoint as needed
      console.log(response);

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        await update({ username: username });
        await update({ name: name });
      } else {
        setError(response.data.error || "Username is not available.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <Card className="bg-black text-white border border-gray-700">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you are done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-1 text-white bgbr">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                className="text-black"
                onChange={handleUsernameChange}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="space-y-1 text-white">
              <Label htmlFor="name">Name</Label>
              <Input
                className="text-black"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                className="text-black"
                value={bio}
                onChange={handleBioChange}
              />
            </div>
            <CardFooter>
              <Button
                className="bg-purple-700"
                disabled={disabled}
                type="submit"
              >
                Save changes
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
