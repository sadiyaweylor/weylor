"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DarkModeToggle from "../DarkModeToggle";
import InstagramRedirectModal from "@/components/ui/InstagramRedirectModal";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const INSTAGRAM_URL = "https://instagram.com/weylor.world";

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-neutral-200 dark:border-neutral-800"
          : "opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl tracking-widest"
          aria-label="Weylor Home"
        >
          Weylor
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-light">
           <li>
              <Link href="/"
                onClick={() => setOpenModal(true)}
                className="hover:opacity-70 transition"
              >
                Home
              </Link>
           </li>   
              <li>
            <Link href = '/'
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
            <Link href="/responsibility" className="hover:opacity-70 transition">
              Sustainability
            </Link>
          </li>

          <li>
            <Link href="#contact" className="hover:opacity-70 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">

          <DarkModeToggle />

          {/* Hamburger Icon */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 text-sm bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 dark:text-orange-200">
          
            <Link href = '/'
              onClick={() => setOpenModal(true)}
              className="rounded-full text-md text-black dark:text-white font-normal"
            >
              Home
            </Link>

          <Link href = "/"
            onClick={() => setOpenModal(true)}
            className=" dark:hover:text-white hover:text-neutral-800  hover:font-semibold"
          >
            Shop
          </Link>

          <Link href="/#about" onClick={() => setMobileMenu(false)}
            className=" dark:hover:text-white hover:text-neutral-800  hover:font-semibold"
>
            About
          </Link>

          <Link href="/journal" onClick={() => setMobileMenu(false)}
            className=" dark:hover:text-white hover:text-neutral-800  hover:font-semibold"
>
            Journal
          </Link>
          
          <Link href="/responsibility" onClick={() => setMobileMenu(false)}
            className=" dark:hover:text-white hover:text-neutral-800  hover:font-semibold"
>
            Sustainability
          </Link>

          <Link href="#contact" onClick={() => setMobileMenu(false)}
            className=" dark:hover:text-white hover:text-neutral-800  hover:font-semibold"
>
            Contact
          </Link>

        </div>
      )}

      <InstagramRedirectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => window.open(INSTAGRAM_URL, "_blank")}
      />
    </header>
  );
}