"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const guides = [
  {
    href: "#",
    image: "/images/strip_3.jpg",
    alt: "Ditther v1.3 — Looks, Duotone and Animation",
    tag: "Update",
    title: "What's new in v1.3 — Looks, Duotone, and Animation",
    description:
      "The biggest Ditther update yet. Save and share full creative presets, apply duotone colour grading, and export animated effects.",
  },
  {
    href: "#",
    image: "/images/strip_7.jpg",
    alt: "How to create a halftone effect online",
    tag: "Tutorial",
    title: "How to create a halftone effect online",
    description:
      "A step-by-step guide to getting the classic print-style dot pattern look — and what settings to tweak for different feels.",
  },
  {
    href: "#",
    image: "/images/strip_9.jpg",
    alt: "How to use ASCII art converter",
    tag: "Tutorial",
    title: "Converting photos to ASCII art — a complete guide",
    description:
      "How to use Ditther's character effect, which presets look best, and how to combine it with cinematic filters.",
  },
];

export default function Guides() {
  return (
    <section id="guides" className="bg-[#0d0d0f] py-32">
      <div className="mx-auto max-w-[1200px] px-10">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-[11px] tracking-[0.1em] text-[#c8f542] uppercase mb-4 font-normal">
            Guides &amp; updates
          </p>

          <h2 className="text-[clamp(28px,4vw,44px)] font-light tracking-[-0.03em] leading-[1.15] mb-4">
            Learn the craft. Follow the build.
          </h2>

          <p className="text-base text-[#8d8d95] max-w-[520px] leading-[1.7] font-light">
            Step-by-step guides for getting the most out of every effect, plus
            updates as Ditther grows.
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <motion.a
              key={guide.title}
              href={guide.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-[#161618] transition-colors duration-300 hover:bg-[#1c1c1f]"
            >
              {/* Card image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col px-6 py-5">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-[#8d8d95]">
                  {guide.tag}
                </p>

                <h3 className="mb-3 text-[15px] font-medium leading-[1.4] text-white">
                  {guide.title}
                </h3>

                <p className="text-[13px] leading-[1.65] text-[#6e6e76] font-light">
                  {guide.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
