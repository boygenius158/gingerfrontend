"use client";
import React, { useEffect, useRef } from "react";
import instance from "@/axiosInstance";
import useProfileStore from "@/app/store/user/profileStore";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import MiniProfile from "@/components/MiniProfile";
import SessionHandler from "@/components/SessionHandler";
import RightSideBar from "@/components/RightSideBar";

export default function Page({ params }) {

  const { user, setUser, posts, setPosts, addPost, savedPosts, setSavedPosts } = useProfileStore(
    (state) => ({
      user: state.user,
      posts: state.posts,
      savedPosts: state.savedPosts,
      setUser: state.setUser,
      setPosts: state.setPosts,
      addPost: state.addPost,
      setSavedPosts: state.setSavedPosts,
    })
  );

  const { id } = params;
  const hasFetchedProfile = useRef(false);
  const hasFetchedSavedPosts = useRef(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const username = id;
      if (username && !hasFetchedProfile.current) {
        try {
          hasFetchedProfile.current = true;
          const res = await instance.post("/api/user/fetchprofile", {
            username,
          }); 
          console.log(res);
          
          console.log("Fetched user email:", res.data.user.following);
          setUser(res.data.user); // Store the user data in Zustand
          setPosts(res.data.post); // Store posts data in Zustand
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [id, setUser, setPosts]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const username = id;
      if (username && !hasFetchedSavedPosts.current) {
        try {
          hasFetchedSavedPosts.current = true;
          const res = await instance.post("/api/user/fetch-saved-posts", {
            username,
          });
          console.log("Fetched saved posts:", res.data.savedPosts);
          setSavedPosts(res.data.savedPosts); // Store saved posts in Zustand
        } catch (error) {
          console.error("Error fetching saved posts:", error);
        }
      }
    };

    fetchSavedPosts();
  }, [id, setSavedPosts]);

  return (
      <div className="bg-black text-white">
      <main className="grid md:grid-cols-4 mx-auto z-30 min-h-screen">
        <section className="hidden md:inline-grid md:col-span-1">
          <div className="fixed w-[280px]">
            <MiniProfile />
          </div>
        </section>
        <section className="md:col-span-3 ">
        <Profile />
        </section>
        {/* <section className="hidden md:inline-grid md:col-span-1">
          <div className="fixed w-[380px]">
            <RightSideBar />
          </div>
        </section> */}
      </main>
    </div>
  );
}
