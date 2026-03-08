"use client";

import { MagneticButton } from "@/components/MagneticButton";
import { useState } from "react";

export default function ExploreButton() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <MagneticButton
      onClick={() => setOpenModal(true)}
className="text-xl mt-10 rounded-full px-10 py-4 bg-black text-white shadow-xl dark:bg-white dark:text-black">      Explore Weylor
    </MagneticButton>
  );
}