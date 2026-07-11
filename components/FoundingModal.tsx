"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const FOUNDING_MEMBERS = [
    { no: 1, name: "Dela K.", flag: "🇬🇧" },
    { no: 2, name: "Zhang C.", flag: "🇯🇵" },
    { no: 3, name: "Rahul S.", flag: "🇮🇳" },
    { no: 4, name: "Jon C.", flag: "🇺🇸" },
    { no: 5, name: "Wei", flag: "🇨🇳" },
    { no: 6, name: "Fryderyk D.", flag: "🇿🇦" },
    { no: 7, name: "Skyler B.", flag: "🇺🇸" },
    { no: 8, name: "Martin K.", flag: "🇳🇴" },
    { no: 9, name: "Grisha S.", flag: "🇺🇸" },
    { no: 10, name: "Kantor L.", flag: "🇩🇪" },
    { no: 11, name: "Jatin S.", flag: "🇮🇳" },
    { no: 12, name: "Gokul K.", flag: "🇮🇳" },
    { no: 13, name: "Kenneth N.", flag: "🇳🇴" },
    { no: 14, name: "Libra A.", flag: "🇺🇸" },
    { no: 15, name: "Nawaf A.", flag: "🇸🇦" },
    { no: 16, name: "Amour S.", flag: "🇨🇦" },
    { no: 17, name: "Deborah B.", flag: "🇦🇺" },
    { no: 18, name: "Neosaipien A.", flag: "🇨🇦" },
    { no: 19, name: "Bastien S.", flag: "🇫🇷" },
    { no: 20, name: "Rahul B.", flag: "🇮🇳" },
    { no: 21, name: "Amy H.", flag: "🇬🇧" },
    { no: 22, name: "Vinesh M.", flag: "🇮🇳" },
    { no: 23, name: "Ava E.", flag: "🇺🇸" },
    { no: 24, name: "Nicolas B.", flag: "🇧🇪" },
    { no: 25, name: "Ivan K.", flag: "🇷🇺" },
    { no: 26, name: "Yashwanth K.", flag: "🇺🇸" },
    { no: 27, name: "Sayed E.", flag: "🇪🇬" },
    { no: 28, name: "Choong K.", flag: "🇨🇦" },
    { no: 29, name: "Flycatcher D.", flag: "🇺🇸" },
    { no: 30, name: "Mikołaj J.", flag: "🇵🇱" },
    { no: 31, name: "Arpit S.", flag: "🇭🇰" },
    { no: 32, name: "Martin M.", flag: "🇨🇿" },
    { no: 33, name: "Zima", flag: "🇺🇸" },
    { no: 34, name: "Anh Thư T.", flag: "🇻🇳" },
    { no: 35, name: "Justin M.", flag: "🇺🇸" },
    { no: 36, name: "Hew Ye Z.", flag: "🇸🇬" },
    { no: 37, name: "Christopherr M.", flag: "🇨🇦" },
    { no: 38, name: "Nicholas S.", flag: "🇺🇸" },
    { no: 39, name: "Merlapaka H.", flag: "🇮🇳" },
    { no: 40, name: "Mihir B.", flag: "🇮🇳" },
];

const FEATURES = [
    "500+ premium backgrounds",
    "All 21 Looks unlocked",
    "4K Image & Video Exports",
    "All 10 Animation Presets",
    "Save your own custom Looks",
    "60 FPS Video exports",
];

const PRICING_TIERS = [
    {
        label: "LAUNCH PRICE",
        sub: "First 25 Members only",
        price: "$19",
        original: null,
        progress: 100,
        status: "Sold out (All 25 Spots)",
        soldOut: true,
        current: false,
    },
    {
        label: "NEXT 15 PRICE",
        sub: "Next 15 Members (26–40)",
        price: "$29",
        original: null,
        progress: 100,
        status: "Sold out (All 15 Spots)",
        soldOut: true,
        current: false,
    },
    {
        label: "CURRENT PRICE",
        sub: "Final 10 Members (41–50)",
        price: "$39",
        original: "$79",
        progress: 10,
        status: "Only 9 spots left",
        soldOut: false,
        current: true,
    },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

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
    onBecomeMember: () => void;
}

