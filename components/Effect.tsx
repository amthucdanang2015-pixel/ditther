"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const strips = [
  "/images/strip_2.jpg",
  "/images/strip_3.jpg",
  "/images/strip_4.jpg",
  "/images/strip_5.jpg",
  "/images/strip_6.jpg",
  "/images/strip_7.jpg",
  "/images/strip_8.jpg",
  "/images/strip_9.jpg",
];

export default function Effect() {
  return (
    <section id="effects" className="bg-[#0d0d0f] py-32 max-[800px]:px-[20px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-20 max-w-3xl">
          <p className="text-[11px] tracking-[0.1em] text-[#c8f542] uppercase mb-4 font-normal">
            Pixel Effects
          </p>

          <h2 className="text-[clamp(28px,4vw,44px)] font-light tracking-[-0.03em] leading-[1.15] mb-4">
            Six ways to transform any image
          </h2>

          <p className="text-base text-[#8d8d95] max-w-[520px] leading-[1.7] font-light">
            Each effect has its own character. Mix them with cinematic filters
            and 40+ backgrounds to find your look.
          </p>
        </div>

        {/* Gallery */}
        <div className="space-y-10">
          {Array.from({ length: Math.ceil(strips.length / 2) }).map(
            (_, row) => (
              <div key={row} className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                {strips.slice(row * 2, row * 2 + 2).map((src, index) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: (row * 2 + index) * 0.08,
                    }}
                    className="group overflow-hidden rounded-[32px] bg-[#0d0d0f]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
