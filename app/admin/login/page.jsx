"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LockIcon } from "lucide-react";
import instance from "@/axiosInstance";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (status === "loading") return; // Wait for loading

    // Redirect based on the user role
    if (session) {
      if (session.role === "user") {
        // Redirect users to their dashboard if they are a normal user
        router.push("/u/home");
      } else if (session.role === "admin") {
        // Admins can access the admin pages
        return; // Do nothing; let the page render
      }
    }
  }, [session, status, router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    // For this example, we'll just show an error if the fields are empty
    if (!email || !password) {
      setError("Please fill in all fields");
    } else {
      try {
        console.log("working");
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        console.log("Response", res);

        if (res.error === "CredentialsSignin") {
          toast.error("Unable to Login");
        }
        if (res.error === "AccessDenied") {
          toast.error("AccessDenied");
        }
        if (res.ok) {
          toast.success("Welcome");

          router.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };

  if (session?.role === "admin") {
    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full mt-4">
              <LockIcon className="mr-2 h-4 w-4" /> Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-gray-600">
            Protected area. Authorized personnel only.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
