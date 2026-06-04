import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
  const hearts = Array.from({ length: 5 });

  return (
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, scale: 1.5 }}
          animate={{
            opacity: 1,
            y: -100 - i * 20,
            scale: 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.4,
            delay: i * 0.5,
            ease: "easeOut",
          }}
          className="absolute"
        >
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </motion.div>
      ))}
    </div>
  );
}
