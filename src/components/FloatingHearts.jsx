"use client"

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts({ trigger }) {

  if (!trigger) return null;

  const hearts = Array.from({ length: 6 });

  return (
    <div className="absolute inset-0 pointer-events-none">

      {hearts.map((_, i) => {

        const x = (Math.random() - 0.5) * 120;
        const y = -80 - Math.random() * 80;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.2,
              x,
              y
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut"
            }}
            className="absolute"
          >
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          </motion.div>
        );

      })}

    </div>
  );
}