import useProfileStore from "@/app/store/user/profileStore";
import instance from "@/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function SavedPosts() {
  const { user, savedPosts } = useProfileStore((state) => ({
    user: state.user,
    savedPosts: state.savedPosts,
  }));

  useEffect(() => {
    // You can perform any additional logic or API calls here if needed
  }, []);

  return (
    <div>
      
      <div className="pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {savedPosts.map((post) => (
          <div key={post._id} className="flex justify-center items-center">
            <Link href={`/post/${post._id}`}>
              <Image
                key={post._id}
                src={post.imageUrl[0]}
                alt="Post image"
                height={300}
                width={300}
                className="object-cover border"
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="pb-24"></div>
    </div>
    </div>
  );
}
