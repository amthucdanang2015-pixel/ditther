"use client";

import { Grid2x2, List, Save } from "lucide-react";
import EffectChip from "./EffectChip";
import LooksGrid from "./LooksGrid";
import Slider from "./Slider";
import { useState } from "react";
import EffectSlider from "./EffectSlider";

// const effects = [
//     "Dither",
//     "ASCII",
//     "Halftone",
//     "Dots",
//     "LEGO",
//     "Voxel",
//     "LED",
//     "Lattice",
// ];

export default function RightSidebar() {
    const [effects, setEffects] = useState({
        size: 70,
        fill: 100,
        density: 8,
        exposure: 110,
        scatter: 0,
        opacity: 100,
        blending: 50,

    });

    return (
        <aside className="w-[320px] shrink-0 rounded-tl-[34px] bg-[#171719]">
            <div className="no-scrollbar h-full overflow-y-auto px-6 py-6">

                {/* LOOKS */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm tracking-widest text-zinc-400">
                            LOOKS
                        </h3>

                        <List size={16} className="text-zinc-500" />

                        <Grid2x2 size={16} className="text-zinc-500" />
                    </div>

                    <button className="flex items-center gap-2 text-zinc-400">
                        <Save size={16} />
                        Save
                    </button>
                </div>

                <div className="mt-5">
                    <LooksGrid />
                </div>

                <div className="my-8 border-t border-white/10" />

                {/* PIXEL EFFECT */}

                <div className="flex items-center justify-between">

                    <h3 className="text-sm tracking-widest text-zinc-400">
                        PIXEL EFFECTS
                    </h3>

                    <button className="relative h-7 w-12 rounded-full bg-zinc-700">
                        <div className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white" />
                    </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    <EffectSlider
                        label="Size"
                        value={effects.size}
                        max={150}
                        onChange={(v) =>
                            setEffects(prev => ({ ...prev, size: v }))
                        }
                    />
                    <EffectSlider
                        label="Fill"
                        value={effects.fill}
                        suffix="%"
                        onChange={(v) =>
                            setEffects(prev => ({ ...prev, fill: v }))
                        }
                    />

                    <EffectSlider
                        label="Density"
                        value={effects.density}
                        max={20}
                        onChange={(v) =>
                            setEffects(prev => ({ ...prev, density: v }))
                        }
                    />
                    <EffectSlider
                        label="Exposure"
                        value={effects.exposure}
                        max={150}
                        onChange={(v) =>
                            setEffects(prev => ({ ...prev, exposure: v }))
                        }
                    />
                    <EffectSlider
                        label="Scatter"
                        value={effects.scatter}
                        max={150}
                        onChange={(v) =>
                            setEffects(prev => ({ ...prev, scatter: v }))
                        }
                    />
                    <EffectSlider
                        label="Opacity"
                        value={effects.opacity}
                        max={150}
                        onChange={(v) =>
                            setEffects(prev => ({ ...prev, opacity: v }))
                        }
                    />
                    <EffectSlider
                        label="Blending Mode"
                        value={effects.blending}
                        max={150}
                        onChange={(v) =>
                            setEffects(prev => ({ ...prev, blending: v }))
                        }
                    />
                </div>


                {/* <div className="mt-10 space-y-4">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-16 rounded-xl bg-[#242428]"
                        />
                    ))}
                </div> */}
            </div>
        </aside>
    );
}