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

    const headerHeight = 80; // Navbar height
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
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <a href="/home" className="text-2xl font-bold text-white">
          <Image
            src="/images/ditther_logo.png"
            alt="Logo"
            width={99}
            height={24}
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-white/75 transition hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105">
          Get Started
        </button>
      </div>
    </motion.header>
  );
}
