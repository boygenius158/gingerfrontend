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
  const { data: session } = useSession();
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
              id: session?.id,
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
    const value = e.target.value;
    if (/\s/.test(value)) {
      toast("Username should not contain spaces.");
      setDisabled(true);
    } else {
      // toast("");
      setDisabled(false);

    }
    setUsername(value);
  };
  const handleNameChange = (e) => setName(e.target.value);
  // const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleBioChange = (e) => setBio(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors
    try {
      const response = await instance.post("/api/user/update-user", {
        id: session?.id,
        name,
        username,
        bio,
      }); // Adjust the endpoint as needed
      console.log(response);

      if (response.data.success) {
        // alert("Profile updated successfully!");
        toast.success("profile updated successfully!");
      } else {
        console.log(response);

        // Set error message if response indicates an issue
        setError(response.data.error || "Username is not available.");
      }
    } catch (error) {
      console.log(error);

      console.error("Error updating user data:", error);
      // setError(error);
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
              <Label htmlFor="name">Bio</Label>

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
               type="submit">Save changes</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
