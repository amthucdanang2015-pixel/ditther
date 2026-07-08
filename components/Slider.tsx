"use client";

interface SliderProps {
    label: string;
    value: number;
    max: number;
    suffix?: string;
}

export default function Slider({
    label,
    value,
    max,
    suffix = "",
}: SliderProps) {
    return (
        <div className="relative">
            <div className="relative h-14 overflow-hidden rounded-2xl bg-[#222225]">

                {/* fake filled background */}
                <div
                    className="absolute inset-y-0 left-0 bg-white/8"
                    style={{
                        width: `${(value / max) * 100}%`,
                    }}
                />

                <span className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-[15px] text-zinc-200">
                    {label}
                </span>

                <input
                    type="range"
                    defaultValue={value}
                    max={max}
                    className="absolute inset-0 z-20 h-full w-full appearance-none bg-transparent ditther-slider"
                />

                <span className="absolute right-5 top-1/2 z-10 -translate-y-1/2 text-[15px] text-zinc-400">
                    {value}
                    {suffix}
                </span>
            </div>
        </div>
    );
}