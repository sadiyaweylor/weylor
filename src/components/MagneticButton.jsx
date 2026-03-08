/* ------------------ MAGNETIC BUTTON ------------------ */
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function MagneticButton({ children, onClick, className }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x * 0.2}px, ${
      y * 0.2
    }px)`;
  };

  const reset = () => {
    ref.current.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`transition-transform duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
