import React, { useCallback, useEffect, useState } from "react";
import Post from "./Post";
import { useSession } from "next-auth/react";
import instance from "@/axiosInstance";
import InfiniteScroll from "react-infinite-scroll-component";
import Stories from "./Stories";
import { Spinner } from "@radix-ui/themes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PostUpload from "./post/PostUpload";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

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

        setFeedPosts(response.data.feed); // Update feedPosts
        setOffset(limit);
        setHasMore(response.data.feed.length > 0);
        setLoading2(false);
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

        setFeedPosts((prevPosts) => [
          ...prevPosts,
          ...(response.data.feed || []),
        ]);
        setOffset((prevOffset) => prevOffset + limit);
        setHasMore(response.data.feed.length > 0);
        setLoading2(false);
      }
    } catch (error) {
      console.error("Failed to fetch more posts", error);
    }
  };

  const appendNewPost = (newPost) => {
    console.log(newPost);

    setFeedPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  function reload() {
    fetchPosts(session?.user?.email);
  }

  if (status === "unauthenticated") {
    return <div>Please log in to view posts.</div>;
  }

  return (
    <div className="relative ">
      {/* <div 
      onClick={reload}
      className="text-white">
        hello world
      </div> */}
      <div className="">
        <div>
          <PostUpload onNewPost={appendNewPost} />
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={reload}
            className="bg-black hover:bg-purple-600 text-white mt-2"
          >
            <RefreshCcw size={24} />
          </Button>
        </div>
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
                  reload={reload}
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
