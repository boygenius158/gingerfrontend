import React, { useState } from 'react';
import { StreamVideoClient } from 'stream-video-js'; // Make sure to import the correct package

const VideoCallComponent = () => {
  const [client] = useState(() => {
    const user = {
      id: "lingering-hall-0",
      name: "lingering",
      image: "https://getstream.io/random_svg/?id=lingering-hall-0&name=lingering",
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2FkZV9Ta3l3YWxrZXIiLCJpc3MiOiJwcm9udG8iLCJzdWIiOiJ1c2VyL0NhZGVfU2t5d2Fsa2VyIiwiaWF0IjoxNjg5MjY2MjQxLCJleHAiOjE2ODk4NzEwNDZ9.xMZKhSOeYybtXlpalHdrwiJCEd2wxhY6UtHU4PfJxmk";
    
    return new StreamVideoClient({
      apiKey: "a6r57b668n35",
      user,
      token,
      options: { logLevel: "warn" },
    });
  });

  return (
    <div>
      {client ? (
        <div>Video Call Client is Ready</div>
      ) : (
        <div>Loading Client...</div>
      )}
    </div>
  );
};

export default VideoCallComponent;
