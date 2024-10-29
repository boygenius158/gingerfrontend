import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import instance from "@/axiosInstance";
import jwt from "jsonwebtoken";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const res = await instance.post("/api/user/custom-signin", {
            email,
            password,
          });
          console.log(res.data);

          if (res.data === "unverified") {
            throw new Error(
              "Your account is unverified. Please verify your email."
            );
          } else if (res.status === 200 && res.data) {
            return res.data; // return user data if verified
          } else {
            throw new Error("Invalid credentials.");
          }
        } catch (error) {
          console.error("Error in authorization:", error.message);
          throw new Error(error.message); // Re-throw to catch in signIn
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
          console.log(res.data);
          if (res.data.isBlocked) {
            return false;
          }

          if (res.status === 200) {
            const data = res.data;
            user._id = data._id;
            user.roles = data.roles;
            user.profilePicture = res.data.profilePicture;
            user.username = data.username;
            user.name = data.name || " ";

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
          console.log(res.data);

          if (res.status === 200) {
            const data = res.data.user;
            user._id = data._id;
            user.roles = data.roles;
            user.profilePicture = data.profilePicture;
            user.username = data.username;
            user.name = data.name || " ";

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

export { handler as GET, handler as POST };
