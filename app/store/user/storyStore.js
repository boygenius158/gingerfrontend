import { create } from 'zustand';

const useStoryStore = create((set)=>({
    stories:[],
    setStories:(stories)=>set({stories})
}))

export default useStoryStore