"use client"

import React, { useEffect, useState, useRef } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) return;

  const res = await fetch("/api/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (data.success || data.message) {
    setSubmitted(true);
  }

  setEmail("");
};

  return (
    <section className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center ">

        <h3 className="text-5xl md:text-4xl text-black-950 dark:text-white">
          Join the Weylor Circle
        </h3>

        <p className="mt-6 text-black-950 dark:text-orange-200 max-w-xl mx-auto text-md">
          Early access to collections, thoughtful stories, and pieces crafted
          with intention.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-3xl p-10 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-neutral-200/40 dark:border-neutral-700/40 shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 text-neutral-700 rounded-full px-6 py-4 bg-white/70 dark:bg-neutral-900 outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />

            <button
              type="submit"
              className="rounded-full px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition"
            >
              Subscribe
            </button>

          </div>

          {submitted && (
            <p className="mt-6 text-sm text-emerald-600 dark:text-emerald-400">
              You're in. Welcome to Weylor.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
