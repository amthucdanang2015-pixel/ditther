"use client";

import { useState } from "react";
import EffectSlider from "./EffectSlider";


export default function Animation() {
    const [filterGroups, setFilterGroups] = useState([
        {
            title: "Tone",
            filters: [
                { name: "Pace", value: 85, max: 200, suffix: "%" },
                { name: "Intensity", value: 120, max: 200, suffix: "%" },
                { name: "Phase Lag", value: 140, max: 200, suffix: "%" },
                // { name: "Easing", value: 0, max: 360, suffix: "deg" },
            ],
        },

    ]);

    const [animate, setAnimate] = useState(true);
    return (
        <div className="flex flex-col mt-2 justify-between">
            <div className="flex items-center justify-between">

                <h3 className="text-[10px] uppercase tracking-[0.08em] text-[#8d8d95]">
                    Animation
                </h3>
                <label className="flex cursor-pointer items-center">
                    <input
                        type="checkbox"
                        checked={animate}
                        onChange={(e) => setAnimate(e.target.checked)}
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
        ${animate
                                    ? "translate-x-4 bg-[var(--text-primary-color)] shadow-[0_1px_4px_var(--shadow-drop-sm),inset_0_1px_0_var(--shadow-inset-top),0_0_0_4px_var(--bg-hover-color)]"
                                    : "translate-x-0 bg-[var(--text2)] shadow-[0_1px_3px_var(--shadow-drop-sm),inset_0_1px_0_var(--shadow-inset-top)]"
                                }`}
                        ></div>
                    </div>
                </label>
            </div>


            <div className="flex flex-col gap-2 w-full mt-2">

                {filterGroups.map((group, groupIndex) => (
                    <div key={group.title} className="flex w-full">

                        <div className="space-y-2 flex-1 w-full">
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
    );
}