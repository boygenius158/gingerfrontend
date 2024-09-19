import axios from "axios";
import { getSession } from "next-auth/react";

// Access the server URL from environment variables
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    // Get the session
    const session = await getSession();
    console.log("hi", session);

    // Check if session exists and has a token
    if (session && session.token) {
      console.log(session);

      // Attach the token to the request headers
      config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default instance;
