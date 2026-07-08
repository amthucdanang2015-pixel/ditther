"use client";

import { useState } from "react";
import Image from "next/image";
import AppNavbar from "./AppNavbar";
import RightSidebar from "./RightSidebar";
import EffectSlider from "./EffectSlider";

export default function Editor() {
    const backgrounds = Array.from(
        { length: 8 },
        (_, i) => `/images/strip_${i + 2}.jpg`,
    );

    const [selectedBg, setSelectedBg] = useState(backgrounds[0]);
    const presets = [
        "Cinematic",
        "Golden Hour",
        "Dusted",
        "Noir",
        "Moonlight",
        "Dreamy",
        "Neon",
    ];

    const [filterGroups, setFilterGroups] = useState([
        {
            title: "Tone",
            filters: [
                { name: "Brightness", value: 85, max: 200, suffix: "%" },
                { name: "Contrast", value: 120, max: 200, suffix: "%" },
                { name: "Saturate", value: 140, max: 200, suffix: "%" },
                { name: "Hue", value: 0, max: 360, suffix: "deg" },
            ],
        },
        {
            title: "Color",
            filters: [
                { name: "Grayscale", value: 0, max: 100, suffix: "%" },
                { name: "Sepia", value: 0, max: 100, suffix: "%" },
                { name: "Invert", value: 0, max: 100, suffix: "%" },
            ],
        },
        {
            title: "Lens",
            filters: [
                { name: "Blur", value: 5, max: 20, suffix: "px" },
                { name: "Glow", value: 10, max: 100, suffix: "" },
                { name: "Opacity", value: 60, max: 100, suffix: "%" },
            ],
        },
        {
            title: "Vignette",
            filters: [
                { name: "Vignette", value: 50, max: 100, suffix: "" },
            ],
        },
        {
            title: "Texture",
            filters: [
                { name: "Noise", value: 0, max: 100, suffix: "" },
                { name: "Grain", value: 0, max: 100, suffix: "" },
            ],
        },
        {
            title: "Distort",
            filters: [
                { name: "Shift", value: 0, max: 100, suffix: "" },
                { name: "Pixelate", value: 0, max: 100, suffix: "" },
            ],
        },
    ]);

    return (
        <div className="fixed inset-0 w-full overflow-hidden overscroll-none bg-[#101011] text-white flex flex-col">
            <AppNavbar />

            <div className="flex flex-1 pt-[60px] overflow-hidden">
                <aside className="w-[340px] bg-[#1b1b1d] rounded-tr-3xl flex flex-col border-r border-white/5 h-full">
                    <div className="border-b border-white/10 p-6">
                        <span className="mb-5 block text-[11px] uppercase tracking-[0.08em] text-zinc-500">
                            Backgrounds
                        </span>

                        <div className="grid grid-cols-5 gap-[6px]">
                            {backgrounds.map((src) => (
                                <button
                                    key={src}
                                    onClick={() => setSelectedBg(src)}
                                    className={`relative aspect-square overflow-hidden rounded-xl transition-all duration-200 hover:scale-[0.96] cursor-pointer`}
                                >
                                    <Image
                                        src={src}
                                        alt=""
                                        fill
                                        sizes="64px"
                                        className="object-cover"
                                    />
                                </button>
                            ))}

                            {/* View All */}

                            <button className="relative aspect-square overflow-hidden rounded-xl bg-zinc-900 group">
                                <Image
                                    src="/images/strip_9.jpg"
                                    alt=""
                                    fill
                                    sizes="64px"
                                    className="object-cover opacity-40"
                                />

                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition group-hover:bg-black/20">
                                    <svg
                                        className="mb-1 h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4 4h16v16H4z" />
                                        <path d="M8 15l2-2 2 2 4-4 2 2" />
                                    </svg>

                                    <span className="text-[11px] font-medium">View all</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Scrollable */}

                    <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-8">
                        {/* FILTERS */}

                        <p className="mb-4 text-[11px] uppercase tracking-[0.08em] text-zinc-500">
                            Filters
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {presets.map((preset) => (
                                <button
                                    key={preset}
                                    className="rounded-full cursor-pointer bg-[#2b2b2f] px-2 py-1 text-[11px] text-[#8d8d95] hover:bg-[#34343a] transition"
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>

                        {/* GROUPS */}

                        <div className="space-y-2">
                            {filterGroups.map((group, groupIndex) => (
                                <div key={group.title}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-[10px] uppercase tracking-[0.15em] text-[#4e4e53]">
                                            {group.title}
                                        </h3>

                                        <span className="text-zinc-500 text-lg">⌃</span>
                                    </div>

                                    {/* Sliders */}
                                    <div className="space-y-2">

                                        {group.filters.map((filter, filterIndex) => (

                                            <EffectSlider
                                                key={filter.name}
                                                label={filter.name}
                                                value={filter.value}
                                                max={filter.max}
                                                suffix={filter.suffix}
                                                onChange={(value) => {

                                                    setFilterGroups(prev => {

                                                        const next = [...prev];

                                                        next[groupIndex] = {
                                                            ...next[groupIndex],
                                                            filters: [...next[groupIndex].filters],
                                                        };

                                                        next[groupIndex].filters[filterIndex] = {
                                                            ...next[groupIndex].filters[filterIndex],
                                                            value,
                                                        };

                                                        return next;
                                                    });

                                                }}
                                            />

                                        ))}

                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className="flex-1 flex flex-col bg-[#141415]">
                    <div className="flex-1 p-5">
                        <div className="h-full rounded-[28px] bg-[#1d1d20] p-8">
                            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-black">
                                <Image src={selectedBg} alt="" fill sizes={"70vw"} className="object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 p-5 pt-0">
                        <button className="flex-1 h-16 rounded-full bg-[#232326] border border-white/10 hover:bg-[#303035] transition">
                            Shuffle
                        </button>

                        <button className="flex-1 h-16 rounded-full bg-[#232326] border border-white/10 hover:bg-[#303035] transition">
                            Remix
                        </button>
                    </div>
                </main>

                {/* ================= RIGHT ================= */}
                <RightSidebar />
                {/* <aside className="w-[340px] bg-[#1b1b1d] rounded-tl-3xl border-l border-white/5">
                    <div className="h-full overflow-y-auto p-5 space-y-4">
                        {Array.from({ length: 35 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl bg-[#28282d] h-16 flex items-center justify-center text-zinc-400"
                            >
                                Control {i + 1}
                            </div>
                        ))}
                    </div>
                </aside> */}
            </div>
        </div>
    );
}
