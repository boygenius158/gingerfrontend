import { signOut } from "next-auth/react"; // Import signOut from NextAuth

export const handleSignOut = (router) => {
  // Call NextAuth signOut
  signOut({ callbackUrl: '/login' }) // Redirect to login page after signing out
    .then(() => {
      console.log("Signed out successfully");
      // Optionally, you can do more actions here after signing out
    })
    .catch((error) => {
      console.error("Sign out error:", error);
    });
};
