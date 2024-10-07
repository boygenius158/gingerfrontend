import React, { useCallback, useEffect, useState } from "react";
import Post from "./Post";
import { useSession } from "next-auth/react";
import instance from "@/axiosInstance";
import InfiniteScroll from "react-infinite-scroll-component";
import Stories from "./Stories";
import { Spinner } from "@radix-ui/themes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Posts() {
  const { data: session, status } = useSession();

  const [feedPosts, setFeedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 2;

  const fetchPosts = useCallback(
    async (email) => {
      try {
        const response = await instance.post(`/api/user/fetchfeed`, {
          email: email,
          offset: 0, // Always start from 0 for the initial fetch
          limit: limit,
        });

        console.log("response", response.data.feed);
        setFeedPosts(response.data.feed || []);
        setOffset(limit); // Set offset after initial fetch
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    },
    [limit]
  );

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchPosts(session.user.email);
    }
  }, [session?.user?.email, status, fetchPosts]);

  const fetchMorePosts = async () => {
    try {
      if (status === "authenticated" && session?.user?.email) {
        const response = await instance.post("/api/user/fetchfeed", {
          email: session.user.email,
          offset: offset,
          limit,
        });

        console.log("response", response.data.feed);
        setFeedPosts((prevPosts) => [
          ...prevPosts,
          ...(response.data.feed || []),
        ]);
        setOffset((prevOffset) => prevOffset + limit);
        setHasMore(response.data.feed.length > 0);
      }
    } catch (error) {
      console.error("Failed to fetch more posts", error);
    }
  };

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <div>Please log in to view posts.</div>;
  }

  return (
    <div className="relative ">
      <h1 className=" text-4xl font-extrabold  tracking-tight lg:text-5xl flex justify-center items-center mt-4 ">
        Feed
      </h1>
      <div className="">
        {/* Add padding to prevent content from being hidden behind the fixed heading */}
        <Stories />
        <InfiniteScroll
          dataLength={feedPosts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={
            <div>
              <Spinner loading={true} />
            </div>
          }
        >
          <div className="container">
            {feedPosts.length > 0 ? (
              feedPosts.map((post) => (
                <Post key={post._id} post={post} isSaved={post.isSaved} />
              ))
            ) : feedPosts.length === 0 ? (
              <div>No posts to see. </div>
            ) : (
              <div>
                {" "}
                <AiOutlineLoading3Quarters className="text-2xl text-black animate-spin" />
              </div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
