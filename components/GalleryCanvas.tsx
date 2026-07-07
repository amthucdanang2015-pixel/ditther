"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  src: string;
};

export default function GalleryCanvas({ src }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={src}
        className="absolute inset-0 overflow-hidden"
        initial={{
          opacity: 0,
          scale: 1.15, // Start larger
        }}
        animate={{
          opacity: 1,
          scale: 1, // Slowly shrink back
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          opacity: { duration: 0.6 },
          scale: {
            duration: 5,
            ease: "linear",
          },
        }}
      >
        <Image src={src} alt="" fill priority className="object-cover" />
      </motion.div>
    </AnimatePresence>
  );
}
