const { create } = require("zustand");
const feedStore = create((set) => ({
  feedPosts: [],
  setFeedPosts: (newFeedPosts) => set({ feedPosts: newFeedPosts }),
}));

export default feedStore

