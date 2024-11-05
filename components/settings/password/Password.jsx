import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Field, Form, ErrorMessage } from "formik";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Use LucideReact icons

// Custom validation function
const validate = (values, hasPassword) => {
  const errors = {};

  if (hasPassword) {
    if (!values.currentPassword) {
      errors.currentPassword = "Current password is required";
    } else if (values.currentPassword.length < 6) {
      errors.currentPassword = "Current password must be at least 6 characters";
    }
  }

  if (!values.newPassword) {
    errors.newPassword = "New password is required";
  } else if (values.newPassword.length < 6) {
    errors.newPassword = "New password must be at least 6 characters";
  }

  if (values.currentPassword === values.newPassword) {
    errors.newPassword =
      "There doesnt seem to be a change in the new password.";
  }

  return errors;
};

export default function Password() {
  const { data: session } = useSession();
  const [hasPassword, setHasPassword] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
  });

  const toggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const fetchPassword = useCallback(async () => {
    if (session) {
      const response = await instance.post("/api/user/has-password", {
        id: session?.id,
      });
      setHasPassword(response.data.hasPassword);
    }
  }, [session]);

  useEffect(() => {
    fetchPassword();
  }, [session, fetchPassword]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    
    try {
      // if(values.currentPassword === values.newPassword){
      //   toast.error('Password appears to be same.')
      //   return
      // }
      const response = await instance.post("/api/user/update-password", {
        ...values,
        id: session?.id,
      });
      if (response.data.success) {
        toast.success("Password changed successfully!");
      } else {
        toast.error("Your old password seems to be incorrect");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ api: error.response.data.message });
        toast.error(error.response.data.message || "An error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  console.log(showPassword);

  return (
    <div>
      <Card className="bg-black text-white border border-gray-700">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            {hasPassword
              ? "Change your password here."
              : "Set a new password here."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Formik
            initialValues={{ currentPassword: "", newPassword: "" }}
            validate={(values) => validate(values, hasPassword)} // Use custom validation function
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {hasPassword && (
                  <div className="space-y-1">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <div className="relative">
                      <Field
                        id="currentPassword"
                        name="currentPassword"
                        type={
                          showPassword.currentPassword ? "text" : "password"
                        }
                        as={Input}
                      />
                      <div
                        className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                        onClick={() => toggleShowPassword("currentPassword")}
                      >
                        {showPassword.currentPassword ? (
                          <EyeOffIcon className="w-5 h-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <ErrorMessage
                      name="currentPassword"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <Label htmlFor="newPassword">New password</Label>
                  <div className="relative">
                    <Field
                      className="text-black"
                      id="newPassword"
                      name="newPassword"
                      type={showPassword.newPassword ? "text" : "password"}
                      as={Input}
                    />
                    <div
                      className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                      onClick={() => toggleShowPassword("newPassword")}
                    >
                      {showPassword.newPassword ? (
                        <EyeOffIcon className="w-5 h-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="flex justify-between flex-col">
                  <CardFooter>
                    <div className="mt-2 ">
                      <Button
                        type="submit"
                        className="bg-purple-700"
                        disabled={isSubmitting}
                      >
                        Save password
                      </Button>
                    </div>
                  </CardFooter>
                  <CardFooter>
                    <div className="mt-2">
                      <Link
                        href="/forgotpassword"
                        className="text-purple-700 hover:underline"
                      >
                        Forgot password
                      </Link>
                    </div>
                  </CardFooter>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
