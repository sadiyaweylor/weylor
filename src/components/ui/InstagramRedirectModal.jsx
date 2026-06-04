"use client";

import { MagneticButton } from "@/components/MagneticButton";

import { motion, AnimatePresence } from "framer-motion";

export default function InstagramRedirectModal({ open, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Background */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-2xl bg-white dark:bg-neutral-950 p-6 sm:p-8 shadow-2xl text-center">
              <h3 className="text-xl sm:text-2xl text-black dark:text-white">
                Continue to Instagram
              </h3>

              <p className="mt-3 text-sm sm:text-base text-black dark:text-white opacity-80">
                Our collection is currently available on Instagram.  
                You will be redirected to the Weylor shop page.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              
              <MagneticButton
                  onClick={onClose}
                  className="px-5 py-2 rounded-full border text-black border-neutral-300 dark:border-neutral-700 transition dark:text-white"
                >
                  Stay Here
              </MagneticButton>

                <MagneticButton
                  onClick={onConfirm}
                  className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
                >
                  Continue
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
