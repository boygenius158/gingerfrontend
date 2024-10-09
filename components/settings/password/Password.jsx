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
import axios from "axios";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

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

  return errors;
};

export default function Password() {
  const { data: session } = useSession();
  const [hasPassword, setHasPassword] = useState(false);

  // Fetch if the user has a password set
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
      const response = await instance.post("/api/user/update-password", {
        ...values,
        id: session?.id,
      });
      if (response.data.success) {
        toast.success("Password changed successfully!");
      } else {
        toast.error("Password could not be changed");
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

  return (
    <div>
      <Card>
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
                    <Field
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      as={Input}
                    />
                    <ErrorMessage
                      name="currentPassword"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <Label htmlFor="newPassword">New password</Label>
                  <Field
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    as={Input}
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <CardFooter>
                  <div className="mt-2">
                    <Button type="submit" disabled={isSubmitting}>
                      Save password
                    </Button>
                  </div>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
