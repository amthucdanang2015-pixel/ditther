"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type HandleType = "move" | "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";
interface CropBox { x: number; y: number; w: number; h: number } // 0-1 fractions

const RATIOS: { label: string; value: number | null }[] = [
    { label: "Free",  value: null },
    { label: "1:1",   value: 1 },
    { label: "4:3",   value: 4 / 3 },
    { label: "3:2",   value: 3 / 2 },
    { label: "16:9",  value: 16 / 9 },
    { label: "4:5",   value: 4 / 5 },
    { label: "9:16",  value: 9 / 16 },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface CropOverlayProps {
    src: string;
    onApply: (croppedUrl: string) => void;
    onCancel: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const clampBox = (b: CropBox): CropBox => {
    const w = Math.max(0.05, Math.min(b.w, 1));
    const h = Math.max(0.05, Math.min(b.h, 1));
    const x = Math.max(0, Math.min(b.x, 1 - w));
    const y = Math.max(0, Math.min(b.y, 1 - h));
    return { x, y, w, h };
};

const applyRatio = (box: CropBox, ratio: number | null): CropBox => {
    if (!ratio) return box;
    const newH = box.w / ratio;
    return clampBox({ ...box, h: newH });
};

export default function CropOverlay({ src, onApply, onCancel }: CropOverlayProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [crop, setCrop] = useState<CropBox>({ x: 0.15, y: 0.15, w: 0.7, h: 0.7 });
    const [selectedRatio, setSelectedRatio] = useState<string>("Free");

    // Track drag state in a ref so callbacks always have fresh values
    const drag = useRef<{
        handle: HandleType;
        startFx: number; startFy: number;
        startCrop: CropBox;
    } | null>(null);

    // Convert clientX/Y → fraction of container
    const toFraction = (clientX: number, clientY: number) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return { fx: 0, fy: 0 };
        return { fx: (clientX - rect.left) / rect.width, fy: (clientY - rect.top) / rect.height };
    };

    const currentRatioValue = RATIOS.find(r => r.label === selectedRatio)?.value ?? null;

    // ── Mouse / Touch move handler ───────────────────────────────────────────
    const onPointerMove = useCallback((clientX: number, clientY: number) => {
        if (!drag.current) return;
        const { fx, fy } = toFraction(clientX, clientY);
        const dx = fx - drag.current.startFx;
        const dy = fy - drag.current.startFy;
        const sc = drag.current.startCrop;
        let b = { ...sc };

        switch (drag.current.handle) {
            case "move":
                b.x = sc.x + dx;
                b.y = sc.y + dy;
                break;
            case "nw": b.x = sc.x + dx; b.w = sc.w - dx; b.y = sc.y + dy; b.h = sc.h - dy; break;
            case "n":  b.y = sc.y + dy; b.h = sc.h - dy; break;
            case "ne": b.w = sc.w + dx; b.y = sc.y + dy; b.h = sc.h - dy; break;
            case "e":  b.w = sc.w + dx; break;
            case "se": b.w = sc.w + dx; b.h = sc.h + dy; break;
            case "s":  b.h = sc.h + dy; break;
            case "sw": b.x = sc.x + dx; b.w = sc.w - dx; b.h = sc.h + dy; break;
            case "w":  b.x = sc.x + dx; b.w = sc.w - dx; break;
        }

        // Apply ratio constraint on resize handles (not move)
        if (drag.current.handle !== "move" && currentRatioValue) {
            const isHoriz = ["e", "w", "se", "sw", "ne", "nw"].includes(drag.current.handle);
            if (isHoriz) b.h = b.w / currentRatioValue;
            else          b.w = b.h * currentRatioValue;
        }

        setCrop(clampBox(b));
    }, [currentRatioValue]);

    const onPointerUp = useCallback(() => { drag.current = null; }, []);

    useEffect(() => {
        const mm = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
        const tm = (e: TouchEvent) => onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
        document.addEventListener("mousemove", mm);
        document.addEventListener("mouseup", onPointerUp);
        document.addEventListener("touchmove", tm, { passive: true });
        document.addEventListener("touchend", onPointerUp);
        return () => {
            document.removeEventListener("mousemove", mm);
            document.removeEventListener("mouseup", onPointerUp);
            document.removeEventListener("touchmove", tm);
            document.removeEventListener("touchend", onPointerUp);
        };
    }, [onPointerMove, onPointerUp]);

    const startDrag = (e: React.MouseEvent | React.TouchEvent, handle: HandleType) => {
        e.preventDefault();
        e.stopPropagation();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
        const { fx, fy } = toFraction(clientX, clientY);
        drag.current = { handle, startFx: fx, startFy: fy, startCrop: { ...crop } };
    };

    // ── Apply: canvas-crop the image ─────────────────────────────────────────
    const handleApply = () => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            // Replicate object-cover math to find image display region inside the container
            const cAspect = rect.width / rect.height;
            const iAspect = img.width / img.height;
            let dW: number, dH: number, dX: number, dY: number;
            if (cAspect > iAspect) {
                dW = rect.width; dH = rect.width / iAspect;
                dX = 0;          dY = (rect.height - dH) / 2;
            } else {
                dH = rect.height; dW = rect.height * iAspect;
                dY = 0;            dX = (rect.width - dW) / 2;
            }

            // Map crop box fractions → source image pixel coords
            const srcX = ((crop.x * rect.width  - dX) / dW) * img.width;
            const srcY = ((crop.y * rect.height - dY) / dH) * img.height;
            const srcW = (crop.w * rect.width  / dW) * img.width;
            const srcH = (crop.h * rect.height / dH) * img.height;

            const cv = document.createElement("canvas");
            cv.width = Math.max(1, Math.round(srcW));
            cv.height = Math.max(1, Math.round(srcH));
            cv.getContext("2d")?.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, cv.width, cv.height);
            cv.toBlob(blob => { if (blob) onApply(URL.createObjectURL(blob)); }, "image/png");
        };
    };

    // ── Derived values for CSS ────────────────────────────────────────────────
    const { x, y, w, h } = crop;
    const pct = (v: number) => `${v * 100}%`;
    const hBase = "absolute w-3 h-3 bg-white border border-gray-400/80 shadow-md rounded-[3px] z-10";

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full rounded-3xl overflow-hidden bg-black select-none"
        >
            {/* ── Full image underneath ────────────────────────────────────── */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

            {/* ── Dark overlay (4 strips around crop box) ──────────────────── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* top */}
                <div className="absolute left-0 right-0 top-0 bg-black/55" style={{ height: pct(y) }} />
                {/* bottom */}
                <div className="absolute left-0 right-0 bottom-0 bg-black/55" style={{ height: pct(1 - y - h) }} />
                {/* left */}
                <div className="absolute bg-black/55" style={{ top: pct(y), height: pct(h), left: 0, width: pct(x) }} />
                {/* right */}
                <div className="absolute bg-black/55" style={{ top: pct(y), height: pct(h), right: 0, width: pct(1 - x - w) }} />
            </div>

            {/* ── Crop box ─────────────────────────────────────────────────── */}
            <div
                className="absolute border-2 border-white cursor-move z-[5]"
                style={{ left: pct(x), top: pct(y), width: pct(w), height: pct(h) }}
                onMouseDown={(e) => startDrag(e, "move")}
                onTouchStart={(e) => startDrag(e, "move")}
            >
                {/* Rule-of-thirds grid */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)`,
                    backgroundSize: "33.33% 33.33%",
                }} />

                {/* Corner handles */}
                <div className={`${hBase} -top-1.5 -left-1.5 cursor-nw-resize`} onMouseDown={(e) => startDrag(e, "nw")} onTouchStart={(e) => startDrag(e, "nw")} />
                <div className={`${hBase} -top-1.5 left-1/2 -translate-x-1/2 cursor-n-resize`}  onMouseDown={(e) => startDrag(e, "n")}  onTouchStart={(e) => startDrag(e, "n")} />
                <div className={`${hBase} -top-1.5 -right-1.5 cursor-ne-resize`} onMouseDown={(e) => startDrag(e, "ne")} onTouchStart={(e) => startDrag(e, "ne")} />
                <div className={`${hBase} top-1/2 -translate-y-1/2 -right-1.5 cursor-e-resize`} onMouseDown={(e) => startDrag(e, "e")}  onTouchStart={(e) => startDrag(e, "e")} />
                <div className={`${hBase} -bottom-1.5 -right-1.5 cursor-se-resize`} onMouseDown={(e) => startDrag(e, "se")} onTouchStart={(e) => startDrag(e, "se")} />
                <div className={`${hBase} -bottom-1.5 left-1/2 -translate-x-1/2 cursor-s-resize`} onMouseDown={(e) => startDrag(e, "s")} onTouchStart={(e) => startDrag(e, "s")} />
                <div className={`${hBase} -bottom-1.5 -left-1.5 cursor-sw-resize`} onMouseDown={(e) => startDrag(e, "sw")} onTouchStart={(e) => startDrag(e, "sw")} />
                <div className={`${hBase} top-1/2 -translate-y-1/2 -left-1.5 cursor-w-resize`}  onMouseDown={(e) => startDrag(e, "w")}  onTouchStart={(e) => startDrag(e, "w")} />
            </div>

            {/* ── Bottom toolbar ────────────────────────────────────────────── */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-[#18181b]/90 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 shadow-xl">
                {RATIOS.map(({ label }) => (
                    <button
                        key={label}
                        onClick={() => {
                            setSelectedRatio(label);
                            const rv = RATIOS.find(r => r.label === label)?.value ?? null;
                            if (rv !== null) setCrop(prev => applyRatio(prev, rv));
                        }}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                            selectedRatio === label
                                ? "bg-white/20 text-white border border-white/25"
                                : "text-white/45 hover:text-white/80"
                        }`}
                    >
                        {label}
                    </button>
                ))}

                {/* Separator */}
                <div className="w-px h-4 bg-white/15 mx-1" />

                {/* Cancel */}
                <button
                    onClick={onCancel}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 transition text-white cursor-pointer"
                    title="Cancel"
                >
                    <X size={13} />
                </button>

                {/* Apply */}
                <button
                    onClick={handleApply}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7ec800] hover:bg-[#96e300] transition text-black text-[11px] font-bold cursor-pointer shadow-md"
                >
                    <Check size={12} />
                    Apply
                </button>
            </div>
        </div>
    );
}
