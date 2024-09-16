"use client";

import instance from "@/axiosInstance";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post(
        "/api/user/forgetpassword",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      
      if (res.status === 200) {
        setSuccessMessage("Password reset link has been sent to your email.");
        setErrorMessage("");
      } else {
        setErrorMessage(
          res.data.message || "An error occurred. Please try again."
        );
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSuccessMessage("");
    }
  };
  
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <form
          className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          {successMessage && (
            <p className="text-sm text-green-500">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          
          <button
            type="submit"
            // onClick={handleSubmit2}
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
