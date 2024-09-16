import { useEffect } from "react";

export default function FlyingHeart() {
  useEffect(() => {
    const heartsContainer = document.getElementById("hearts-container");

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = `${Math.random() * 100}%`;
      heartsContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    };

    const interval = setInterval(createHeart, 500);

    return () => clearInterval(interval);
  }, []);

  return null;
}
