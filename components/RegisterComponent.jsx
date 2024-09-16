import useUserStore from "@/app/store/user/userStore";
import instance from "@/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function RegisterForm() {
    const router = useRouter();
    const setEmailInStore = useUserStore(state => state.setEmail);
    const setUsernameInStore = useUserStore(state => state.setUsername)
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Password must contain both letters and numbers')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
        setSubmitting(true);

        try {
            const response = await instance.post("/api/registeration", {
                email: values.email,
                password: values.password,
            });
            console.log(response.data.username,"000");
            setUsernameInStore(response.data.username)
            if (response.data.success === false) {
                setErrors({ email: response.data.message });
            } else {
                const otpResponse = await instance.post('/api/user/register/generateotp', {
                    email: values.email
                });
                setEmailInStore(values.email);
                setStatus({ success: "User has registered successfully" });
                router.push('/register/otp'); // Redirect to OTP verification page
            }
        } catch (error) {
            console.error("Error registering:", error);
            setErrors({ email: "Failed to register. Please try again." });
        }

        setSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">
                            Ginger
                        </h2>
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>
                        <div className="w-full flex-1 mt-8">
                            <Formik
                                initialValues={{ email: '', password: '', confirmPassword: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, status }) => (
                                    <Form className="mx-auto max-w-xs">
                                        <div>
                                            <Field
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Field
                                                name="password"
                                                type="password"
                                                placeholder="Password"
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Field
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="Confirm Password"
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                            />
                                            <ErrorMessage
                                                name="confirmPassword"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            disabled={isSubmitting}
                                        >
                                            <svg
                                                className="w-6 h-6 -ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-3">Register</span>
                                        </button>
                                        {status && status.success && (
                                            <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                                {status.success}
                                            </div>
                                        )}
                                        <p className="mt-6 text-xs text-gray-600 text-center">
                                            I agree to abide by Ginger <span> </span>
                                            <a
                                                href="#"
                                                className="border-b border-gray-500 border-dotted"
                                            >
                                                Terms of Service
                                            </a>{" "}
                                            and its{" "}
                                            <a
                                                href="#"
                                                className="border-b border-gray-500 border-dotted"
                                            >
                                                Privacy Policy
                                            </a>
                                        </p>
                                        <p className="text-center mt-2">
                                            Already have an account?{" "}
                                            <Link href="/">
                                                <span className="cursor-pointer text-blue-500">Login</span>
                                            </Link>
                                        </p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
