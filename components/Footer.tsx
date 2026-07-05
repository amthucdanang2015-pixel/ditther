"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-8 py-6">

        <p className="text-xs leading-6 text-[#7d7d84]">
          © 2026 Ditther · Made by{" "}
          <a
            href="https://blurr.design"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            Aashish
          </a>{" "}
          · Free browser-based dither, halftone &amp; pixel effects tool
        </p>

        <div className="flex items-center gap-5">
          <a
            href="/privacy"
            className="text-xs text-[#7d7d84] transition hover:text-white"
          >
            Privacy
          </a>

          <a
            href="/terms"
            className="text-xs text-[#7d7d84] transition hover:text-white"
          >
            Terms
          </a>
        </div>

      </div>
    </footer>
  );
}