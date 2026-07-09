"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, X } from "lucide-react";

const toolLinks = [
  { name: "Open App", href: "#" },
  { name: "Effects", href: "#effects" },
  { name: "Pricing", href: "#pricing" },
  { name: "How it works", href: "#hiw" },
  { name: "FAQ", href: "#faq" },
];

const effectLinks = [
  "Dither Effect",
  "Halftone Generator",
  "ASCII Art Converter",
  "Bayer Matrix Dither",
  "Lego Pixel Effect",
];

const guideLinks = [
  "Halftone effect guide",
  "ASCII art guide",
  "What's new in v1.3",
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Contact"];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090909] px-5 sm:px-10 lg:px-[80px] py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:gap-16 lg:grid-cols-[1fr_auto_auto_auto_auto]">
        <div className="max-w-[520px] lg:pr-30">
          <Link href="/" className="inline-flex h-[28px] w-auto items-center">
            <Image
              src="/images/ditther_logo.png"
              alt="Ditther"
              width={116}
              height={28}
              className="w-auto"
            />
          </Link>

          <p className="mt-4 mb-6 text-[15px] text-white">
            Free dither, halftone, ASCII and pixel effects tool. Browser-based,
            no install needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="https://x.com/blurrhaus"
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
              className="inline-flex items-center gap-[7px] rounded-full border border-[var(--border)] px-[14px] py-[7px] text-[13px] text-[var(--text2)] no-underline transition-all duration-300"
            >
              <X size={17} />
              @blurrhaus
            </a>

            <a
              href="https://blurr.design"
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
              className="inline-flex items-center gap-[7px] rounded-full border border-[var(--border)] px-[14px] py-[7px] text-[13px] text-[var(--text2)] no-underline transition-all duration-300"
            >
              <Globe size={17} />
              blurr.design
            </a>
          </div>
        </div>

        {/* Columns — wrap in a sub-grid so they go 2-col on mobile */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-6 lg:contents">
          <FooterColumn title="Tool">
            {toolLinks.map((item) => (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Effects">
            {effectLinks.map((item) => (
              <a key={item} href="#">
                {item}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Guides">
            {guideLinks.map((item) => (
              <a key={item} href="#">
                {item}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Legal">
            {legalLinks.map((item) => (
              <a key={item} href="#">
                {item}
              </a>
            ))}
          </FooterColumn>
        </div>
      </div>
      <div className="border-t border-white/10 mt-10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-0 py-6">
          <p className="text-[12px] text-white/35">
            © 2026 Ditther · Made by{" "}
            <a
              href="https://blurr.design"
              target="_blank"
              className="hover:text-white transition"
            >
              Aashish
            </a>{" "}
            · Free browser-based dither, halftone &amp; pixel effects tool
          </p>

          <div className="flex gap-8">
            <a
              href="#"
              className="text-[12px] text-white/35 transition hover:text-white"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-[12px] text-white/35 transition hover:text-white"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

type Props = {
  title: string;
  children: React.ReactNode;
};

function FooterColumn({ title, children }: Props) {
  return (
    <div className="pb-6 lg:pb-20">
      <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
        {title}
      </h4>

      <div className="flex flex-col gap-3 text-[13px]">
        {Array.isArray(children)
          ? children.map((child, i) => (
            <div key={i} className="text-white/30 transition">
              {child}
            </div>
          ))
          : children}
      </div>
    </div>
  );
}
