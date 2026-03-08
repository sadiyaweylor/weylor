"use client";

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
            className="fixed inset-24 flex items-center justify-center z-50 px-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="max-w-md w-full rounded-2xl bg-white dark:bg-neutral-950 p-8 shadow-2xl text-center">

              <h3 className="text-2xl text-black dark:text-white">
                Continue to Instagram
              </h3>

              <p className="mt-3 text-sm text-black dark:text-white opacity-80">
                Our collection is currently available on Instagram.  
                You will be redirected to the Weylor shop page.
              </p>

              <div className="mt-6 flex gap-4 justify-center">

                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 dark:hover:bg-white transition dark:hover:text-black dark:text-white-50"
                >
                  Stay Here
                </button>

                <button
                  onClick={onConfirm}
                  className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
                >
                  Continue
                </button>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}