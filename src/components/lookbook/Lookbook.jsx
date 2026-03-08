"use client" 

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Lookbook() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const images = [
    "/lookbook/look1.jpg",
    "/lookbook/look2.jpg",
    "/lookbook/look3.jpg",
    "/lookbook/look4.jpg",
    "/lookbook/look5.jpg",
  ];

  return (
    <section id="collection" ref={ref} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-10 px-20">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              className="h-[75vh] w-[420px] object-cover rounded-3xl shadow-xl"
              alt={`Lookbook ${i + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
