"use client"

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AIPersonalize() {
  const [suggestion, setSuggestion] = useState("Analyzing climate...");
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setSuggestion("Minimal All-Season Layers");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );

      const data = await res.json();
      const temp = data.current_weather.temperature;
      const wind = data.current_weather.windspeed;

      // 🌡 Styling Logic
      if (temp < 12) {
        setSuggestion("Structured Thick Layers");
        setDetails("Cold Climate Essential");
      } else if (temp < 20) {
        setSuggestion("Refined Transitional Pieces");
        setDetails("Layer-Friendly Weather");
      } else if (temp < 28) {
        setSuggestion("Breathable Tailored Daywear");
        setDetails("Comfortably Warm");
      } else {
        setSuggestion("Ultra-Light Summer Silhouettes");
        setDetails("High Heat Minimalism");
      }

      if (wind > 25) {
        setDetails((prev) => prev + " • Wind-Resistant Recommended");
      }
    });
  }, []);

  return (
    <section className="relative py-32 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-3xl mx-auto backdrop-blur-xl bg-white/5 dark:bg-black/10 border dark:border-white/10 p-16 object-cover rounded-3xl shadow-xl"
      >
        <h3 className="text-5xl md:text-4xl tracking-tight text-black-950 dark:text-white-50">
          Adaptive Capsule
        </h3>

        <p className="mt-4 text-sm uppercase tracking-widest opacity-80 text:neutral-700 dark:text-orange-200">
          Live Weather Styling Intelligence
        </p>

        <p className="mt-10 text-3xl font-medium text-white-50">
          {suggestion}
        </p>

        <p className="mt-4 text-md text-black-950 dark:text-orange-200">
          {details}
        </p>
      </motion.div>
    </section>
  );
}
