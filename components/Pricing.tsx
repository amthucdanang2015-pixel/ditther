"use client";

const freeFeatures = [
  "All 8 Pixel Effects with full controls",
  "Complete Duotone System",
  "Full Pixel Animation System",
  "9 Look Presets + 2 Animation Presets",
  "Unlimited Shuffle & Remix",
  "Crop and Aspect Ratio controls",
  "Export up to 1080p video",
  "100+ built-in backgrounds",
];

const proFeatures = [
  "Everything in Free +",
  "500+ premium backgrounds",
  "All 21 Premium Look Presets",
  "All 10 Animation Presets",
  "4K image & video exports",
  "Smooth 60 FPS video exports",
  "Save custom Looks across sessions",
  "Weekly background drops",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#0d0d0f] py-32">
      <div className="mx-auto max-w-[1200px] px-10">
        {/* Heading */}
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 text-[11px] font-normal uppercase tracking-[0.1em] text-[#c8f542]">
            Pricing
          </p>

          <h2 className="mb-4 text-[clamp(28px,4vw,44px)] font-light leading-[1.15] tracking-[-0.03em]">
            Free to start. Pro when you&apos;re ready.
          </h2>

          <p className="max-w-[520px] text-base font-light leading-[1.7] text-[#8d8d95]">
            Every core tool is free forever. Go Pro for higher-quality exports,
            premium presets, and the complete creative toolkit.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* FREE */}
          <PricingCard
            badge="Free"
            price="$0"
            description="Create moving pixel art with every core effect, looks, duotone, animation tool, and unlimited Shuffle & Remix. FREE forever. No account required."
            features={freeFeatures}
            button="Start for free"
          />

          {/* PRO */}
          <PricingCard
            badge="Pro"
            price="$29"
            oldPrice="$39"
            subtitle="(One-time purchase)"
            description="For creators who want it all. Premium presets, 4K exports, every background pack, and future content updates. One-time purchase."
            features={proFeatures}
            button="Upgrade to Pro"
            pro
          />
        </div>
      </div>
    </section>
  );
}

type PricingCardProps = {
  badge: string;
  price: string;
  oldPrice?: string;
  subtitle?: string;
  description: string;
  features: string[];
  button: string;
  pro?: boolean;
};

function PricingCard({
  badge,
  price,
  oldPrice,
  subtitle,
  description,
  features,
  button,
  pro,
}: PricingCardProps) {
  return (
    <div className="flex min-h-[760px] flex-col rounded-[34px] border border-white/10 bg-gradient-to-b from-[#2a2a2c] to-[#1b1b1d] p-12 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
      <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/40">
        {badge}
      </p>

      <div className="mb-8 flex flex-wrap items-end gap-3">
        <span className="text-[48px] font-light leading-none">{price}</span>

        {oldPrice && (
          <>
            <span className="pb-2 text-3xl text-white/35 line-through">
              {oldPrice}
            </span>

            <span className="pb-2 text-[14px] text-white/45">
              {subtitle}
            </span>
          </>
        )}
      </div>

      <p className="mb-10 text-[14px] leading-6 text-[#8d8d95]">
        {description}
      </p>

      <ul className="space-y-1">
        {features.map((item) => (
          <li
            key={item}
            className="flex items-start gap-4 text-[14px] text-white/75"
          >
            <span
              className={`mt-[11px] h-2 w-2 rounded-full ${
                pro ? "bg-[#c8f542]" : "bg-white/20"
              }`}
            />

            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-14">
        <button
          className={`w-full rounded-full py-5 text-lg font-medium transition-all duration-300 ${
            pro
              ? "bg-white text-black hover:brightness-95"
              : "border border-white/10 bg-gradient-to-b from-[#3a3a3c] to-[#262628] text-white hover:bg-[#3a3a3c]"
          }`}
        >
          {button}
        </button>
      </div>
    </div>
  );
}