"use client";

import instance from "@/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

export default function PostGUI() {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [alert, setAlert] = useState(false);

  const openModal = (post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  const customStyles = {
    content: {
      width: "500px",
      height: "auto",
      margin: "auto",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    },
  };

  async function fetchReportedPosts() {
    try {
      const response = await instance.post("/api/admin/filterPost");
      console.log(response);
      
      if (response && response.data) {
        setReportedPosts(response.data.posts);
      }
    } catch (error) {
      console.error("Error fetching reported posts:", error);
    }
  }

  async function banPost(postId) {
    try {
      console.log(postId);
      
      await instance.post("/api/admin/banPost", { postId });
      fetchReportedPosts(); // Refresh the reported posts list
      closeModal(); // Close the modal after banning the post
    } catch (error) {
      console.error("Error banning post:", error);
    }
  }

  useEffect(() => {
    fetchReportedPosts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center m-4 ">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Post Details"
        >
          {selectedPost && (
            <>
              <div
                onClick={closeModal}
                className="flex justify-end cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">Post Details</h2>
              <p>
                <strong>Post ID:</strong> {selectedPost._id}
              </p>
              <p>
                <strong>Owner:</strong> @
                {selectedPost?.postId?.userId?.username}
              </p>
              <div className="my-4">
                <Image
                  src={selectedPost?.postId?.imageUrl[0]}
                  alt="failed"
                  height={200}
                  width={200}
                  className="rounded-lg"
                />
              </div>
              <p>
                <strong>Is Banned:</strong>{" "}
                {selectedPost?.postId?.isBanned ? "Yes" : "No"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedPost?.postId?.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Visit Post:</strong>{" "}
                <Link href={`/post/${selectedPost?.postId?._id}`}>
                  <p className="text-blue-500 underline">Link</p>
                </Link>
              </p>
              {!selectedPost?.postId?.isBanned && (
                <button
                  onClick={() => banPost(selectedPost?.postId?._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Ban Post
                </button>
              )}
            </>
          )}
        </Modal>
        {/* <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Filter Post
        </h1> */}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Post Id
              </th>
              <th scope="col" className="px-6 py-3">
                Owner
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {reportedPosts.map((post, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => openModal(post)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {post._id}
                </th>
                <td className="px-6 py-4">@{post?.postId?.userId?.username}</td>
                <td className="px-6 py-4">
                  {post?.postId?.isBanned ? (
                    <span className="text-red-500 font-semibold">Banned</span>
                  ) : (
                    <span className="text-green-500 font-semibold">Active</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {new Date(post?.postId?.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
