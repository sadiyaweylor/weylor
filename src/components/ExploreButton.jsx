
"use client";
import { useState } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import InstagramRedirectModal from "@/components/ui/InstagramRedirectModal";

export default function ExploreButton() {
  const [openModal, setOpenModal] = useState(false);

  const INSTAGRAM_URL = "https://instagram.com/weylor.world";

  return (
    <>
      <MagneticButton
        onClick={() => setOpenModal(true)}
        className="text-xl mt-10 rounded-full px-10 py-4 bg-black text-white shadow-xl"
      >
        Explore Weylor
      </MagneticButton>

      <InstagramRedirectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => window.open(INSTAGRAM_URL, "_blank")}
      />
    </>
  );
}