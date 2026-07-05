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
    <section id="pricing" className="bg-[#0d0d0f] py-32 max-[800px]:px-[20px]">
      <div className="mx-auto max-w-[1200px]">
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
        <div className="grid gap-6 lg:grid-cols-2">
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
    <div
      style={{
        background:
          "linear-gradient(180deg, var(--glass-from) 0%, rgba(255,255,255,0.01) 100%)",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
      className="
    flex
    flex-col
    px-10
    py-12
    rounded-[34px]
    border
    backdrop-blur-[var(--glass-blur)]
    transition-[border-color,box-shadow]
    duration-300
    shadow-[0_4px_32px_rgba(0,0,0,0.3),inset_0_1px_0_var(--shadow-inset-top)]
  "
    >
      <p className="mb-6 text-[12px] uppercase tracking-[0.1em] text-white/40">
        {badge}
      </p>
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <span className="text-[48px] font-light leading-none">{price}</span>

        {oldPrice && (
          <>
            <span className=" text-3xl text-white/35 line-through">
              {oldPrice}
            </span>

            <span className=" text-[14px] text-white/45">{subtitle}</span>
          </>
        )}
      </div>
      <p className="mb-9 text-[14px] leading-6 text-[#8d8d95]">
        {description}
      </p>
      <ul className="space-y-1">
        {features.map((item) => (
          <li
            key={item}
            className="flex items-center gap-4 mt-3 text-[14px]"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${pro ? "bg-[#c8f542]" : "bg-white/20"
                }`}
            />
            <span className={`${pro ? "text-[#ffffff]" : "text-[#8d8d95]"}`}>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-14">
        {!pro && (<button
          style={{
            background:
              !pro ? "linear-gradient(180deg, var(--glass-from) 0%, var(--glass-to) 80%)" : "linear-gradient(180deg, var(--thickglass-from) 0%, var(--thickglass-to) 80%)",
            boxShadow:
              "inset 0 1px 0 var(--shadow-inset-top), 0 4px 16px rgba(0,0,0,.2)",
            borderColor: "rgba(255, 255, 255, 0.174)"
          }}
          className="
            w-full
            rounded-full
            border
            cursor-pointer
            py-[13px] px-6
            font-[14px]
            text-[var(--text2)]
            transition-all
            duration-300
            hover:text-white
          "
        >
          {button}
        </button>) || <button
          style={{
            background:
              !pro ? "linear-gradient(180deg, var(--glass-from) 0%, var(--glass-to) 80%)" : "linear-gradient(180deg, var(--thickglass-from) 0%, var(--thickglass-to) 80%)",
            boxShadow:
              "inset 0 1px 0 var(--shadow-inset-top), 0 4px 16px rgba(0,0,0,.2)",
            borderColor: "rgba(255, 255, 255, 0.174)"
          }}
          className="
            w-full
            rounded-full
            border
            cursor-pointer
            py-[13px] px-6
            font-[14px]
            text-[#0d0d0f]
            transition-all
            duration-300
          "
        >
            {button}
          </button>}

      </div>
    </div>
  );
}