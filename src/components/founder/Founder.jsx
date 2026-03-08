import { motion, useScroll, useTransform } from "framer-motion";

export default function Founder() {
  return (
    <section className="py-32 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative"
      >
        <img
          src="/founder2.jpg"
          alt="Weylor founder"
          className="h-[75vh] w-[420px] object-cover rounded-3xl shadow-xl"
        />

        {/* subtle editorial block */}
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#EAD0AF] rounded-3xl -z-10"></div>
      </motion.div>

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-5xl md:text-4xl text-black-950 dark:text-white">
          Built consciously
        </h3>

        <p className="mt-6 text-md leading-relaxed text-neutral-700 dark:text-orange-200">
          Weylor began as a personal pursuit — to create clothing that safeguards
          both people and the earth. Every garment is designed with longevity,
          natural materials, and quiet minimalism at its core.
        </p>

        <p className="mt-6 text-md leading-relaxed text-neutral-700 dark:text-orange-200">
          Instead of chasing seasonal trends, Weylor focuses on timeless
          silhouettes and responsible production — pieces meant to be worn,
          lived in, and kept.
        </p>

        <p className="mt-8 text-sm font-medium tracking-widest uppercase dark:text-white">
          Founder — Weylor
        </p>
      </motion.div>
    </section>
  );
}