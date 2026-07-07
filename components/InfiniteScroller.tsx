"use client";

import Image from "next/image";

const images = [
  "/images/strip_2.jpg",
  "/images/strip_3.jpg",
  "/images/strip_4.jpg",
  "/images/strip_5.jpg",
  "/images/strip_6.jpg",
  "/images/strip_7.jpg",
  "/images/strip_8.jpg",
  "/images/strip_9.jpg",
];

const items = [...images, ...images];

export default function InfiniteScroller() {
  return (
    <div className="relative mt-32 overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-[#151515] to-transparent" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-[#151515] to-transparent" />

      <div className="marquee flex gap-3">
        {items.map((src, index) => (
          <div
            key={index}
            className="relative h-[240px] w-[420px] flex-shrink-0 overflow-hidden rounded-[28px]"
          >
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
