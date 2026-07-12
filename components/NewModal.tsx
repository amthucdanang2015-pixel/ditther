"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const NEWS_MEDIA = [
    { no: 1, name: "⚡️ New 200+ backgrounds added" },
    { no: 2, name: "✨ New Animation System with 10 motion presets", flag: "" },
    { no: 3, name: "🌈 New Duotone mode with custom ink & paper colors", flag: "" },
    { no: 4, name: "⚡️ New LED, Voxel & Lattice pixel effects", flag: "" },
    { no: 5, name: "🎭 New Looks System with 17 built-in Looks", flag: "" },
    { no: 6, name: "🎲 Smarter Remix & Shuffle for consistently better styles", flag: "" },
    { no: 7, name: "🎬 24, 30 & 60 FPS video export options", flag: "" },
    { no: 8, name: "🚀 Faster video rendering with improved export quality", flag: "" },
    { no: 9, name: "🐞 Performance improvements and dozens of bug fixes", flag: "" },
];



function CloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-black/50 border border-white/15 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition cursor-pointer"
            aria-label="Close"
        >
            <X size={14} />
        </button>
    );
}

// ─── Modal 1: Founding Members ───────────────────────────────────────────────

interface FoundingMembersModalProps {
    onClose: () => void;
}

function NewsTxtModal({ onClose }: FoundingMembersModalProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        "/images/strip_2.jpg",
        "/images/strip_3.jpg",
        "/images/strip_4.jpg",
        "/images/strip_5.jpg",
        "/images/strip_6.jpg",
        "/images/strip_7.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative flex flex-row bg-[#141416] rounded-[20px] overflow-y-auto w-full max-w-[840px] max-h-[90vh] shadow-2xl">
            <CloseButton onClick={onClose} />
            <div className="relative basis-[46%] shrink-0 self-stretch overflow-hidden">
                {slides.map((src, i) => (
                    <Image
                        key={src}
                        src={src}
                        alt={`Slide ${i + 1}`}
                        fill
                        className={`object-cover transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
                        priority={i === 0}
                    />
                ))}

                <div className="absolute top-[38px] left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`w-[5px] h-[5px] rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white opacity-100" : "bg-white opacity-40"}`}
                        />
                    ))}
                </div>

                <div className={`absolute top-[32px] left-[32px] z-10
                                        rounded-full border px-3 py-1.5 text-[11px] leading-none cursor-pointer transition-all duration-200
                                        ${"bg-gradient-to-b from-[#4b4b52] to-[#3a3a40] text-white border-white"}`}>
                    <p className="text-[#ffffff] text-[12px]">v0.1.3</p>
                </div>
                <div className="absolute bottom-[32px] left-[32px] z-10">
                    <p className="text-[#ffffff] text-[12px]">The Biggest Ditther Update Yet</p>
                    <p className="text-[#ffffff] font-bold text-[16px]">Animation · Duotone · New Looks · Moods</p>
                    <p className="text-[#9ad013] text-[12px]">ditther-manhnc.vercel.app/ · v0.1.3</p>
                </div>
            </div>

            <div className="p-4">
                <h2 className="text-[22px] font-bold leading-snug text-white mb-2">
                    What's New
                </h2>
                <div className="border-t border-white/8 mt-7" />
                <div className="flex flex-col
                 gap-y-2 mb-2 mt-2">
                    {NEWS_MEDIA.map((m) => (
                        <div
                            key={m.no}
                            className="flex items-center gap-1.5 text-[11px] text-white/75 truncate"
                        >
                            <span className="truncate">{m.name}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white/8 mt-2" />
                <h2 className="text-[10px] text-[#8d8d95] mt-2 leading-snug text-white mb-2">
                    View all updates →
                </h2>
            </div>
        </div>
    );
}


function Backdrop({ onClick }: { onClick: () => void }) {
    return (
        <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClick}
            aria-hidden="true"
        />
    );
}

// ─── Root export ─────────────────────────────────────────────────────────────

export type FoundingModalStep = "members" | "pro" | null;

interface NewsModalProps {
    isActive: Boolean;
    onClose: () => void;
}

export default function NewsModal({ isActive, onClose }: NewsModalProps) {
    // Close on Escape
    useEffect(() => {
        if (!isActive) return;
        const handle = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle);
    }, [isActive, onClose]);

    // Lock body scroll while open
    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <>
            {/* Backdrop — click to close */}
            <Backdrop onClick={onClose} />

            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="pointer-events-auto w-full modal-enter"
                    style={{ maxWidth: 840 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <NewsTxtModal onClose={onClose} />
                </div>
            </div>
        </>
    );
}
