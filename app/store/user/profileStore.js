import { create } from "zustand";

const useProfileStore = create((set) => ({
  user: null,
  posts: [],
  savedPosts: [],
  feed: [], // Initial feed state

  setUser: (user) => set({ user }),
  setPosts: (posts) => set({ posts }),
  setSavedPosts: (savedPosts) => set({ savedPosts }),

  // Correctly update the feed state
  setFeed: (newFeed) =>
    set((state) => {
      console.log("Updating feed with:", newFeed); // Debug log
      return {
        feed: Array.isArray(newFeed)
          ? [...state.feed, ...newFeed]
          : [...state.feed, newFeed],
      };
    }),
}));

export default useProfileStore;
