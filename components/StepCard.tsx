"use client";

import { motion } from "framer-motion";

type Props = {
  number: string;
  title: string;
  description: string;
  video: string;
};

export default function StepCard({ number, title, description, video }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="rounded-[34px] border border-white/10 bg-[#1c1c1e] p-5"
    >
      <div className="overflow-hidden rounded-[26px]">
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="aspect-[4/5] w-full object-cover"
        />
      </div>

      <div className="mt-8">
        <p className="text-sm tracking-[0.3em] text-white/45">
          {number} — STEP
        </p>

        <h3 className="mt-5 text-4xl font-light text-white">{title}</h3>

        <p className="mt-5 text-xl leading-9 text-white/45">{description}</p>
      </div>
    </motion.div>
  );
}
