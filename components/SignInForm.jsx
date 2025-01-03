// Import necessary modules and hooks
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignInForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      router.replace("/u/home");
    }
  }, [router, session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("Sign-in Response:", res);

      if (res.error) {
        // setError(res.error); // Display error message to the user
        if (res.error.includes("unverified")) {
          router.push("/verify-account"); // Redirect if account is unverified
        }
        if (res.error.includes("blocked")) {
          toast.error("User is blocked.");
        }
        if (res.error.includes("Request failed with status code 401")) {
          toast.error("User doesnt exist.");
        }
        if (res.error.includes("Request failed with status code 500")) {
          toast.error("password incorrect.");
        }
      } else if (res.ok) {
        router.replace("/u/home"); // Redirect to home if sign-in is successful
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="py-16 bg-black">
      <div className="flex bg-black rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/564x/7c/e7/fc/7ce7fc52be83670df90e94bd90b66d21.jpg')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <div className="flex justify-center">
            <h1 className="scroll-m-20 text-4xl text-white font-extrabold tracking-tight lg:text-5xl">
              Ginger
            </h1>
          </div>
          <button
            onClick={() => signIn("google")}
            className="flex bg-purple-700 border-gray-700 border items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-600 w-full py-2"
          >
            <Image
              src="/Google_Icons-09-512.webp"
              height={24}
              width={24}
              alt="Google Icon"
            />
            <span className="ml-2">sign-up/sign-in using Google</span>
          </button>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">
              or login with email
            </a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="mt-8 bg-purple-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              Sign In
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link
              href="/forgotpassword"
              className="text-xs text-gray-500 uppercase"
            >
              Forgot password?
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
          <p className="text-center mt-2 text-gray-200">
            Dont have an account?{" "}
            <Link href="/register">
              <span className="cursor-pointer text-purple-500">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
