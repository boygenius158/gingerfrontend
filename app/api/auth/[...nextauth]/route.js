import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import instance from "@/axiosInstance";
import jwt from "jsonwebtoken"; // or any other library you prefer for token generation

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
          if (res.data === false) {
          }
          if (res.status === 200) {
            console.log("User data from custom backend:", res.data);
            return res.data;
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("User object in signIn callback:", user);

      // Handle Google sign-in
      if (account.provider === "google") {
        try {
          const res = await instance.post("/api/user/google-auth", {
            email: user.email,
          });
          console.log("Google user data:", res.data);

          if (res.status === 200) {
            const data = res.data;
            user._id = data._id;
            user.roles = data.roles; // Use correct field name here
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
          const res = await instance.post("/api/user/custom-registration", {
            email: user.email,
            password: user.password,
          });
          console.log(res.data);

          if (res.status === 200) {
            const data = res.data.user;
            user._id = data._id;
            user.roles = data.roles; // Use correct field name here
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

      return true;
    },
    async jwt({ token, user }) {
      // console.log(token);

      if (user) {
        const customToken = jwt.sign(
          {
            id: user._id,
            roles: user.roles,
            username: user.username,
          },
          process.env.NEXTAUTH_SECRET
        );
        token.customToken = customToken;
        token.id = user._id;
        token.roles = user.roles;
        token.token = user.token;
        token.username = user.username;
      }
      // console.log(token);

      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.role = token.roles;
      session.token = token.customToken;
      session.username = token.username;

      // console.log(session);

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
