import React, { useCallback, useEffect, useState } from "react";
import Story from "./Story";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import useStoryStore from "@/app/store/user/storyStore";

export default function Stories() {
  const { data: session, status } = useSession();
  const { stories, setStories } = useStoryStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStories = useCallback(async () => {
    if (session?.id) {
      try {
        setLoading(true);
        const response = await instance.post("/api/user/fetchStories", {
          userId: session.id,
        });
        setStories(response.data.stories);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setError("Failed to fetch stories");
      } finally {
        setLoading(false);
      }
    }
  }, [session?.id, setStories]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white z-10 mb-4 space-x-4 flex items-center p-6 w-screen lg:w-1/2 overflow-x-scroll hide-scrollbar">
      {stories.length > 0 ? (
        stories.map((story, index) => <Story key={index} story={story} />)
      ) : (
        <div>No stories available</div>
      )}
    </div>
  );
}
