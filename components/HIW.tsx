"use client";

import StepCard from "./StepCard";
import InfiniteScroller from "./InfiniteScroller";

const steps = [
  {
    number: "01",
    title: "Drop any image or video",
    description:
      "Drag in a photo, paste a URL, or pick one of the built-in backgrounds. JPG, PNG, WebP and video all work.",
    video: "https://res.cloudinary.com/dpmczirwo/video/upload/v1783174985/video1_qxwx1w.mp4",
  },
  {
    number: "02",
    title: "Hit Shuffle or Remix",
    description:
      "One click randomises your effect, filters and background. Keep clicking until you love the result.",
    video: "https://res.cloudinary.com/dpmczirwo/video/upload/v1783174985/video2_b6syus.mp4",
  },
  {
    number: "03",
    title: "Save your look",
    description:
      "Export in standard or 4K resolution. Save presets and reuse them later.",
    video: "https://res.cloudinary.com/dpmczirwo/video/upload/v1783174985/video3_e9ioir.mp4",
  },
];

export default function HIW() {
  return (
    <section id="hiw" className="bg-[#0d0d0f] py-28 overflow-hidden">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-20 max-w-3xl">
          <p className="text-[11px] tracking-[0.1em] uppercase mb-4 font-normal text-[#c8f542]">
            How it works
          </p>

          <h2 className="text-[clamp(28px,4vw,44px)] font-light tracking-[-0.03em] leading-[1.15] mb-4">
            Three steps. Zero friction.
          </h2>
          <p className="text-base text-[#8d8d95] max-w-[520px] leading-[1.7] font-light">
            Ditther is built around speed and serendipity. You don&apos;t need
            to know what you want — the tool finds it for you.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>

      <InfiniteScroller />
    </section>
  );
}