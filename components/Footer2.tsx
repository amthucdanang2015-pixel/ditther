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

const legalLinks = [
    "Privacy Policy",
    "Terms of Service",
    "Contact",
];

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#090909]" style={{ padding: "80px 120px" }}>
            <div className="mx-auto flex max-w-[1600px] flex-wrap justify-between gap-16">
                <div className="max-w-[520px] pr-30">
                    <Link href="/" className="inline-flex items-center">
                        <Image
                            src="/images/ditther_logo.png"
                            alt="Ditther"
                            width={160}
                            height={45}
                            className="w-auto"
                        />
                    </Link>

                    <p className="mt-4 mb-6 text-[15px] line-clamp-2 text-white">
                        Free dither, halftone, ASCII and pixel effects tool.
                        Browser-based, no install needed.
                    </p>

                    <div className="flex flex-row gap-4">

                        <a
                            href="https://x.com/blurrhaus"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            className="inline-flex items-center gap-[7px] rounded-full border border-[var(--border)] px-[14px] py-[7px] text-[13px] text-[var(--text2)] no-underline transition-all duration-300"
                        >
                            <X size={17} />
                            @blurrhaus
                        </a>

                        <a
                            href="https://blurr.design"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            className="inline-flex items-center gap-[7px] rounded-full border border-[var(--border)]  px-[14px] py-[7px] text-[13px] text-[var(--text2)] no-underline transition-all duration-300"
                        >
                            <Globe size={17} />
                            blurr.design
                        </a>

                    </div>

                </div>

                {/* Columns */}

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
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-10 py-6 xl:px-20">

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
        <div className="pb-20">

            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
                {title}
            </h4>

            <div className="flex flex-col gap-3 text-[13px]">
                {Array.isArray(children)
                    ? children.map((child, i) => (
                        <div
                            key={i}
                            className="text-white/30 transition"
                        >
                            {child}
                        </div>
                    ))
                    : children}
            </div>

        </div>
    );
}