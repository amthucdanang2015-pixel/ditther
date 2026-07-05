"use client";

import { images, imageCount } from "@/data/gallery";

type Props = {
  current: number;
  onChange: (index: number) => void;
};

export default function GalleryControls({
  current,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap justify-end gap-2 max-w-[320px]">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`rounded-full px-3 py-1 text-xs transition cursor-pointer ${current === index
            ? "bg-white text-black"
            : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          {imageCount[index]}
        </button>
      ))}
    </div>
  );
}