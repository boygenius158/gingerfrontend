"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as yup from "yup"; // Import yup for validation

export const description = "";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [tab, setTab] = useState("create-password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Password error
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setOtpGenerated] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setResendAvailable(true);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const startResendTimer = () => {
    setTimeLeft(60); // Set the timer for 60 seconds
    setResendAvailable(false);
  };

  // Password validation schema using Yup
  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const validatePassword = async () => {
    try {
      await passwordSchema.validate({ password });
      setPasswordError(""); // Clear any errors if validation passes
      return true;
    } catch (error) {
      setPasswordError(error.message); // Set error message
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const isValid = await validatePassword(); // Validate password
    if (isValid) {
      userRegistration();
    }
  };

  const showToast = () => {
    toast.error("User Already Exists!");
  };

  const userRegistration = async () => {
    const response = await instance.post("/api/registration", {
      email,
      password,
    });
    console.log(response);
    if (response.data.isVerified === false) {
      setTab("otp-registration");
      startResendTimer();
    } else {
      showToast();
    }
  };

  async function handleOtp() {
    toast.success("Otp generated");

    await instance.post("/api/user/register/generateotp", {
      email,
    });
    setOtpGenerated(true);
    startResendTimer();
  }

  async function verifyOtp() {
    const response = await instance.post("/api/user/register/verifyotp", {
      otp,
      email,
    });

    if (response.data.success === true) {
      toast.success("Successfully registered");
      router.push("/login");
    } else {
      toast.error("Failed to register your account.");
    }
  }

  if (session) {
    return (
      <div className="flex items-center justify-center">
        <h1>You are registered and verified already</h1>
      </div>
    );
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] bg-white">
      <Toaster />
      <div className="flex items-center justify-center py-12">
        {tab === "create-password" && (
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="text-muted-foreground">
                Enter your details below to create your account
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </form>
          </div>
        )}

        {tab === "otp-registration" && (
          <div className="">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                {/* {!resendAvailable && ( */}
                  <>
                    <h1 className="text-3xl font-bold">Verify OTP</h1>
                    <p className="text-muted-foreground">
                      Enter the OTP sent to your email
                    </p>
                  </>
                {/* )} */}
              </div>
              <div className="flex-col items-center justify-center">
                <div className="flex items-center justify-center ">
                  <InputOTP maxLength={6} onChange={setOtp}>
                    <div className="grid gap-4">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </div>
                  </InputOTP>
                </div>
                <div className="flex-col items-center justify-center">
                  {!isOtpGenerated && (
                    <Button
                      onClick={handleOtp}
                      className="w-full cursor-pointer mt-4 "
                    >
                      Generate OTP
                    </Button>
                  )}
                  {isOtpGenerated && (
                    <>
                      {!resendAvailable && (
                        <Button
                          onClick={() => verifyOtp()}
                          className="w-full cursor-pointer mt-4"
                        >
                          Verify OTP
                        </Button>
                      )}

                      <div className="mt-4">
                        <p>
                          {resendAvailable
                            ? "You can resend OTP now"
                            : `Resend OTP in ${timeLeft}s`}
                        </p>
                        {resendAvailable && (
                          <Button
                            onClick={handleOtp}
                            className="w-full cursor-pointer mt-2"
                          >
                            Resend OTP
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="hidden bg-muted lg:block">
        <Image
          src="https://i.pinimg.com/564x/50/ed/f3/50edf310a3e746ec7b432818d60848d1.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
 