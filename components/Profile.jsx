import useProfileStore from "@/app/store/user/profileStore";
import { useSession } from "next-auth/react";
import Modal from "react-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import instance from "@/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiCamera } from "react-icons/hi";
import { Button } from "./ui/button";
import { useEdgeStore } from "@/app/lib/edgestore";
import Link from "next/link";
import PostSection from "./profile/PostSection";
import SavedPosts from "./profile/SavedPosts";
import { useSocket } from "@/app/lib/SocketContext";
import ConnectionsList from "./modals/ConnectionsList";
import toast from "react-hot-toast";

export default function Profile({ username }) {
  const { data: session, update } = useSession();
  const { user, posts } = useProfileStore((state) => ({
    user: state.user,
    posts: state.posts,
  }));
  const isAlreadyFollowing = user?.followers?.includes(session?.id);
  const socket = useSocket();
  const { edgestore } = useEdgeStore();
  const filePickerRef = useRef(null);
  const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [spin, setSpin] = useState(false);
  const [followersCount, setFollowerCount] = useState(
    user?.followers?.length || 0
  );
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
  });

  useEffect(() => {
    setIsFollowing(isAlreadyFollowing);
  }, [isAlreadyFollowing]);

  useEffect(() => {
    setFollowerCount(user?.followers?.length || 0);
  }, [user?.followers]);

  async function handleSubmit() {
    setSpin(true);
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
      setUploadedImageUrl(res.url);

      if (response) {
        console.log(response);
        useProfileStore.setState((state) => ({
          user: {
            ...state.user,
            profilePicture: res.url, // Update the profile picture in the store
          },
        }));
        await update({ profilePicture: res.url }); // Pass the updated username

        toast("Profile Picture Updated Successfully");
        setSpin(false);
        setSelectedFile(null);
        setImageFileUrl(null);
        setIsOpen(false);
        // session.user.image = response.data.url;
      }
    }
  }

  const isSameUser = session?.user?.email === user?.email;

  function handleModalClose() {
    setIsOpen(false);
    setImageFileUrl(null);
    setSelectedFile(null);
  }

  async function handleFollow() {
    if (!session) return;

    // Optimistic UI update
    setFollowerCount((prevCount) =>
      isFollowing ? prevCount - 1 : prevCount + 1
    );
    setIsFollowing(!isFollowing);

    try {
      const res = await instance.post("/api/user/followprofile", {
        followUser: user.email,
        orginalUser: session?.user?.email,
      });

      console.log(res);
      if (!isFollowing) {
        toast.success(`You started following ${user.username}`);
      }
    } catch (error) {
      console.error("Failed to follow/unfollow profile", error);
      // Revert UI update if the API call fails
      setFollowerCount((prevCount) =>
        isFollowing ? prevCount + 1 : prevCount - 1
      );
      setIsFollowing(!isFollowing);
    }
  }

  function addImageToPost(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  function onStatusChange(status) {
    setStatus(status);
  }

  if (!user || !user.email) {
    return <div></div>;
  }
  console.log(user.username === session.username);

  return (
    <div className=" sm:px-6 pt-6 ">
      <ConnectionsList
        status={status}
        onStatusChange={onStatusChange}
        followers={user.followerDetails}
        following={user.followingDetails}
      />

      <div className="flex flex-col lg:flex-row lg:space-x-24">
        <div className="rounded-full flex items-center justify-center  mb-6 lg:mb-0">
          <Image
            src={user.profilePicture}
            className="rounded-full p-1 w-[145px] h-[145px] object-cover border-2 border-purple-700 hover:scale-105 transform duration-300 cursor-pointer"
            width={145}
            height={145}
            alt=""
            // onClick={() => setIsOpen(true)}
            onClick={
              session.username === user.username
                ? () => setIsOpen(true)
                : undefined
            } // conditionally add onClick
          />
        </div>

        <div>
          <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-start lg:space-x-6">
            <span className="font-bold text-lg">@{user.username}</span>
            <span>
              {!isSameUser && (
                <button
                  className="border border-gray-700 b rounded py-1 px-2 mt-2 lg:mt-0 hover:bg-gray-200 hover:text-purple-800"
                  onClick={handleFollow}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </span>

            <div className="flex items-center justify-center mt-2 lg:mt-0"></div>
          </div>
          <div className="flex justify-between pt-3 text-center lg:text-left gap-4">
            <span className="text-sm font-semibold">{posts?.length || 0} posts</span>
            <span
              onClick={() => setStatus(true)}
              className="text-sm font-semibold hover:underline cursor-pointer "
            >
              {followersCount} {/* {user.followers.length} */}
              followers
            </span>
            <span
              onClick={() => setStatus(true)}
              className="text-sm font-semibold hover:underline cursor-pointer"
            >
              {user?.following?.length} following
            </span>
          </div>
          <div className="pt-6 grid">
            <span className="text-lg font-semibold ">{user.name}</span>
            <span>
              <br />
              {user.bio}
            </span>
          </div>
        </div>
      </div>
      <div className="pt-4"></div>
      <div className="border w-full mt-4 mb-4 border-purple-800"></div>

      <div className="mt-2">
        <Tabs defaultValue="posts" className="bg-black">
          <div className="flex items-center justify-center font-extrabold bg-black">
            <div className="flex items-center bg-black">
              <TabsList className="bg-black border border-purple-700">
                <TabsTrigger
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-200"
                  value="posts"
                >
                  Posts
                </TabsTrigger>
                {session?.username === user?.username && (
                  <TabsTrigger
                    className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-200"
                    value="saved-posts"
                  >
                    Saved Post
                  </TabsTrigger>
                )}
              </TabsList>
            </div>
          </div>

          <TabsContent value="saved-posts">
            <SavedPosts username={user?.username} />
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
          <div
            // onClick={() => filePickerRef.current.click()}
            className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col items-center "
          >
            <h2 className="text-xl font-semibold mb-2">Add New Profile</h2>
            <p className="text-sm text-muted-foreground mb-4">
              click on the camera icon to upload images
            </p>
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
                className="text-5xl text-gray-400 cursor-pointer hover:scale-125"
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
              className="w-full bg-black text-white p-2 shadow-md rounded-lg hover:bg-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100 mt-4"
            >
              {!spin && <p>upload new profile</p>}
              {spin && (
                <AiOutlineLoading3Quarters className="text-2xl text-white animate-spin" />
              )}
            </button>
            <AiOutlineClose
              className="cursor-pointer absolute top-4 right-4 hover:text-purple-600 transition duration-300"
              // onClick={() => setIsOpen(false)}
              onClick={handleModalClose}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
