"use client";

import React, { useState, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import instance from "@/axiosInstance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast"; // Import toast
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Validate password
    validatePassword(value);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*]/;

    if (password.length < minLength) {
      setPasswordValidation("Password must be at least 8 characters long.");
    } else if (!hasNumber.test(password)) {
      setPasswordValidation("Password must contain at least one number.");
    } else if (!hasSpecialChar.test(password)) {
      setPasswordValidation("Password must contain at least one special character.");
    } else {
      setPasswordValidation(""); // Clear validation message if all conditions are met
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = searchParams.get("token");
    setLoading(true);

    if (!token) {
      toast.error("No token provided.");
      setLoading(false);
      return;
    }

    if (passwordValidation) {
      toast.error("Please correct the password errors before submitting.");
      setLoading(false);
      return;
    }

    try {
      const response = await instance.post("/api/user/resetpassword", {
        token,
        password,
      });

      if (response.status === 200) {
        toast.success("Your password has been reset successfully.");
        router.push("/login");
      } else {
        toast.error(response.data.message || "Failed to reset your password.");
      }
    } catch (error) {
      toast.error("An error occurred while resetting your password.");
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
            <div className="relative mb-4">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordValidation && (
              <div className="mb-4 text-red-500">{passwordValidation}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading || passwordValidation}>
              {loading ? "Processing..." : "Reset Password"}
            </Button>
          </form>
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
