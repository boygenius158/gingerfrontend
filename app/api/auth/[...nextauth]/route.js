import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import instance from "@/axiosInstance";

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
          const res = await instance.post("/api/user/custombackend", {
            email,
            password,
          });
          if (res.data === false) {
          }
          if (res.status === 200) {
            console.log("User data from custom backend:", res.data);
            return res.data; // Ensure this contains _id, roles, token, and username
          } else {
            console.log("Error in response:", res.statusText);
            return null;
          }
        } catch (error) {
          console.error("Error in authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("User object in signIn callback:", user);

      // Handle Google sign-in
      if (account.provider === "google") {
        try {
          const res = await instance.post("/api/user/google", {
            email: user.email,
          });
          console.log("Google user data:", res.data);

          if (res.status === 200) {
            const data = res.data;
            user._id = data._id;
            user.roles = data.roles; // Use correct field name here
            user.token = data.token;
            user.username = data.username;
            console.log(
              "Updated user object in signIn callback (Google):",
              user
            );

            return user;
          }
        } catch (error) {
          console.log("Error in Google sign-in:", error);
          return false;
        }
      }

      // Handle custom login (credentials)
      if (account.provider === "credentials") {
        try {
          const res = await instance.post("/api/user/custombackendSession", {
            email: user.email,
            password: user.password,
          });
          console.log(res.data);

          if (res.status === 200) {
            const data = res.data.user;
            user._id = data._id;
            user.roles = data.roles; // Use correct field name here
            user.token = data.token;
            user.username = data.username;
            console.log(
              "Updated user object in signIn callback (custom login):",
              user
            );

            return user;
          } else {
            console.log("Error in custom login response:", res.statusText);
            return false;
          }
        } catch (error) {
          console.log("Error in custom login authorization:", error);
          return false;
        }
      }

      // Allow sign-in if provider is neither Google nor credentials
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.roles = user.roles; // Correct field name
        token.token = user.token;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.role = token.roles; // Correct field name
      session.token = token.token;
      session.username = token.username;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
