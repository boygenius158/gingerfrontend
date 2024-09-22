"use client";

import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import debounce from "lodash/debounce";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function SearchUser({ handleClose }) {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const router = useRouter(); // Initialize useRouter

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    const response = await instance.get("/api/user/searchUser", {
      params: {
        searchQuery: searchTerm,
      },
    });
    if (response) {
      console.log(response.data.users);
      setUserProfiles(response.data.users);
    }
  };

  async function displayProfileInformationHere(search) {
    console.log(search);

    const response = await instance.post(
      "/api/user/save-user-to-search-history",
      {
        userId: session?.id,
        key: search,
      }
    );

    if (response) {
      setRecentSearches((prev) => [
        ...prev,
        {
          searchedProfileId: {
            name: search.name,
            username: search.username,
            profilePicture: search.profilePicture,
          },
        },
      ]);
    }

    // Use router to navigate to the user's profile
    router.push(`/u/${search.username}`);
  }

  const fetchSearches = useCallback(async () => {
    const response = await instance.post("/api/user/get-recent-searches", {
      userId: session?.id,
    });
    console.log(response);

    setRecentSearches(response.data.searches);
  }, [session?.id]);

  useEffect(() => {
    fetchSearches();
  }, [fetchSearches]);

  console.log(recentSearches);

  return (
    <div className="">
      <div className="bg-white border rounded-lg w-[423px] h-[700px] relative">
        <button
          onClick={handleClose}
          className="absolute text-2xl top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <div className="flex top-0 left-0 mb-4">
          <h1 className="p-4 text-2xl font-extrabold tracking-tight lg:text-2xl flex justify-center items-center">
            Search
          </h1>
        </div>
        <div className="mx-2">
          <form action="" onSubmit={onSearchSubmit}>
            <Input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded mb-4"
            />
            <button onSubmit={onSearchSubmit}>Search</button>
          </form>
        </div>

        <div className="border-t-2"></div>

        {searchTerm.length > 0 && userProfiles.length > 0 ? (
          <div>
            <div className="flex justify-between">
              <h1 className="p-4 text-sm font-extrabold tracking-tight cursor-pointer">
                Recent
              </h1>
            </div>
            <ul className="list-disc list-inside cursor-pointer max-h-[500px] overflow-y-scroll">
              {userProfiles.map((search, index) => (
                <div
                  key={index}
                  onClick={() => displayProfileInformationHere(search)}
                  className="flex cursor-pointer"
                >
                  <div className="p-2">
                    <Image
                      src={search.profilePicture}
                      alt="failed"
                      height={55}
                      width={55}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-bold">{search.username}</div>
                    <div className="font-extralight text-gray-500 first-letter:uppercase">
                      {search.name}
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <div className="flex justify-between">
              <h1 className="p-4 text-sm font-extrabold tracking-tight cursor-pointer">
                Recent
              </h1>
            </div>
            <ul className="list-disc list-inside cursor-pointer max-h-[500px] overflow-y-scroll">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  onClick={() =>
                    displayProfileInformationHere(search?.searchedProfileId)
                  }
                  className="flex cursor-pointer"
                >
                  <div className="p-2">
                    <Image
                      src={search?.searchedProfileId?.profilePicture}
                      alt="failed"
                      height={55}
                      width={55}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-bold">
                      {search?.searchedProfileId?.username}
                    </div>
                    <div className="font-extralight text-gray-500 first-letter:uppercase">
                      {search?.searchedProfileId?.name}
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
