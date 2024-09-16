import instance from "@/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "react-modal";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  const [searchKey, setSearchKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const onSearchSubmit = async (e) => {
    e.preventDefault();
    console.log("on search submit", searchKey);
    const response = await instance.get("/api/user/searchUser", {
      params: {
        searchQuery: searchKey,
      },
    });
    if (response) {
      // console.log(response.data.users);
      setSearchData(response.data.users);
      setIsOpen(true);
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      borderRadius: "0.375rem", // Tailwind `rounded-md`
      padding: "1.25rem", // Tailwind `p-5`
      width: "90%",
      maxWidth: "30rem", // Tailwind `max-w-md`
      boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)", // Tailwind shadow
      backgroundColor: "#ffffff", // White background
    },
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Search Results"
      >
        <div className="flex flex-col p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {searchData.length > 0 ? (
            <ul className="space-y-4">
              {searchData.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center space-x-3 border-b pb-3"
                >
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={`/u/${user.username}`}
                  >
                    <div className="flex items-center space-x-3 cursor-pointer">
                      <Image
                        height={40}
                        width={40}
                        src={user.profilePicture}
                        alt="userimage"
                        className="rounded-full object-cover border border-gray-200"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-md font-medium">{user.username}</h3>
                        <p className="text-sm text-gray-600">{user.name}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 mt-4">No results found.</p>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </Modal>
      <form
        onSubmit={onSearchSubmit}
        className="flex justify-center items-center space-x-2"
      >
        <Input
          value={searchKey}
          type="text"
          placeholder="Search"
          // className="bg-gray-50 rounded-full border
          //  border-gray-200  text-sm w-full py-2 px-4 max-w-[210px]"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            className="w-8 h-8 text-gray-400 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
