import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">User Not Found</p>
        <p className="text-gray-500 mb-8">The user you are looking for does not exist or has been removed.</p>
        <a href="/" className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
          Go Back Home
        </a>
      </div>
    </div>
  );
}
