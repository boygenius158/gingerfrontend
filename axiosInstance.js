import axios from "axios";
import { getSession } from "next-auth/react";
import { handleSignOut } from "./app/utils/auth";
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Add this line
});


let isRefreshing = false;
let newAccessToken = null;

instance.interceptors.request.use(
  async (config) => {
    // Check if there is a new access token and use that instead of session.token
    if (newAccessToken) {
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    } else {
      const session = await getSession();

      if (session && session.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true;
      isRefreshing = true;

      const session = await getSession();

      if (session && session.refreshToken) {
        try {
          // Get the new access token using the refresh token
          const response = await instance.post("/refresh-token", {
            refreshToken: session.refreshToken,
          });

          console.log(response);

          const { accessToken } = response.data; // Adjust based on your API response format
          console.log("New Access Token:", accessToken);

          newAccessToken = accessToken; // Store the new access token globally

          isRefreshing = false;

          return instance(originalRequest);
        } catch (error) {
          toast("token has expired , please relogin");

          console.log(error);
          if (error.response && error.response.status === 403) {
            handleSignOut();
          }
          isRefreshing = false;
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
