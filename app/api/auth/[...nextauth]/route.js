import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import instance from "@/axiosInstance";
import jwt from "jsonwebtoken";

export const authOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Custom Credentials Provider
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Request to custom sign-in API
          const res = await instance.post("/api/user/custom-signin", {
            email,
            password,
          });

          if (res.status === 200 && res.data) {
            console.log("User data from custom backend:", res.data);
            return res.data; // Return user data from backend
          } else {
            console.log("Error in response:", res.statusText);
            return null; // Return null if login fails
          }
        } catch (error) {
          console.error("Error in authorization:", error);
          return null; // Return null on any error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google sign-in
      if (account.provider === "google") {
        try {
          const res = await instance.post("/api/user/google-auth", {
            email: user.email,
          });
          console.log(res.data.profilePicture);

          if (res.status === 200) {
            const data = res.data;
            user._id = data._id;
            user.roles = data.roles;
            user.profilePicture = res.data.profilePicture;
            user.username = data.username;
            user.name = data.name || " "


            console.log("Updated user object for Google sign-in:", user);
            return user;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error during Google sign-in:", error);
          return false;
        }
      }

      // Handle custom credentials sign-in
      if (account.provider === "credentials") {
        try {
          const res = await instance.post("/api/user/custom-registration", {
            email: user.email,
            password: user.password,
          });

          if (res.status === 200) {
            const data = res.data.user;
            user._id = data._id;
            user.roles = data.roles;
            user.profilePicture = data.profilePicture;
            user.username = data.username;
            user.name = data.name || " "

            console.log("Updated user object for custom login:", user);
            return user;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error in custom login:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, session, trigger }) {
      if (user) {
        const customToken = jwt.sign(
          { id: user._id, roles: user.roles, username: user.username },
          process.env.NEXTAUTH_SECRET
        );

        const refreshToken = jwt.sign(
          { id: user._id },
          process.env.NEXTAUTH_SECRET,
          { expiresIn: "14d" }
        );

        token.customToken = customToken;
        token.refreshToken = refreshToken;
        token.id = user._id;
        token.roles = user.roles;
        token.profilePicture = user.profilePicture;
        token.username = user.username;
      }
      if (trigger === "update") {
        // Validate session properties individually
        if (session) {
          if (session.username) {
            token.username = session.username;
          } else {
            console.log("Session is missing username.");
          }

          if (session._id) {
            token.id = session._id;
          } else {
            console.log("Session is missing _id.");
          }

          if (session.role) {
            token.roles = session.role;
          } else {
            console.log("Session is missing roles.");
          }
          if (session.name) {
            token.name = session.name;
          } else {
            console.log("Session is missing roles.");
          }

          if (session.profilePicture) {
            token.profilePicture = session.profilePicture;
          } else {
            console.log("Session is missing profilePicture.");
          }
        } else {
          console.log("Session object is null or undefined.");
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.role = token.roles;
      session.name = token.name;
      session.token = token.customToken;
      session.username = token.username;
      session.profilePicture = token.profilePicture;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Export handler for GET and POST requests
export { handler as GET, handler as POST };
