"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import instance from "@/axiosInstance";
import { ToastBar } from "react-hot-toast";

export default function GenerateOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP input
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setOtpSent] = useState(false); // State to track if OTP was sent
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(30); // Timer for resending OTP
  const [isOtpExpired, setOtpExpired] = useState(false); // State to track if OTP is expired
  const router = useRouter();

  useEffect(() => {
    if (resendTimer > 0 && isOtpSent) {
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setOtpExpired(true); // Set OTP as expired
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer, isOtpSent]);

  async function handleOtp() {
    console.log("hi");

    const response = await instance.post("/api/user/register/generateotp", {
      email,
    });
    console.log(response);
    if (response.data.success === false) {
      toast.error("Email doesnt exist, please register this email.");
      return;
    }

    setOtpSent(true);
    startResendTimer();
    toast.success("OTP generated and sent to your email.");
  }

  async function verifyOtp() {
    setIsLoading(true);
    setMessage("");

    const response = await instance.post("/api/user/register/verifyotp", {
      otp,
      email,
    });

    setIsLoading(false);
    if (response.data.success) {
      toast.success("Successfully registered");
      router.push("/login");
    } else {
      toast.error("Failed to verify OTP. Please try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    await handleOtp();

    setIsLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    await verifyOtp();
  };

  const startResendTimer = () => {
    setResendTimer(60);
    setOtpExpired(false); // Reset OTP expiration state
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Your account needs to be verified
          </CardTitle>
          <CardDescription className="text-center">
            We will send a one-time password to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isOtpSent ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Generate OTP"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                {!isOtpExpired && (
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </Button>
                )}
                <p className="text-sm text-center">
                  Resend OTP {" "}
                  {resendTimer > 0 ? (
                    `${resendTimer}s`
                  ) : (
                    <span onClick={handleOtp}>
                      <Button variant="outline">Resend OTP</Button>
                    </span>
                  )}
                </p>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter>
          {message && (
            <p className="text-sm text-green-600 text-center w-full">
              {message}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
