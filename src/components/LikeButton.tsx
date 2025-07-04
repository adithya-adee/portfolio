"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, HeartHandshake, HeartPulseIcon, Sparkles } from "lucide-react";

interface LikeButtonProps {
  isMobile?: boolean;
}

export default function LikeButton({ isMobile }: LikeButtonProps) {
  const [liked, setIsLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user previously liked
    const hasLiked = localStorage.getItem("portfolio_liked") === "true";
    setIsLiked(hasLiked);

    // Fetch current count from our API
    fetch("/api/likes")
      .then((response) => response.json())
      .then((data) => {
        setCount(data.likes || 0);
      })
      .catch(() => {
        const localCount = localStorage.getItem("portfolio_likes_count") ?? "0";
        if (localCount) setCount(parseInt(localCount, 10));
      });
  }, []);

  const handleLike = () => {
    const newLiked = !liked;
    setIsLiked(newLiked);
    setIsAnimating(true);

    // Store user's like state
    localStorage.setItem("portfolio_liked", newLiked.toString());

    // Update via our API endpoint
    fetch("/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: newLiked ? "increment" : "decrement",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCount(data.likes);
        localStorage.setItem("portfolio_likes_count", data.likes.toString());
      })
      .catch((error) => {
        console.error("Error updating likes:", error);
      });

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div
      className={`flex flex-col items-center ${isMobile ? "gap-1" : "gap-2"}`}
    >
      <button
        onClick={handleLike}
        className={`relative transition-all duration-300 ${
          isMobile ? "p-2" : "p-3"
        } rounded-full overflow-hidden group`}
        aria-label={liked ? "Unlike" : "Like"}
      >
        {/* Background glow effect */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
            liked ? "bg-pink-500/20 opacity-100" : "opacity-0"
          } group-hover:opacity-100`}
        />

        {/* Heart icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={liked ? "liked" : "unliked"}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: isAnimating ? [1, 1.3, 1] : 1,
              opacity: 1,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative z-10"
          >
            {liked ? (
              <HeartPulseIcon
                className={`${
                  isMobile ? "w-6 h-6" : "w-8 h-8"
                } fill-pink-500 text-pink-500`}
              />
            ) : (
              <Heart
                className={`${
                  isMobile ? "w-6 h-6" : "w-8 h-8"
                } text-neutral-300 group-hover:text-pink-400`}
              />
            )}

            {/* Sparkles when animation is active - optimized animation */}
            {isAnimating && liked && (
              <>
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 text-pink-500"
                >
                  <Sparkles className={`${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                </motion.div>

                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-0 left-1/2 -ml-1 text-pink-500"
                    initial={{ y: 0, x: 0, opacity: 1, scale: 0.5 }}
                    animate={{
                      y: -15 - Math.random() * 10,
                      x: (Math.random() - 0.5) * 15,
                      opacity: 0,
                      scale: 0.1,
                    }}
                    transition={{ duration: 0.8 + Math.random() * 0.3 }}
                  >
                    <Heart className="w-2 h-2 fill-pink-500" />
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Like counter */}
      <motion.div
        className={`${liked ? "text-pink-400" : "text-neutral-400"} ${
          isMobile ? "text-xs" : "text-sm"
        } font-medium`}
        animate={{ scale: isAnimating && liked ? [1, 1.2, 1] : 1 }}
      >
        {count >= 0 && <span>{count.toLocaleString()}</span>}
      </motion.div>

      {/* Feedback text */}
      <AnimatePresence>
        {liked && (
          <motion.div
            initial={{ opacity: 0, y: 5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`text-pink-400 flex items-center gap-1 ${
              isMobile ? "text-xs" : "text-sm"
            }`}
          >
            <HeartHandshake className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
            <span>Thanks!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
