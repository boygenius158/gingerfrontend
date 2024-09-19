import useProfileStore from "@/app/store/user/profileStore";
import { useSession } from "next-auth/react";
import Modal from "react-modal";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import NotFound from "./NotFound";
import instance from "@/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiCamera } from "react-icons/hi";
import { Button } from "./ui/button";
import { useEdgeStore } from "@/app/lib/edgestore";
import Link from "next/link";
import PostSection from "./profile/PostSection";
import SavedPosts from "./profile/SavedPosts";

export default function Profile({ username }) {
  const { edgestore } = useEdgeStore();
  const filePickerRef = useRef(null);
  const { data: session, status } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditProfile, setIsEditProfileOpen] = useState(false);
  console.log(session);

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    // profilePicture: ''
  });
  const { user, posts } = useProfileStore((state) => ({
    user: state.user,
    posts: state.posts,
  }));
  async function handleSubmit() {
    if (selectedFile) {
      const res = await edgestore.publicFiles.upload({
        file: selectedFile,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
      console.log(res);
      const response = await instance.post("/api/user/uploadProfile", {
        url: res.url,
        userId: session?.id,
      });
      if (response) {
        console.log(response);

        setSelectedFile(null);
        setImageFileUrl(null);
        setIsOpen(false);
        session.user.image = response.data.url;
      }
    }
  }
  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (user && session) {
        try {
          const res = await instance.post("/api/user/checkFollowingStatus", {
            followUser: user.email,
            orginalUser: session.user.email,
          });
          setIsFollowing(res.data.followThatUser);
        } catch (error) {
          console.error("Failed to check following status", error);
        }
      }
    };
    checkFollowingStatus();
  }, [user, session]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        bio: user.bio,
      });
    }
  }, [user]);
  console.log(posts);

  if (!user || !user.email) {
    return <NotFound />; // Render nothing if user data is not available yet
  }

  const isSameUser = session?.user?.email === user.email;
  function handleModalClose() {
    // onClick={() => setIsOpen(false)}
    setIsOpen(false);
    setImageFileUrl(null);
    setSelectedFile(null);
  }
  async function handleFollow() {
    // Optimistic UI Update
    setIsFollowing((prev) => !prev);

    try {
      const res = await instance.post("/api/user/followprofile", {
        followUser: user.email,
        orginalUser: session.user.email,
      });
      console.log(res);
    } catch (error) {
      console.error("Failed to follow/unfollow profile", error);
      // Revert UI Update if API call fails
      setIsFollowing((prev) => !prev);
    }
  }

  async function handleSaveProfile() {
    try {
      console.log("invoked");
      setIsEditProfileOpen(false);

      const res = await instance.post("/api/user/updateProfile", {
        ...profileData,
        email: user.email, // Assuming email is required for the update
      });

      if (res.data.success) {
        // Update profile data in Zustand store or any other state management
        console.log("Profile updated successfully");
        setIsEditProfileOpen(false);
      } else {
        console.error("Profile update failed:", res.data.message);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  }
  function addImageToPost(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }
  console.log();

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 xl:px-72">
      {isEditProfile ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProfile();
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Bio</label>
              <Textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                // className="border border-gray-300 p-2 rounded w-full"
                rows="4"
              />
            </div>

            <div className="flex space-x-4">
              <button type="submit" className=" py-1 px-4 rounded">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Save
                </h4>
              </button>

              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="border border-gray-400 py-1 px-4 rounded"
              >
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Cancel
                </h4>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:space-x-24">
          <div className="rounded-full flex items-center justify-center border-gray-300 mb-6 lg:mb-0">
            <Image
              src={user.profilePicture}
              className="rounded-full p-1 w-[145px] h-[145px] object-cover"
              width={145}
              height={145}
              alt=""
              onClick={() => setIsOpen(true)}
            />
          </div>

          <div>
            <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-start lg:space-x-6">
              <span className="font-bold text-lg">@{user.username}</span>
              <span>
                {isSameUser ? (
                  <span className="">
                    {/* <button onClick={() => setIsEditProfileOpen(true)}>
                        Edit Profile
                      </button> */}
                    <Button
                      onClick={() => setIsEditProfileOpen(true)}
                      variant="outline"
                    >
                      Edit Profile
                    </Button>
                  </span>
                ) : (
                  <button
                    className="border border-gray-400 rounded py-1 px-2 mt-2 lg:mt-0 hover:bg-gray-200"
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </span>

              <div className="flex items-center justify-center mt-2 lg:mt-0"></div>
            </div>
            <div className="flex justify-between pt-3 text-center lg:text-left">
              <span className="text-sm font-semibold">
                {posts.length} posts
              </span>
              <span className="text-sm font-semibold">
                {user.followers.length} followers
              </span>
              <span className="text-sm font-semibold">
                {user.following.length} following
              </span>
            </div>
            <div className="pt-6 grid">
              <span className="text-lg font-semibold">{profileData.name}</span>
              <span>
                <br />
                {profileData.bio}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="pt-4"></div>
      <div className="border w-full"></div>

      <div className="mt-2">
        <Tabs defaultValue="posts">
          <div className="flex items-center justify-center font-extrabold">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="saved-posts">Saved Post</TabsTrigger>
                
              </TabsList>
            </div>
          </div>

          <TabsContent value="saved-posts">
            <SavedPosts username={username } />
          </TabsContent>
          <TabsContent value="posts">
            <PostSection posts={posts} />
          </TabsContent>
          <TabsContent value="archived"></TabsContent>
        </Tabs>
        
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          ariaHideApp={false}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col items-center ">
            <h2 className="text-xl font-semibold mb-4">Add New Profile</h2>
            {selectedFile ? (
              <Image
                onClick={() => setSelectedFile(null)}
                src={imageFileUrl}
                alt="selected file"
                width={300}
                height={300}
              />
            ) : (
              <HiCamera
                onClick={() => filePickerRef.current.click()}
                className="text-5xl text-gray-400 cursor-pointer"
              />
            )}

            <input
              hidden
              ref={filePickerRef}
              type="file"
              accept="image/*"
              onChange={addImageToPost}
            />

            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className="w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Upload Profile Picture
            </button>
            <AiOutlineClose
              className="cursor-pointer absolute top-4 right-4 hover:text-red-600 transition duration-300"
              // onClick={() => setIsOpen(false)}
              onClick={handleModalClose}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
