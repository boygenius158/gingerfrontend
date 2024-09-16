import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Progress } from "@/components/ui/progress";

// Set the app element for accessibility
// Modal.setAppElement('#__next');

export default function Story({ story }) {
  const [isOpen, setOpen] = useState(false); // Default to closed

  // Function to handle opening and closing of modal
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  console.log(story);
  const [progress, setProgress] = useState(13);
  const truncateUsername = (username)=>{
    return username.length > 6 ? `${username.slice(0,6)}...`:username
  }
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            closeModal();
            return 100;
          }
          return prev + 1; // Adjust increment based on desired speed
        });
      }, 80); // Update interval in milliseconds (e.g., 100ms)
      // setOpen(false)
      return () => clearInterval(interval); // Cleanup on unmount
    }else{
      setProgress(0)
    }
  }, [isOpen]);

  return (
    <div className=" ">
      <div
        className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden cursor-pointer"
        onClick={openModal}
      >
        <Image
          className="rounded-full"
          src={story.userDetails.profilePicture}
          alt={story.userDetails.username}
          height={64}
          width={64}
        />
        <h1>{truncateUsername(story.userDetails.username)}</h1>
      </div>
      <h1 className="italic text-gray-800">        <h1>{truncateUsername(story.userDetails.username)}</h1>
      </h1>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Story Modal"
        className="fixed inset-0 flex items-center justify-center  p-4 mt-32 "
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <div className="mb-2">
            <Progress value={progress} className="" />{" "}
          </div>

          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex items-center justify-center">
            <Image
              className="rounded-lg"
              src={story.imageUrl}
              alt={story.userDetails.username}
              height={300}
              width={300}
            />
          </div>
          <p className="mt-4 text-center text-lg font-semibold">
            {story.userDetails.username}
          </p>
        </div>
      </Modal>
    </div>
  );
}
