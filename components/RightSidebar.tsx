"use client";

import { Grid2x2, List, Save } from "lucide-react";
import LooksGrid from "./LooksGrid";
import { useState } from "react";
import EffectSlider from "./EffectSlider";
import Animation from "./Animation";
import Duotone from "./Duotone";


export default function RightSidebar({
    selectedPixelEffect = null,
    setSelectedPixelEffect,
    pixelEffectSettings = {
        size: 70,
        fill: 100,
        density: 8,
        exposure: 110,
        scatter: 0,
        opacity: 100,
        blending: 50,
    },
    setPixelEffectSettings,
    onApplyLook
}: {
    selectedPixelEffect?: string | null,
    setSelectedPixelEffect?: (val: string | null) => void,
    pixelEffectSettings?: any,
    setPixelEffectSettings?: any,
    onApplyLook?: (look: string) => void
}) {
    const effects = pixelEffectSettings;
    const setEffects = setPixelEffectSettings || (() => { });
    const [enabled, setEnabled] = useState(true);
    const [duotone, setDuotone] = useState(true);
    const [animate, setAnimate] = useState(true);
    const pixelEffects = [
        "Dither",
        "ASCII",
        "Halftone",
        "Dot",
        "LEGO",
        "Voxel",
        "LED",
        "Lattice"
    ];

    return (
        <aside className="w-full md:w-[320px] shrink-0 rounded-t-[34px] md:rounded-tr-none md:rounded-tl-[34px] bg-[#171719] flex flex-col md:flex-none md:h-full md:overflow-hidden">
            <div className="no-scrollbar flex-1 md:overflow-y-auto px-6 py-6">

                {/* LOOKS */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm tracking-widest text-zinc-400">
                            LOOKS
                        </h3>

                        <List size={16} className="text-zinc-500" />

                        <Grid2x2 size={16} className="text-zinc-500" />
                    </div>

                    <button className="flex items-center gap-2 text-zinc-400 cursor-pointer hover:text-[#fff]">
                        <Save size={16} />
                        Save
                    </button>
                </div>

                <div className="mt-5">
                    <LooksGrid onLookClick={onApplyLook} />
                </div>

                <div className="my-8 border-t border-white/10" />

                {/* PIXEL EFFECT */}

                <div
                    className={`flex flex-col justify-between transition-opacity duration-200 ${!enabled ? 'opacity-45 pointer-events-none' : ''}`}
                    id="pixelEffect"
                >
                    <div className="flex items-center justify-between pointer-events-auto">
                        <h3 className="text-[10px] tracking-[0.08em] pb-2 text-[#8d8d95]">
                            PIXEL EFFECTS
                        </h3>
                        <label className="flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                checked={enabled}
                                onChange={(e) => setEnabled(e.target.checked)}
                                className="hidden"
                            />
                            <div
                                className="
                                    relative flex h-[18px] w-8 items-center rounded-full
                                    border border-[var(--border-secondary-color)]
                                    bg-[linear-gradient(180deg,var(--glass-from)_0%,var(--glass-to)_80%)]
                                    p-[2px]
                                    shadow-[inset_0_1px_0_var(--shadow-inset-top),inset_0_-1px_0_var(--shadow-inset-bottom)]
                                    backdrop-blur-sm
                                "
                            >
                                <div
                                    className={`absolute left-[2px] h-3 w-3 rounded-full
        transition-all duration-[450ms]
        ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${enabled
                                            ? "translate-x-4 bg-[var(--text-primary-color)] shadow-[0_1px_4px_var(--shadow-drop-sm),inset_0_1px_0_var(--shadow-inset-top),0_0_0_4px_var(--bg-hover-color)]"
                                            : "translate-x-0 bg-[var(--text2)] shadow-[0_1px_3px_var(--shadow-drop-sm),inset_0_1px_0_var(--shadow-inset-top)]"
                                        }`}
                                ></div>
                            </div>
                        </label>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {pixelEffects.map((preset) => (
                            <button
                                key={preset}
                                onClick={() => setSelectedPixelEffect?.(preset)}
                                className={`
                                        rounded-full border px-3 py-1.5 text-[11px] leading-none cursor-pointer transition-all duration-200
                                        ${selectedPixelEffect === preset
                                        ? "bg-gradient-to-b from-[#4b4b52] to-[#3a3a40] text-white border-white"
                                        : "bg-[#2b2b2f] text-[#8d8d95] border-[#3a3a40] hover:bg-[#34343a]"
                                    }
    `}
                            >
                                {preset}
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    className={`mt-5 flex flex-wrap gap-2 ${!enabled ? 'opacity-45 pointer-events-none' : ''}`}>
                    <EffectSlider
                        label="Size"
                        value={effects.size}
                        max={150}
                        onChange={(v) =>
                            setEffects((prev: any) => ({ ...prev, size: v }))
                        }
                    />
                    <EffectSlider
                        label="Fill"
                        value={effects.fill}
                        suffix="%"
                        onChange={(v) =>
                            setEffects((prev: any) => ({ ...prev, fill: v }))
                        }
                    />

                    <EffectSlider
                        label="Density"
                        value={effects.density}
                        max={20}
                        onChange={(v) =>
                            setEffects((prev: any) => ({ ...prev, density: v }))
                        }
                    />
                    <EffectSlider
                        label="Exposure"
                        value={effects.exposure}
                        max={150}
                        onChange={(v) =>
                            setEffects((prev: any) => ({ ...prev, exposure: v }))
                        }
                    />
                    <EffectSlider
                        label="Scatter"
                        value={effects.scatter}
                        max={150}
                        onChange={(v) =>
                            setEffects((prev: any) => ({ ...prev, scatter: v }))
                        }
                    />
                    <EffectSlider
                        label="Opacity"
                        value={effects.opacity}
                        max={150}
                        onChange={(v) =>
                            setEffects((prev: any) => ({ ...prev, opacity: v }))
                        }
                    />
                    <EffectSlider
                        label="Blending Mode"
                        value={effects.blending}
                        max={150}
                        onChange={(v) =>
                            setEffects((prev: any) => ({ ...prev, blending: v }))
                        }
                    />
                </div>

                <Duotone />
                <Animation />
            </div>
        </aside>
    );
}