function FoundingMembersModal({ onClose, onBecomeMember }: FoundingMembersModalProps) {
    return (
        <div className="relative flex flex-col bg-[#141416] rounded-[20px] overflow-y-auto w-full max-w-[640px] max-h-[90vh] shadow-2xl">
            <CloseButton onClick={onClose} />

            {/* Hero Image */}
            <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
                <Image
                    src="/images/founding_hero.png"
                    alt="Founding Members"
                    fill
                    className="object-cover"
                    sizes="640px"
                    priority
                />
                {/* subtle bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141416] to-transparent" />
            </div>

            {/* Body — scrollable */}
            <div className="p-4">
                {/* Eyebrow */}
                <span className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9ad013] mb-2">
                    The First 50 Founding Members
                </span>

                {/* Headline */}
                <h2 className="text-[22px] font-bold leading-snug text-white mb-2">
                    Every great product starts with a few believers.
                </h2>

                {/* Subtext */}
                <p className="text-[13px] text-white/50 leading-relaxed mb-6">
                    A few people believed in Ditther when it was just an idea in a browser tab. Here's who they are.
                </p>

                {/* Divider */}
                <div className="border-t border-white/8 mb-5" />

                {/* Members grid — 5 columns */}
                <div className="grid grid-cols-5 gap-x-2 gap-y-2 mb-7">
                    {FOUNDING_MEMBERS.map((m) => (
                        <div
                            key={m.no}
                            className="flex items-center gap-1.5 text-[11px] text-white/75 truncate"
                        >
                            <span className="text-white/35 font-mono shrink-0">#{m.no}</span>
                            <span className="truncate">{m.name} {m.flag}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <button
                    onClick={onBecomeMember}
                    className="w-full h-12 rounded-full bg-gradient-to-b from-[#e8e8e8] to-[#bdbdbd] text-black text-[14px] font-semibold hover:brightness-105 active:scale-[0.98] transition cursor-pointer shadow-lg mb-4"
                >
                    Become Founding Member #42
                </button>

                {/* Opt-out */}
                <p className="text-center text-[11px] text-white/30 leading-relaxed">
                    Don't want your name here? Email{" "}
                    <a
                        href="https://x.com/blurrhaus"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 underline underline-offset-2 hover:text-white/70 transition"
                    >
                        @blurrhaus
                    </a>{" "}
                    and it'll be removed.
                </p>
            </div>
        </div>
    );
}

// ─── Modal 2: Pro Upgrade ─────────────────────────────────────────────────────

interface ProModalProps {
    onClose: () => void;
}

function ProModal({ onClose }: ProModalProps) {
    return (
        <div className="relative flex flex-col bg-[#141416] rounded-[20px] overflow-hidden w-full max-w-[580px] max-h-[90vh] shadow-2xl">
            <CloseButton onClick={onClose} />

            {/* Hero */}
            <div className="relative w-full aspect-[16/9] shrink-0 overflow-hidden">
                <Image
                    src="/images/pro_hero.png"
                    alt="Ditther Pro"
                    fill
                    className="object-cover"
                    sizes="580px"
                    priority
                />
                {/* dark overlay so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* PRO badge + hero text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pb-4">
                    <span className="mb-3 inline-flex items-center rounded-full bg-white/15 border border-white/20 backdrop-blur-sm px-3 py-0.5 text-[11px] font-bold tracking-wider text-white">
                        PRO
                    </span>
                    <h2 className="text-[26px] font-bold text-white leading-tight drop-shadow-lg">
                        Lifetime Access. One Payment.
                    </h2>
                    <p className="mt-2 text-[13px] text-white/65 max-w-[360px] leading-relaxed">
                        Become one of the first 50 Founding Members and lock in lowest ever lifetime pricing forever.
                    </p>
                </div>
            </div>

            {/* Body — scrollable */}
            <div className="overflow-y-auto no-scrollbar px-6 pb-6">
                {/* Features 2-col grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 py-5">
                    {FEATURES.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-[12px] text-white/75">
                            <CheckCircle2 size={14} className="text-[#9ad013] shrink-0" />
                            {f}
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/8 mb-5" />

                {/* Pricing tiers */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                    {PRICING_TIERS.map((tier) => (
                        <div
                            key={tier.label}
                            className={`rounded-2xl p-3 flex flex-col gap-1.5 border transition ${tier.current
                                ? "bg-[#1f2118] border-[#9ad013]/30"
                                : "bg-[#1a1a1c] border-white/8"
                                }`}
                        >
                            <span className={`text-[9px] font-bold tracking-widest ${tier.current ? "text-white" : "text-white/40"}`}>
                                {tier.label}
                            </span>
                            <span className="text-[10px] text-white/35">{tier.sub}</span>

                            <div className="flex items-baseline gap-1.5 mt-0.5">
                                <span className={`text-[22px] font-bold leading-none ${tier.soldOut ? "text-white/30 line-through" : "text-white"}`}>
                                    {tier.price}
                                </span>
                                {tier.soldOut && (
                                    <span className="text-[9px] bg-white/10 text-white/40 rounded px-1.5 py-0.5 font-medium border border-white/8">
                                        Sold out
                                    </span>
                                )}
                                {tier.original && !tier.soldOut && (
                                    <span className="text-[13px] text-white/30 line-through">{tier.original}</span>
                                )}
                            </div>

                            {/* Progress bar */}
                            <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden mt-1">
                                <div
                                    className={`h-full rounded-full transition-all ${tier.current ? "bg-[#9ad013]" : "bg-white/20"}`}
                                    style={{ width: `${tier.progress}%` }}
                                />
                            </div>

                            <span className={`text-[9px] ${tier.current ? "text-[#9ad013] font-semibold" : "text-white/30"}`}>
                                {tier.status}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/8 mb-5" />

                {/* Price summary row */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[12px] text-white/50 leading-relaxed max-w-[280px]">
                        Only{" "}
                        <span className="text-[#9ad013] font-semibold underline underline-offset-2">
                            50 Founding Member
                        </span>{" "}
                        spots available. Lock in the lowest lifetime price before standard pricing begins.
                    </p>
                    <div className="flex items-baseline gap-2 shrink-0">
                        <span className="text-[28px] font-bold text-white">$39</span>
                        <span className="text-[15px] text-white/30 line-through">$79</span>
                    </div>
                </div>

                {/* Primary CTA */}
                <button className="w-full h-12 rounded-full bg-gradient-to-b from-[#e8e8e8] to-[#bdbdbd] text-black text-[14px] font-semibold hover:brightness-105 active:scale-[0.98] transition cursor-pointer shadow-lg mb-3">
                    Unlock Ditther Pro
                </button>

                {/* Secondary */}
                <p className="text-center text-[11px] text-white/30">
                    Already purchased?{" "}
                    <button className="text-white/50 hover:text-white/70 underline underline-offset-2 transition cursor-pointer">
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
}

// ─── Backdrop ────────────────────────────────────────────────────────────────

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

interface FoundingModalProps {
    step: FoundingModalStep;
    onClose: () => void;
    onBecomeMember: () => void;
}

export default function FoundingModal({ step, onClose, onBecomeMember }: FoundingModalProps) {
    // Close on Escape
    useEffect(() => {
        if (!step) return;
        const handle = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle);
    }, [step, onClose]);

    // Lock body scroll while open
    useEffect(() => {
        if (step) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [step]);

    if (!step) return null;

    return (
        <>
            {/* Backdrop — click to close */}
            <Backdrop onClick={onClose} />

            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="pointer-events-auto w-full modal-enter"
                    style={{ maxWidth: step === "members" ? 640 : 580 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {step === "members" ? (
                        <FoundingMembersModal onClose={onClose} onBecomeMember={onBecomeMember} />
                    ) : (
                        <ProModal onClose={onClose} />
                    )}
                </div>
            </div>
        </>
    );
}
