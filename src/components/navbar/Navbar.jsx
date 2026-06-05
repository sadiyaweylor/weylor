"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DarkModeToggle from "../DarkModeToggle";
import InstagramRedirectModal from "@/components/ui/InstagramRedirectModal";
import { Menu, X } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathname = usePathname();

  const INSTAGRAM_URL = "https://instagram.com/weylor.world";

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
  setMobileMenu(false);
}, [pathname]);

useEffect(() => {
  if (mobileMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [mobileMenu]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-neutral-200 dark:border-neutral-800"
          : "opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">        {/* Logo */}
        <Link
          href="/"
className="font-serif text-lg sm:text-xl lg:text-2xl tracking-[0.2em]"          aria-label="Weylor Home"
        >
          Weylor
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-light">
           <li>
              <Link href="/"
                className="hover:opacity-70 transition"
              >
                Home
              </Link>
           </li>   
              <li>
  <button
    onClick={() => setOpenModal(true)}
    className="hover:opacity-70 transition"
  >
    Shop
  </button>
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
            <Link href="/#contact" className="hover:opacity-70 transition">
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

      {/* Mobile Backdrop */}
<AnimatePresence>
  {mobileMenu && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMobileMenu(false)}
      />

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="
          md:hidden
          fixed
          top-14
          left-0
          w-full
          z-50
          bg-white
          dark:bg-black
          border-t
          border-neutral-200
          dark:border-neutral-800
          px-6
          py-8
        "
      >
        <div className="flex flex-col gap-6 text-base tracking-wide font-light">
          
          <Link
            href="/"
            onClick={() => setMobileMenu(false)}
            className="transition hover:text-neutral-700 dark:hover:text-white"
          >
            Home
          </Link>

          <button
            onClick={() => {
              setMobileMenu(false);
              setOpenModal(true);
            }}
            className="text-left transition hover:text-neutral-700 dark:hover:text-white"
          >
            Shop
          </button>

          <Link
            href="/#about"
            onClick={() => setMobileMenu(false)}
            className="transition hover:text-neutral-700 dark:hover:text-white"
          >
            About
          </Link>

          <Link
            href="/journal"
            onClick={() => setMobileMenu(false)}
            className="transition hover:text-neutral-700 dark:hover:text-white"
          >
            Journal
          </Link>

          <Link
            href="/responsibility"
            onClick={() => setMobileMenu(false)}
            className="transition hover:text-neutral-700 dark:hover:text-white"
          >
            Sustainability
          </Link>

          <Link
            href="/#contact"
            onClick={() => setMobileMenu(false)}
            className="transition hover:text-neutral-700 dark:hover:text-white"
          >
            Contact
          </Link>

        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

      <InstagramRedirectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => window.open(INSTAGRAM_URL, "_blank")}
      />
    </header>
  );
}