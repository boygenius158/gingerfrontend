"use client";

import React, { useState } from "react";
import axios from "axios";
import instance from "@/axiosInstance";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const getPresignedUrls = async () => {
    const fileData = files.map((file) => ({
      fileName: file.name,
      fileType: file.type,
    }));

    try {
      console.log("hi");

      const response = await instance.post("/api/getPresignedUrls", {
        files: fileData,
      });
      console.log(response.data);

      return response.data; // This will be an array of upload URLs and keys
    } catch (error) {
      console.error("Error getting presigned URLs:", error);
      setUploadStatus("Error getting presigned URLs");
      throw error; // Rethrow the error for further handling
    }
  };

  const uploadFiles = async (uploadUrls) => {
    try {
      await Promise.all(
        uploadUrls.map(async (uploadInfo, index) => {
          console.log(uploadInfo, index);

          const file = files[index];
          try {
            await axios.put(uploadInfo.uploadUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
              onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log(`File ${file.name} is ${progress}% uploaded`);
              },
            });
          } catch (error) {
            console.error(`Error uploading file: ${file.name}`, error);
          }
        })
      );
      setUploadStatus("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Error uploading files");
    }
  };

  const handleUpload = async () => {
    setUploadStatus("Getting presigned URLs...");
    try {
      const uploadUrls = await getPresignedUrls();
      await uploadFiles(uploadUrls);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed");
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={files.length === 0}>
        Upload Files
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
