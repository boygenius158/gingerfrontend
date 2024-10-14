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
  const [loading2, setLoading2] = useState(true);

  const [loading, setLoading] = useState(true); // New loading state
  const limit = 2;

  const fetchPosts = useCallback(
    async (email) => {
      try {
        setLoading(true); // Set loading to true when fetching
        const response = await instance.post(`/api/user/fetchfeed`, {
          email: email,
          offset: 0,
          limit: limit,
        });

        console.log("response", response.data.feed);
        setFeedPosts(response.data.feed || []);
        setOffset(limit);
        setHasMore(response.data.feed.length > 0);
        setLoading2(false)

      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
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
        setLoading2(false)
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
      <h1 className=" text-4xl text-white   tracking-tight lg:text-5xl flex justify-center items-center mt-4 ">
        Feed
      </h1>
      <div className="">
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
            {loading ? (
              <AiOutlineLoading3Quarters className="text-2xl text-black animate-spin" />
            ) : feedPosts.length > 0 ? (
              feedPosts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  isSaved={post.isSaved}
                  loading={loading2}
                />
              ))
            ) : (
              <div>No posts to see.</div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
