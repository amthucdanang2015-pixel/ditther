"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import PixelCanvas from "./PixelCanvas";

interface CompareSliderProps {
    src: string;
    effect: string | null;
    settings: any;
    presetFilter: string;
}

export default function CompareSlider({ src, effect, settings, presetFilter }: CompareSliderProps) {
    const [split, setSplit] = useState(50); // percent from left
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const clamp = (v: number) => Math.max(5, Math.min(95, v));

    const updateSplit = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setSplit(clamp(((clientX - rect.left) / rect.width) * 100));
    }, []);

    // Mouse
    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current) return;
        updateSplit(e.clientX);
    }, [updateSplit]);

    const onMouseUp = useCallback(() => {
        isDragging.current = false;
    }, []);

    // Touch
    const onTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging.current) return;
        updateSplit(e.touches[0].clientX);
    }, [updateSplit]);

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("touchmove", onTouchMove, { passive: true });
        document.addEventListener("touchend", onMouseUp);
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onMouseUp);
        };
    }, [onMouseMove, onMouseUp, onTouchMove]);

    const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        isDragging.current = true;
    };

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full overflow-hidden rounded-3xl bg-black select-none"
            style={{ cursor: "ew-resize" }}
            onMouseDown={(e) => {
                // Allow drag from anywhere in the container
                isDragging.current = true;
                updateSplit(e.clientX);
            }}
            onTouchStart={(e) => {
                isDragging.current = true;
                updateSplit(e.touches[0].clientX);
            }}
        >
            {/* AFTER — full width, all effects applied */}
            <div className="absolute inset-0 pointer-events-none">
                <PixelCanvas
                    src={src}
                    effect={effect}
                    settings={settings}
                    presetFilter={presetFilter}
                />
            </div>

            {/* BEFORE — clipped to left portion, no effects */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
            >
                <PixelCanvas
                    src={src}
                    effect={null}
                    settings={settings}
                    presetFilter=""
                />
            </div>

            {/* Divider line */}
            <div
                className="absolute top-0 bottom-0 w-[2px] bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.4)] pointer-events-none"
                style={{ left: `${split}%`, transform: "translateX(-50%)" }}
            />

            {/* Drag handle */}
            <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 h-9 w-9 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-xl cursor-ew-resize pointer-events-auto"
                style={{ left: `${split}%` }}
                onMouseDown={startDrag}
                onTouchStart={startDrag}
            >
                <ArrowLeftRight size={14} className="text-white" />
            </div>

            {/* BEFORE label */}
            <div className="absolute bottom-4 pointer-events-none" style={{ left: `${Math.min(split - 2, 85)}%`, transform: "translateX(-100%)" }}>
                <span className="bg-[#1a1a2e]/80 text-white text-[10px] font-semibold tracking-widest px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                    BEFORE
                </span>
            </div>

            {/* AFTER label */}
            <div className="absolute bottom-4 pointer-events-none" style={{ left: `${Math.max(split + 2, 15)}%` }}>
                <span className="bg-teal-500/80 text-white text-[10px] font-semibold tracking-widest px-3 py-1.5 rounded-full border border-teal-400/30 backdrop-blur-sm">
                    AFTER
                </span>
            </div>
        </div>
    );
}
