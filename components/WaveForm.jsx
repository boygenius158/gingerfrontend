
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WaveForm({ audioSrc }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // State to manage play/pause

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ddd",
      progressColor: "#3b82f6",
      height: 50,
      width: 450,
      barWidth: 2,
      barHeight: 1,
    });

    setIsLoading(true);

    wavesurfer.current
      .load(audioSrc)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("WaveSurfer error:", error);
        setIsLoading(false);
      });

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioSrc]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className=" overflow-hidden">
      <div ref={waveformRef}>{isLoading && <div>Loading...</div>}</div>
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
}
