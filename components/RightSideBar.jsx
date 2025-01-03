import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import instance from "@/axiosInstance";
import { Skeleton } from "./ui/skeleton";
import useProfileStore from "@/app/store/user/profileStore";

export default function RightSideBar() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const userdata = useProfileStore((state) => state.user);
  console.log(userdata);
  console.log(session);

  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchProfileDetailsForMiniProfile = async () => {
  //     if (session) {
  //       try {
  //         const response = await instance.post("/api/user/miniProfile", {
  //           id: session.id,
  //         });
  //         console.log(response);

  //         if (isMounted) {
  //           setUser(response.data.user);
  //           setLoading(false);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching profile details:", error);
  //         if (isMounted) setLoading(false); // Stop loading in case of error
  //       }
  //     }
  //   };

  //   fetchProfileDetailsForMiniProfile();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [session]);
  return (
    <div className="max-w-sm mx-auto text-white border border-gray-700 rounded-lg overflow-hidden shadow-lg mt-4 mr-4 ">
      {/* Banner */}
      <div className="relative h-32 bg-gray-200">
        <Image
          src="https://i.pinimg.com/564x/60/bc/09/60bc090630a52bf823350c0d8a16cb77.jpg"
          alt="Profile banner"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Profile Details */}
      <div className="relative px-4 pt-12 pb-4">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24">
          {/* {loading ? (
            <Skeleton className="rounded-full w-full h-full" />
          ) : ( */}
            <Image
              src={session?.profilePicture || "/default-profile.jpg"}
              alt="Profile picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full border-4 border-purple-800"
            />
          {/* )} */}
        </div>

        <div className="text-center mt-4">
          {/* {loading ? (
            <>
              <Skeleton className="mt-2 mb-1 bg-black w-2/3 h-6" />
              <Skeleton className="bg-black w-1/2 h-4" />
            </>
          ) : ( */}
            <>
              <h2 className="text-xl font-semibold first-letter:uppercase">
                {session?.user?.name || ""}
              </h2>
              <Link href={`u/${session?.username}`}>
                <p className="text-gray-600">
                  @{session?.username || "unknown"}
                </p>
              </Link>
            </>
          {/* )} */}
        </div>

        
        {session && (
          <Link href={`/u/${session?.username}`}>
            <Button
              className="w-full mt-6 bg-purple-600 hover:text-purple-700 hover:bg-white border border-gray-800"
              variant="default"
            >
              My Profile
            </Button>
          </Link>
        )}

        {/* Sign Out Button */}
        {session && (
          <div>
            <Button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full mt-2 bg-purple-600 hover:text-purple-700 hover:bg-white border border-gray-800"
              variant="default"
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
