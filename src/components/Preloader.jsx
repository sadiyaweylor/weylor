/* ------------------ PRELOADER ------------------ */
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Preloader({ done }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      <motion.h1
        initial={{ letterSpacing: "0.5em", opacity: 0 }}
        animate={{ letterSpacing: "0.15em", opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-6xl font-bold font-serif"
      >
        Weylor
      </motion.h1>
    </motion.div>
  );
}