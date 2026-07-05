"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";

const sections = [
  { id: "effects", label: "Effects" },
  { id: "hiw", label: "How it works" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "guides", label: "Guides" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    const headerHeight = 60; // Navbar height
    const target =
      element.getBoundingClientRect().top + window.scrollY - headerHeight;

    const start = window.scrollY;
    const distance = target - start;
    const duration = 1200; // 1.2 seconds

    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo({
        top: start + distance * easeInOutCubic(progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: "14px 120px",
        boxShadow: "0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.4)",
      }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between bg-[rgba(13,13,15,0.55)] backdrop-blur-[12px]"
    >
      <a
        href="/"
        className="flex items-center gap-1.5 text-white no-underline select-none"
        style={{ letterSpacing: "-0.03em" }}
      >
        <Image
          src="/images/ditther_logo.png"
          alt="Ditther"
          width={99}
          height={24}
          className="h-6 w-auto"
          style={{ mixBlendMode: "lighten" }}
        />
      </a>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-7">
        {sections.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-sm text-[#8d8d95] transition-colors duration-200 hover:text-white cursor-pointer bg-transparent border-none"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* CTA */}
      <button
        className="rounded-full text-[13px] font-normal text-white cursor-pointer transition-all duration-200 hover:opacity-90"
        style={{
          padding: "7px 18px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.115) 0%, rgba(255,255,255,0.03) 80%)",
          border: "1px solid rgba(255,255,255,0.174)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.272), inset 0 -1px 0 rgba(0,0,0,0.407), 0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        Open app →
      </button>
    </motion.header>
  );
}
