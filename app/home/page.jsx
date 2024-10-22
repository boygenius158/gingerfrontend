"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, update } = useSession(); // Destructure update from useSession
  const [newName, setNewName] = useState("");

  const handleNameChange = async () => {
    if (!session) return;

    // Call the update method to update session data
    await update({ username: newName }); // Pass the updated username

    setNewName(""); // Clear input field
  };

  if (!session) {
    return <p>Loading...</p>; 
  }
console.log(session);  

  return (
    <div>
      <p>Signed in as {session.username}</p>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter new name"
      />
      <button onClick={handleNameChange}>Change Name</button>
      {/* ... other content based on session data ... */}
    </div>
  );
}
