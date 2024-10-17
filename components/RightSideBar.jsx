import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import instance from "@/axiosInstance";
import { SlUserFollowing } from "react-icons/sl";
import { Skeleton } from "./ui/skeleton";

export default function RightSideBar() {
  const { data: session, status } = useSession();
  console.log(session);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfileDetailsForMiniProfile = async () => {
      if (session) {
        try {
          console.log("hi");

          const response = await instance.post("/api/user/miniProfile", {
            id: session.id,
          });
          console.log(response.data.user.roles);
          // setRole(response.data.user.roles);
          if (isMounted) {
            setUser(response.data.user);
            setLoading(false); // Set loading to false after data is fetched
          }
        } catch (error) {
          console.error("Error fetching profile details:", error);
        }
      }
    };

    fetchProfileDetailsForMiniProfile();

    return () => {
      isMounted = false;
    };
  }, [session]);

  console.log(user);

  return (
    <>
      <div className="max-w-sm mx-auto text-white border border-gray-700 rounded-lg overflow-hidden shadow-lg mt-4 mr-4 h-screen">
        <div className="relative h-32 bg-gray-200">
          <Image
            src="https://i.pinimg.com/564x/60/bc/09/60bc090630a52bf823350c0d8a16cb77.jpg"
            alt="Profile banner"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative px-4 pt-12 pb-4">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24">
            {loading ? (
              <Skeleton className="rounded-full w-full h-full " />
            ) : (
              <Image
                src={user?.profilePicture}
                alt="Profile picture"
                layout="fill" // Use layout fill for absolute positioning
                objectFit="cover" // Ensure the image covers the area
                className="rounded-full border-4 border-purple-800"
              />
            )}
          </div>

          <div className="text-center">
            {loading ? (
              <>
                <Skeleton className="mt-2 mb-1 bg-black w-2/3 h-6" />{" "}
                {/* Skeleton for name */}
                <Skeleton className="bg-black w-1/2 h-4" />{" "}
                {/* Skeleton for username */}
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold first-letter:uppercase">
                  {user?.name}
                </h2>

                <Link href={`u/${user?.username}`}>
                  <p className="text-gray-600">@{user?.username}</p>
                </Link>
              </>
            )}
          </div>

          <div className="flex justify-between mt-4 text-center">
            <div>
              <p className="font-bold">{user?.postCount || 0}</p>
              <p className="text-white-600 text-sm">Posts</p>
            </div>
            <div>
              <p className="font-bold">{user?.followers?.length || 0}</p>
              <p className="text-white-600 text-sm">Followers</p>
            </div>
            <div>
              <p className="font-bold">{user?.following?.length || 0}</p>
              <p className="text-white-600 text-sm">Following</p>
            </div>
          </div>
          {session && (
            <Link href={`/u/${user?.username}`}>
              <Button
                className="w-full mt-6 bg-purple-600 hover:text-purple-700 hover:bg-white border border-gray-800"
                variant="default"
              >
                My Profile
              </Button>
            </Link>
          )}

          {session && (
            <div>
              <Button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full mt-2 bg-purple-600 hover:text-purple-700 hover:bg-white border border-gray-800"
                variant="default"
              >
                Signout
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* <div className="bg-black h-[180px] mt-4 rounded mr-4 border border-gray-700">
        <div className="">
          <p className="text-white mt-2 ml-2">Suggestions for you.</p>
        </div>
        <div className="mt-4 text-white flex flex-col">
          <div className="flex gap-8 justify-center ">
            <div className="">
              <Image
                src={user?.profilePicture}
                alt="Profile picture"
                width={50}
                height={50}
                className="rounded-full border-4 border-purple-700"
              />
            </div>
            <div className="items-center">
              <p>Albin</p>
              <p>@albindamn</p>
            </div>
            <div className="">
              <Button className="bg-purple-800 hover:bg-white hover:text-purple-700">
                Follow
              </Button>
            </div>
          </div>
          <div className="flex mt-2 gap-8 justify-center ">
            <div className="">
              <Image
                src={user?.profilePicture}
                alt="Profile picture"
                width={50}
                height={50}
                className="rounded-full border-4 border-purple-700"
              />
            </div>
            <div className="">
              <p>Sam</p>
              <p>@samantha</p>
            </div>
            <div className="">
              <Button className="bg-purple-800 hover:bg-white hover:text-purple-700">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
