"use client";

import React from "react";

interface Props {
    label: string;
    value: number;
    max?: number;
    suffix?: string;
    onChange: (value: number) => void;
}

export default function EffectSlider({
    label,
    value,
    max = 100,
    suffix = "",
    onChange,
}: Props) {
    return (
        <div className="relative w-full overflow-hidden">
            <span className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-[12px] font-medium text-zinc-200 pointer-events-none">
                {label}
            </span>
            <input
                type="range"
                min={0}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="ditther-slider"
                style={
                    {
                        "--fill": `${(value / max) * 100}%`,
                    } as React.CSSProperties
                }
            />

            <span className="absolute right-6 top-1/2 z-10 -translate-y-1/2 text-[15px] text-zinc-400 pointer-events-none">
                {value}
                {suffix}
            </span>
        </div>
    );
}