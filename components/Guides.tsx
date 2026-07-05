"use client";

import Image from "next/image";

export default function Guides() {
  return (
    <section
      id="guides"
      className="relative h-[760px] overflow-hidden bg-[#080808]"
    >
      {/* Images */}

      <div className="absolute inset-0">
        <Image
          src="/images/strip_3.jpg"
          alt=""
          width={620}
          height={620}
          className="
          absolute
          left-[8%]
          top-24
          rounded-[32px]
          shadow-2xl
          animate-floatSlow
          "
        />

        <Image
          src="/images/strip_2.jpg"
          alt=""
          width={620}
          height={620}
          className="
          absolute
          left-[24%]
          top-40
          rounded-[32px]
          shadow-2xl
          animate-floatSlow2
          "
        />

        <Image
          src="/images/strip_4.jpg"
          alt=""
          width={620}
          height={620}
          className="
          absolute
          right-[24%]
          top-16
          rounded-[32px]
          shadow-2xl
          animate-floatSlow3
          "
        />

        <Image
          src="/images/strip_5.jpg"
          alt=""
          width={620}
          height={620}
          className="
          absolute
          right-[8%]
          top-36
          rounded-[32px]
          shadow-2xl
          animate-floatSlow4
          "
        />

        {/* overlay */}

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black" />
      </div>

      {/* Content */}

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#c8f542]">
            Before & After
          </p>

          <h2 className="text-[clamp(52px,7vw,96px)] font-light leading-none tracking-[-0.05em]">
            Your image.
            <br />
            Reimagined.
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-xl leading-9 text-white/65">
            No install. No account. Just drop an image and see what happens.
          </p>
        </div>
      </div>
    </section>
  );
}