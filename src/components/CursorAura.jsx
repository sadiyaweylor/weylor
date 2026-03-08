/* ------------------ CURSOR AURA ------------------ */
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function CursorAura() {
  useEffect(() => {
    const cursor = document.createElement("div");

    cursor.className =
      "fixed top-0 left-0 w-6 h-6 rounded-full border border-neutral-400 pointer-events-none z-[999] transition-transform duration-150";

    document.body.appendChild(cursor);

    const move = (e) => {
      cursor.style.transform = `translate(${e.clientX - 12}px, ${
        e.clientY - 12
      }px)`;
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      cursor.remove();
    };
  }, []);

  return null;
}