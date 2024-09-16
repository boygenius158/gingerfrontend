import { create } from "zustand";

const useUserStore = create((set) => ({
  email: localStorage.getItem("email") || "", // Initialize email from LocalStorage
  username: localStorage.getItem("username") || "",
  setEmail: (newEmail) => {
    localStorage.setItem("email", newEmail); // Store email in LocalStorage
    set({ email: newEmail }); // Update email with the new value
  },
  setUsername: (newUsername) => {
    localStorage.setItem("username", newUsername); // Store username in LocalStorage
    set({ username: newUsername }); // Update username with the new value
  },
}));

export default useUserStore;
