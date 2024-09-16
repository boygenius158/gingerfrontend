import React, { useCallback, useEffect, useState } from "react";
import Post from "./Post";
import { useSession } from "next-auth/react";
import instance from "@/axiosInstance";
import InfiniteScroll from "react-infinite-scroll-component";
import Stories from "./Stories";
import { Spinner } from "@radix-ui/themes";

export default function Posts() {
  const { data: session, status } = useSession();

  const [feedPosts, setFeedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const limit = 2;


  const fetchPosts = useCallback(async (email) => {
    try {
      const response = await instance.post(`/api/user/fetchfeed`, {
        email: email,
        offset: offset,
        limit: limit,
      });

      console.log("response", response.data.feed);
      setFeedPosts(response.data.feed || []);
      setOffset((prevOffset) => prevOffset + limit); // Increment offset for pagination
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  }, [offset, limit]);
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchPosts(session.user.email);
    }
  }, [session?.user?.email,fetchPosts,status]);

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
        setOffset((prevState) => prevState + limit);
        setHasMore(response.data.feed.length > 0);
      }
    } catch (error) {
      console.error("Failed to fetch more posts", error);
    }
  };
  console.log(feedPosts);

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
        {" "}
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
            ) : (
              <div>No posts available.</div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
