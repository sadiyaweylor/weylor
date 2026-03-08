"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Sparkles, Shirt } from "lucide-react";

import Navbar from "@/components/navbar/Navbar";
import Lookbook from "@/components/lookbook/Lookbook";
import AIPersonalize from "@/components/aipersonalization/AIPersonalization";
import Founder from "@/components/founder/Founder";
import Newsletter from "@/components/newsletter/Newsletter";

import Link from "next/link";
import InstagramRedirectModal from "@/components/ui/InstagramRedirectModal";

import { CursorAura } from "@/components/CursorAura";
import { MagneticButton } from "@/components/MagneticButton";
import { Preloader } from "@/components/Preloader";


import WeylorLove from "@/components/WeylorLove";


const INSTAGRAM_URL = "https://instagram.com/weylor.world";


export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <>
      <Preloader done={loaded} />
      <CursorAura />

      <Navbar />

      <motion.main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        
        {/* HERO */}
        <section className="relative min-h-[100vh] flex flex-col justify-center items-center text-center px-6 bg-[url('/hero.jpg')] bg-cover bg-center">

          <div className="absolute inset-0 bg-black/50"></div>

          <motion.div style={{ y: heroY }} className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-7xl font-bold text-white"
            >
              NOT a trend chasing fashion house.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-6 max-w-xl text-lg text-white"
            >
              Elevated fashion — Premium and sustainable.
            </motion.p>

            <Link href="#">
              <MagneticButton
                onClick={() => setOpenModal(true)}
                className="text-xl mt-10 rounded-full px-10 py-4 bg-black text-white shadow-xl"
              >
                Explore Weylor
              </MagneticButton>
            </Link>
          </motion.div>
        </section>

        <Cards />
        <Lookbook />
        <AIPersonalize />
        <Founder />
        <Newsletter />
        <WeylorLove />

      </motion.main>

      <InstagramRedirectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => window.open(INSTAGRAM_URL, "_blank")}
      />
    </>
  );
}


/* ---------------- CARDS SECTION ---------------- */

function Cards() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h3 className="text-5xl md:text-4xl">
          Designed with kindness
        </h3>

        <p className="mt-6 max-w-xl text-md mx-auto">
          We balance comfort, aesthetics, and environmental responsibility.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          <Feature
            icon={<Sparkles />}
            title="Premium Craft"
            desc="Careful stitching and thoughtful detailing."
          />

          <Feature
            icon={<Leaf />}
            title="Natural Fabrics"
            desc="Breathable materials kinder to skin and earth."
          />

          <Feature
            icon={<Shirt />}
            title="Timeless Design"
            desc="Silhouettes that stay beyond seasons."
          />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card className="dark:border-none rounded-3xl shadow-md bg-white dark:bg-black">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">{icon}</div>

          <h4 className="font-medium">{title}</h4>

          <p className="text-sm mt-2">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}