"use client";

import React, { useState, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import instance from "@/axiosInstance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname(); // Get the current path
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  console.log(pathname);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = searchParams.get("token");
    setError(""); // Reset any previous errors
    setLoading(true);

    if (!token) {
      setMessage("No token provided.");
      setLoading(false);
      return;
    }

    try {
      const response = await instance.post("/api/user/resetpassword", {
        token,
        password,
      });

      if (response.status === 200) {
        setMessage("Your password has been reset successfully.");
        router.push("/login");
      } else {
        setMessage(response.data.message || "Failed to reset your password.");
      }
    } catch (error) {
      setError("An error occurred while resetting your password.");
      console.error(error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Reset</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Reset Password"}
            </Button>
          </form>
          {message && <Alert className="mt-4">{message}</Alert>}
          {error && (
            <Alert className="mt-4" variant="destructive">
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
