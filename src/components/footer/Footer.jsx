"use client";

import Link from "next/link";
import { useState } from "react";
import InstagramRedirectModal from "@/components/ui/InstagramRedirectModal";

const INSTAGRAM_URL = "https://instagram.com/weylor.world";

export default function Footer() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <footer id="contact" className="relative bg-black text-white pt-32 pb-16 overflow-hidden">

      {/* HUGE BACKGROUND BRAND */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[18vw] md:text-[14vw] font-serif opacity-[0.05] leading-none">
          Weylor
        </h1>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="font-serif text-2xl mb-4">Weylor</h2>
          <p className="text-white/70 text-sm max-w-xs">
            Precision craftsmanship meets modern luxury. Designed for timeless elegance.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm tracking-widest mb-4 text-white/60">
            NAVIGATION
          </h3>

          <ul className="space-y-2 text-sm">

            <li>
              <Link href="/"
                onClick={() => setOpenModal(true)}
                className="hover:opacity-70 transition"
              >
                Home
              </Link>
</li>
<li>
              <Link href=""
                onClick={() => setOpenModal(true)}
                className="hover:opacity-70 transition"
              >
                Shop
              </Link>
            </li>

            <li>
              <Link href="/#about" className="hover:opacity-70 transition">
                About
              </Link>
            </li>

            <li>
              <Link href="/journal" className="hover:opacity-70 transition">
                Journal
              </Link>
            </li>

            <li>
              <Link href="#sustainability" className="hover:opacity-70 transition">
                Sustainability
              </Link>
            </li>

            <li>
              <Link href="#contact" className="hover:opacity-70 transition">
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm tracking-widest mb-4 text-white/60">
            SOCIAL
          </h3>

          <ul className="space-y-2 text-sm">

            <li>
  <button
    onClick={() => setOpenModal(true)}
    className="hover:opacity-70 transition"
  >
    Instagram
  </button>
</li>

<li>
  <a
    href="https://www.linkedin.com/in/sadiya-k-"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-70 transition"
  >
    LinkedIn
  </a>
</li>

<li>
  <a
    href="https://x.com/Sadiya_K"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-70 transition"
  >
    Twitter
  </a>
</li>

<li>
  <a
    href= "https://in.pinterest.com/WEYLOR_/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-70 transition"
  >
    Pintrest
  </a>
</li> 
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm tracking-widest mb-4 text-white/60">
            CONTACT
          </h3>

          <ul className="space-y-2 text-sm">

<li>
  <button
    onClick={() => {
      const email = "founder@weylor.world";
      const subject = encodeURIComponent("Inquiry for Weylor");
      const body = encodeURIComponent("Hello Weylor Team,");

      const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
      const mailtoURL = `mailto:${email}?subject=${subject}&body=${body}`;

      const newWindow = window.open(gmailURL, "_blank");

      setTimeout(() => {
        if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
          window.location.href = mailtoURL;
        }
      }, 500);
    }}
    className="hover:opacity-70 transition"
  >
    Email
  </button>
</li>

<li>
  <a
    href="https://wa.me/918977797112?text=Hello%20Weylor%2C%20I%20would%20like%20to%20know%20more."
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-70 transition"
  >
    WhatsApp
  </a>
</li>

<li>
  <a
    href="https://www.instagram.com/oksadiyaa"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-70 transition"
  >
    Instagram
  </a>
</li>



          </ul>
          </div>

      </div>

      <div className="relative text-center mt-16 text-xs text-white/40">
        © {new Date().getFullYear()} WEYLOR — All rights reserved
      </div>

      <InstagramRedirectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => window.open(INSTAGRAM_URL, "_blank")}
      />

    </footer>
  );
}