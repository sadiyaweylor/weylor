"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function WeylorLove() {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(false);
  const [visible, setVisible] = useState(false);

  function getDeviceId() {
    let id = localStorage.getItem("weylor-device-id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("weylor-device-id", id);
    }
    return id;
  }

  useEffect(() => {
    const stored = localStorage.getItem("weylor-love");
    if (stored) setLiked(true);

    fetch("/api/love")
      .then((res) => res.json())
      .then((data) => setCount(data.count));

    const channel = supabase
      .channel("love-counter")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "loves" },
        () => {
          fetch("/api/love")
            .then((res) => res.json())
            .then((data) => setCount(data.count));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollTop / docHeight;

      setVisible(scrolled >= 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = async () => {
    if (liked) {
      setLiked(false);
      setCount((prev) => Math.max(0, prev - 1));
      localStorage.removeItem("weylor-love");

      await fetch("/api/love", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: getDeviceId() }),
      });
    } else {
      setLiked(true);
      setBurst(true);
      setCount((prev) => prev + 1);
      localStorage.setItem("weylor-love", "true");

      await fetch("/api/love", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: getDeviceId() }),
      });

      setTimeout(() => setBurst(false), 1200);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-50 group"
        >
          {/* Tooltip */}
          <div className="absolute bottom-14 right-0 opacity-0 group-hover:opacity-100 transition text-xs bg-black text-white px-3 py-1 rounded-md whitespace-nowrap">
            Loved by readers
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-black border px-5 py-3 rounded-full shadow-xl">
            <AnimatePresence>{burst && <FloatingHearts />}</AnimatePresence>

            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={liked ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.4 }}
              />
              <Heart
                className={`w-7 h-7 transition ${
                  liked ? "fill-red-500 text-red-500" : "text-neutral-500"
                }`}
              />
            </motion.button>

            <motion.span
              key={count}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="text-sm font-medium"
            >
              {count}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
