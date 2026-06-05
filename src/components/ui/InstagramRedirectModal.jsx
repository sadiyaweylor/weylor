"use client";

import { MagneticButton } from "@/components/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";

export default function InstagramRedirectModal({
  open,
  onClose,
  onConfirm,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <div
              className="
                w-full
                max-w-[92vw]
                sm:max-w-md
                md:max-w-lg
                lg:max-w-xl
                xl:max-w-2xl
                rounded-2xl
                sm:rounded-3xl
                bg-white
                dark:bg-neutral-950
                px-5
                py-6
                sm:px-8
                sm:py-8
                md:px-10
                md:py-10
                shadow-2xl
                text-center
                max-h-[90vh]
                overflow-y-auto
              "
            >
              <h3
                className="
                  text-lg
                  sm:text-2xl
                  md:text-3xl
                  font-medium
                  text-black
                  dark:text-white
                  leading-tight
                "
              >
                Continue to Instagram
              </h3>

              <p
                className="
                  mt-3
                  sm:mt-4
                  text-sm
                  sm:text-base
                  md:text-lg
                  leading-relaxed
                  text-black/75
                  dark:text-white/75
                  max-w-lg
                  mx-auto
                "
              >
                Our collection is currently available on Instagram.
                <br className="hidden sm:block" />
                You will be redirected to the Weylor shop page.
              </p>

              <div
                className="
                  mt-6
                  sm:mt-8
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                  sm:gap-4
                  justify-center
                  items-center
                "
              >
                <MagneticButton
                  onClick={onClose}
                  className="
                    w-full
                    sm:w-auto
                    min-w-[140px]
                    px-6
                    py-3
                    text-sm
                    sm:text-base
                    rounded-full
                    border
                    border-neutral-300
                    dark:border-neutral-700
                    text-black
                    dark:text-white
                    transition
                  "
                >
                  Stay Here
                </MagneticButton>

                <MagneticButton
                  onClick={onConfirm}
                  className="
                    w-full
                    sm:w-auto
                    min-w-[140px]
                    px-6
                    py-3
                    text-sm
                    sm:text-base
                    rounded-full
                    bg-black
                    text-white
                    dark:bg-white
                    dark:text-black
                    hover:opacity-90
                    transition
                  "
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
