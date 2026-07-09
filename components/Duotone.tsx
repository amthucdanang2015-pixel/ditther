"use client";

import { useState } from "react";


export default function Duotone() {
    const presets = [
        "Breathe",
        "Drift",
        "Echo",
        "Sweep",
        "Flow",
        "Pour",
        "Storm",
        "Heartbeat",
        "Tide",
        "Matrix"
    ];
    const [selectedPreset, setSelectedPreset] = useState("Echo");
    const [duotone, setDuotone] = useState(true);
    return (
        <div className="flex flex-col mt-2 justify-between">
            <div className="flex items-center justify-between">
                <h3 className="text-[10px] tracking-[0.08em] pb-2 text-[#8d8d95]">
                    DUOTONE
                </h3>
                <label className="flex cursor-pointer items-center">
                    <input
                        type="checkbox"
                        checked={duotone}
                        onChange={(e) => setDuotone(e.target.checked)}
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
        ${duotone
                                    ? "translate-x-4 bg-[var(--text-primary-color)] shadow-[0_1px_4px_var(--shadow-drop-sm),inset_0_1px_0_var(--shadow-inset-top),0_0_0_4px_var(--bg-hover-color)]"
                                    : "translate-x-0 bg-[var(--text2)] shadow-[0_1px_3px_var(--shadow-drop-sm),inset_0_1px_0_var(--shadow-inset-top)]"
                                }`}
                        ></div>
                    </div>
                </label>
            </div>


            <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                    <button
                        key={preset}
                        onClick={() => setSelectedPreset(preset)}
                        className={`
                                        rounded-full border px-3 py-1.5 text-[11px] leading-none cursor-pointer transition-all duration-200
                                        ${selectedPreset === preset
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
    );
}