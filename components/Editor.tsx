"use client";

import { useState } from "react";
import Image from "next/image";
import AppNavbar from "./AppNavbar";
import RightSidebar from "./RightSidebar";
import EffectSlider from "./EffectSlider";
import PixelCanvas from "./PixelCanvas";
import CompareSlider from "./CompareSlider";
import CropOverlay from "./CropOverlay";
import { Shuffle, Sparkles } from 'lucide-react';

export default function Editor() {
    const backgrounds = Array.from(
        { length: 8 },
        (_, i) => `/images/free_${i + 2}.jpg`,
    );

    const [selectedBg, setSelectedBg] = useState(backgrounds[0]);
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
    const [selectedPixelEffect, setSelectedPixelEffect] = useState<string | null>(null);
    const [compareMode, setCompareMode] = useState(false);
    const [cropMode, setCropMode] = useState(false);
    const [pixelEffectSettings, setPixelEffectSettings] = useState({
        size: 70,
        fill: 100,
        density: 8,
        exposure: 110,
        scatter: 0,
        opacity: 100,
        blending: 50,
    });

    const presets = [
        "Cinematic",
        "Golden Hour",
        "Dusted",
        "Noir",
        "Moonlight",
        "Dreamy",
        "Neon",
    ];
    const presetStyles: Record<string, string> = {
        Cinematic:
            "brightness(0.9) contrast(1.25) saturate(1.2)",

        "Golden Hour":
            "brightness(1.05) contrast(1.05) saturate(1.4) sepia(0.2) hue-rotate(-10deg)",

        Dusted:
            "brightness(1.05) contrast(.9) saturate(.7)",

        Noir:
            "grayscale(1) contrast(1.4)",

        Moonlight:
            "brightness(.85) saturate(.7) hue-rotate(190deg)",

        Dreamy:
            "brightness(1.1) saturate(1.2) blur(.5px)",

        Neon:
            "contrast(1.4) saturate(2) hue-rotate(15deg)",
    };

    const pixelEffectStyles: Record<string, string> = {
        Dither: "contrast(1.2) grayscale(0.5)",
        ASCII: "contrast(1.5) grayscale(1) sepia(1)",
        Halftone: "contrast(2) grayscale(1)",
        Dot: "blur(2px) contrast(3)",
        LEGO: "blur(1px) contrast(2) saturate(2)",
        Voxel: "saturate(1.5) blur(1px)",
        LED: "brightness(1.5) saturate(2) hue-rotate(90deg)",
        Lattice: "contrast(1.5) drop-shadow(2px 4px 6px black)"
    };

    // const [filterGroups, setFilterGroups] = useState([
    //     {
    //         title: "Tone",
    //         filters: [
    //             { key: "brightness", name: "Brightness", value: 100, max: 200, suffix: "%" },
    //             { key: "contrast", name: "Contrast", value: 100, max: 200, suffix: "%" },
    //             { key: "saturate", name: "Saturate", value: 100, max: 300, suffix: "%" },
    //             { key: "hue", name: "Hue", value: 0, max: 360, suffix: "deg" },
    //         ],
    //     },

    //     {
    //         title: "Color",
    //         filters: [
    //             { key: "grayscale", name: "Grayscale", value: 0, max: 100, suffix: "%" },
    //             { key: "sepia", name: "Sepia", value: 0, max: 100, suffix: "%" },
    //             { key: "invert", name: "Invert", value: 0, max: 100, suffix: "%" },
    //         ],
    //     },

    //     {
    //         title: "Lens",
    //         filters: [
    //             { key: "blur", name: "Blur", value: 0, max: 20, suffix: "px" },
    //             { key: "opacity", name: "Opacity", value: 100, max: 100, suffix: "%" },
    //         ],
    //     }
    // ]);

    const defaultFilterGroups = [
        {
            title: "Tone",
            filters: [
                { key: "brightness", name: "Brightness", value: 100, max: 200, suffix: "%" },
                { key: "contrast", name: "Contrast", value: 100, max: 200, suffix: "%" },
                { key: "saturate", name: "Saturate", value: 100, max: 300, suffix: "%" },
                { key: "hue", name: "Hue", value: 0, max: 360, suffix: "deg" },
            ],
        },
        {
            title: "Color",
            filters: [
                { key: "grayscale", name: "Grayscale", value: 0, max: 100, suffix: "%" },
                { key: "sepia", name: "Sepia", value: 0, max: 100, suffix: "%" },
                { key: "invert", name: "Invert", value: 0, max: 100, suffix: "%" },
            ],
        },
        {
            title: "Lens",
            filters: [
                { key: "blur", name: "Blur", value: 0, max: 20, suffix: "px" },
                { key: "opacity", name: "Opacity", value: 100, max: 100, suffix: "%" },
            ],
        },
    ];

    const [filterGroups, setFilterGroups] = useState(defaultFilterGroups);

    const updateFilter = (
        groupTitle: string,
        key: string,
        value: number
    ) => {

        setFilterGroups(prev =>
            prev.map(group =>
                group.title !== groupTitle
                    ? group
                    : {
                        ...group,
                        filters: group.filters.map(filter =>
                            filter.key === key
                                ? { ...filter, value }
                                : filter
                        ),
                    }
            )
        );

    };
    const handleReset = () => {
        // setSelectedBg(backgrounds[0]);
        setSelectedPreset(null);
        setCompareMode(false);
        setFilterGroups(defaultFilterGroups);
        setSelectedPixelEffect(null);
        setPixelEffectSettings({
            size: 70,
            fill: 100,
            density: 8,
            exposure: 110,
            scatter: 0,
            opacity: 100,
            blending: 50,
        });
    };

    const handleImageUpload = (url: string) => {
        setSelectedBg(url);
    };

    const handleCropApply = (croppedUrl: string) => {
        setSelectedBg(croppedUrl);
        setCropMode(false);
    };

    // Shuffle — pick a random background, never the same one twice in a row
    const handleShuffle = () => {
        const others = backgrounds.filter(b => b !== selectedBg);
        const pool = others.length > 0 ? others : backgrounds;
        setSelectedBg(pool[Math.floor(Math.random() * pool.length)]);
    };

    // Remix — randomise preset + pixel effect + all sliders for a surprise look
    const handleRemix = () => {
        const pixelEffects = ["Dither", "ASCII", "Halftone", "Dot", "LEGO", "Voxel", "LED", "Lattice"];
        const rand = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);
        const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

        setSelectedPreset(pick([...presets, null as unknown as string]));
        setSelectedPixelEffect(pick([...pixelEffects, null as unknown as string]));
        setPixelEffectSettings({
            size:     rand(20, 120),
            fill:     rand(40, 100),
            density:  rand(2, 18),
            exposure: rand(70, 140),
            scatter:  rand(0, 80),
            opacity:  rand(60, 100),
            blending: rand(20, 100),
        });
    };
    const cssFilter = filterGroups
        .flatMap(group => group.filters)
        .map(f => {

            switch (f.key) {

                case "brightness":
                    return `brightness(${f.value}%)`;

                case "contrast":
                    return `contrast(${f.value}%)`;

                case "saturate":
                    return `saturate(${f.value}%)`;

                case "hue":
                    return `hue-rotate(${f.value}deg)`;

                case "grayscale":
                    return `grayscale(${f.value}%)`;

                case "sepia":
                    return `sepia(${f.value}%)`;

                case "invert":
                    return `invert(${f.value}%)`;

                case "blur":
                    return `blur(${f.value}px)`;

                case "opacity":
                    return `opacity(${f.value}%)`;

                default:
                    return "";
            }

        })
        .join(" ");

    const presetFilter = selectedPreset ? presetStyles[selectedPreset] : "";
    const pixelEffectBaseFilter = selectedPixelEffect ? (pixelEffectStyles[selectedPixelEffect] || "") : "";
    const dynamicEffectFilter = selectedPixelEffect
        ? `brightness(${pixelEffectSettings.exposure}%) opacity(${pixelEffectSettings.opacity}%) blur(${pixelEffectSettings.size / 20}px) contrast(${100 + pixelEffectSettings.fill / 2}%)`
        : "";
    const pixelFilter = `${pixelEffectBaseFilter} ${dynamicEffectFilter}`.trim();

    return (
        <div className="fixed inset-0 w-full overflow-hidden overscroll-none bg-[#101011] text-white flex flex-col">
            <AppNavbar
                handleReset={handleReset}
                onImageUpload={handleImageUpload}
                compareMode={compareMode}
                onCompare={() => setCompareMode(v => !v)}
                cropMode={cropMode}
                onCrop={() => { setCropMode(v => !v); setCompareMode(false); }}
            />

            <div className="flex flex-col md:flex-row flex-1 pt-[60px] pb-[70px] md:pb-0 overflow-y-auto md:overflow-hidden">
                {/*Left-Side*/}
                <aside className="hidden md:flex w-[340px] shrink-0 bg-[#1b1b1d] rounded-tr-3xl flex-col border-r border-white/5 h-full">
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

                        <p className="mb-2 mt-2 text-[11px] uppercase tracking-[0.08em] text-zinc-500">
                            Filters
                        </p>

                        <div className="flex flex-wrap gap-2 mb-1">
                            {presets.map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => { setSelectedPreset(preset) }}
                                    className={`
                                        rounded-full border px-3 py-1.5 text-[11px] leading-none cursor-pointer transition-all duration-200
                                        ${selectedPreset === preset
                                            ? "bg-gradient-to-b from-[#4b4b52] to-[#3a3a40] text-white border-white"
                                            : "bg-[#2b2b2f] text-[#8d8d95] border-[#3a3a40] hover:bg-[#34343a]"
                                        }
    `}                                >
                                    {preset}
                                </button>
                            ))}
                        </div>

                        {/* GROUPS */}

                        <div className="space-y-2">
                            {filterGroups.map(group => (

                                <div key={group.title} className="space-y-4">

                                    <div className="flex justify-between mb-2">

                                        <h3 className="uppercase text-xs tracking-widest text-zinc-500">
                                            {group.title}
                                        </h3>

                                    </div>

                                    {group.filters.map(filter => (

                                        <EffectSlider
                                            key={filter.key}
                                            label={filter.name}
                                            value={filter.value}
                                            max={filter.max}
                                            suffix={filter.suffix}
                                            onChange={(v) =>
                                                updateFilter(group.title, filter.key, v)
                                            }
                                        />

                                    ))}

                                </div>

                            ))}
                        </div>
                    </div>
                </aside>

                <main className="flex-none h-[55vh] md:h-auto md:flex-1 flex flex-col bg-[#141415]">
                    <div className="flex-1 p-5">
                        <div className="h-full rounded-[28px] bg-[#1d1d20] p-8">
                            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-black">
                                {cropMode ? (
                                    <CropOverlay
                                        src={selectedBg}
                                        onApply={handleCropApply}
                                        onCancel={() => setCropMode(false)}
                                    />
                                ) : compareMode ? (
                                    <CompareSlider
                                        src={selectedBg}
                                        effect={selectedPixelEffect}
                                        settings={pixelEffectSettings}
                                        presetFilter={`${presetFilter} ${cssFilter}`.trim()}
                                    />
                                ) : (
                                    <PixelCanvas
                                        src={selectedBg}
                                        effect={selectedPixelEffect}
                                        settings={pixelEffectSettings}
                                        presetFilter={`${presetFilter} ${cssFilter}`.trim()}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 p-5 pt-0">
                        <button
                            onClick={handleShuffle}
                            className="flex-1 h-16 rounded-full bg-[#232326] border border-white/10 hover:bg-[#303035] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer">
                            <Shuffle size={20} />
                            Shuffle
                        </button>

                        <button
                            onClick={handleRemix}
                            className="flex-1 h-16 rounded-full bg-[#232326] border border-white/10 hover:bg-[#303035] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer">
                            <Sparkles size={20} />
                            Remix
                        </button>
                    </div>
                </main>
                <RightSidebar
                    selectedPixelEffect={selectedPixelEffect}
                    setSelectedPixelEffect={setSelectedPixelEffect}
                    pixelEffectSettings={pixelEffectSettings}
                    setPixelEffectSettings={setPixelEffectSettings}
                />
            </div>
        </div>
    );
}
