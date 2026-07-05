"use client";

const faqs = [
  {
    q: "Is Ditther free to use?",
    a: "Yes. Every core editing tool is free forever—no account required. You get all pixel effects, cinematic filters, Shuffle & Remix, animation tools, and 1080p exports. Upgrade to Pro for 4K exports, video support, premium presets, and the complete background library.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Ditther runs entirely in your browser. Open ditther.com, drop in your image, and start editing. No download, no signup, no app store.",
  },
  {
    q: "Are my image uploads private?",
    a: "Yes. Your images and videos are processed locally in your browser and never uploaded to our servers. We can't view, store, or access your media.",
  },
  {
    q: "What is dithering?",
    a: "Dithering is an image processing technique that uses patterns of pixels to simulate colors and gradients beyond a limited palette. It creates a textured, retro aesthetic common in early digital art and print media.",
  },
  {
    q: "What is a halftone effect?",
    a: "Halftone recreates images using a grid of dots of varying sizes — the same technique used in newspapers, comic books, and screen printing. Ditther lets you control dot size, density, and blending in real time.",
  },
  {
    q: "What do I get with Pro?",
    a: "Pro unlocks the complete creative toolkit, including: 4K image and video exports, 500+ backgrounds, Premium Looks, Animation Presets, custom Looks and regular content updates. It's a one-time purchase.",
  },
  {
    q: "Can I use Ditther on mobile?",
    a: "Yes. Ditther is fully responsive and works on mobile browsers. Upload, edit and export directly from your phone.",
  },
  {
    q: "How is Ditther different from Photoshop?",
    a: "Ditther is focused entirely on pixel and dither effects with one-click randomisation. It's browser-based, instant and free to start.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-25 pb-16 lg:pb-25">

        <div className="grid gap-12 lg:gap-28 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT */}

          <div className="lg:sticky lg:top-32 h-fit">

            <p className="mb-8 text-[12px] uppercase tracking-[0.22em] text-white/45">
              FAQ
            </p>
            <h2 className="mb-5 text-[clamp(28px,3vw,40px)] font-light  tracking-[-0.04em]">
              Questions people actually ask
            </h2>
            <p className="mb-14 max-w-[470px] text-[14px] text-[#8d8d95]">
              If something isn&apos;t answered here, reach out on X at{" "}
              <a
                href=""
                target="_blank"
                className="underline underline-offset-4 text-white/70 hover:text-white"
              >
                @blurrhaus
              </a>
              .
            </p>

            <button
              className="
    inline-flex
    cursor-pointer
    rounded-2xl
    border
    border-white/50
    bg-[linear-gradient(180deg,var(--thickglass-from)_0%,var(--thickglass-to)_80%)]
    px-7
    py-3
    text-[14px]
    font-medium
    text-[#0d0d0f]
    tracking-[-0.01em]
    transition-all
    duration-200
    shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.15),0_12px_20px_rgba(0,0,0,0.2)]
    hover:scale-[1.02]
    active:scale-[0.98]
  "
            >
              Try Ditther free →
            </button>

          </div>

          {/* RIGHT */}

          <div>

            {faqs.map((item) => (
              <div
                key={item.q}
                className="border-t border-white/10 py-6"
              >
                <h3 className="mb-5 text-[15px] font-light tracking-[-0.02em]">
                  {item.q}
                </h3>

                <p className="max-w-[760px] text-[14px] text-[#8d8d95]">
                  {item.a}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}