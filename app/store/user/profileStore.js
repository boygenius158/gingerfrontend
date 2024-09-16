import { create } from "zustand";


const useProfileStore = create((set) => ({
  user: null, 
  posts: [], 
  savedPosts: [],

  setUser: (user) => set({ user }), 
  setPosts: (posts) => set({ posts }),
  setSavedPosts: (savedPosts) => set({ savedPosts }), 

  addPost: (post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),

  updatePost: (postId, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId ? { ...post, ...updatedPost } : post
      ),
    })),

  removePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postId),
    })),
}));

export default useProfileStore;
