import { create } from "zustand";

const useComponentsStore = create((set) => ({
  isVedioCallActive: false,
  startVideoCall: () => set({ isVedioCallActive: true }),
  endVideoCall: () => set({ isVedioCallActive: false }),
}));

export default useComponentsStore