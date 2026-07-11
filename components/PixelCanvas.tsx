"use client";

import { useEffect, useRef, useState } from "react";

const ROWS_PER_CHUNK = 20; // rows to paint per animation frame — tune for speed vs. smoothness

export default function PixelCanvas({
    src,
    effect,
    settings,
    presetFilter,
}: {
    src: string;
    effect: string | null;
    settings: any;
    presetFilter: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const abortRef = useRef(false);       // cancels any in-flight render
    const rafRef = useRef<number>(0);     // current rAF handle
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Cancel any previous render pass
        abortRef.current = true;
        cancelAnimationFrame(rafRef.current);

        // Small defer so the browser can paint before we start heavy work
        const timerId = setTimeout(() => {
            abortRef.current = false;
            setIsLoading(true);

            const img = new Image();
            // Allow cross-origin images (data URLs are fine too)
            img.crossOrigin = "anonymous";
            img.src = src;

            img.onload = () => {
                if (abortRef.current) return;

                const width = canvas.offsetWidth;
                const height = canvas.offsetHeight;
                canvas.width = width;
                canvas.height = height;

                // object-cover crop calculation
                const canvasAspect = width / height;
                const imgAspect = img.width / img.height;
                let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

                if (canvasAspect > imgAspect) {
                    drawWidth = img.width;
                    drawHeight = img.width / canvasAspect;
                    offsetX = 0;
                    offsetY = (img.height - drawHeight) / 2;
                } else {
                    drawHeight = img.height;
                    drawWidth = img.height * canvasAspect;
                    offsetX = (img.width - drawWidth) / 2;
                    offsetY = 0;
                }

                // ── No pixel effect — fast path ──────────────────────────────
                if (!effect) {
                    ctx.clearRect(0, 0, width, height);
                    ctx.filter = presetFilter || "none";
                    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight, 0, 0, width, height);
                    ctx.filter = "none";
                    setIsLoading(false);
                    return;
                }

                // ── Pixel effect — sample into a tiny offscreen canvas first ─
                const pixelSize = Math.max(4, settings.size / 5);
                const cols = Math.ceil(width / pixelSize);
                const rows = Math.ceil(height / pixelSize);

                const offscreen = document.createElement("canvas");
                offscreen.width = cols;
                offscreen.height = rows;
                const offCtx = offscreen.getContext("2d");
                if (!offCtx) { setIsLoading(false); return; }

                offCtx.filter = presetFilter || "none";
                offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight, 0, 0, cols, rows);
                offCtx.filter = "none";

                const imageData = offCtx.getImageData(0, 0, cols, rows).data;

                ctx.clearRect(0, 0, width, height);

                // ── Render in chunks to keep the UI responsive ───────────────
                let currentRow = 0;

                const renderChunk = () => {
                    if (abortRef.current) { setIsLoading(false); return; }

                    const endRow = Math.min(currentRow + ROWS_PER_CHUNK, rows);

                    for (let y = currentRow; y < endRow; y++) {
                        for (let x = 0; x < cols; x++) {
                            const i = (y * cols + x) * 4;
                            const r = imageData[i];
                            const g = imageData[i + 1];
                            const b = imageData[i + 2];
                            const a = imageData[i + 3] / 255;

                            const color = `rgba(${r},${g},${b},${a * (settings.opacity / 100)})`;

                            const drawX = x * pixelSize;
                            const drawY = y * pixelSize;
                            const fillSize = pixelSize * (settings.fill / 100);
                            const offset = (pixelSize - fillSize) / 2;

                            ctx.fillStyle = color;

                            if (effect === "LEGO") {
                                ctx.fillRect(drawX + offset, drawY + offset, fillSize, fillSize);

                                ctx.fillStyle = `rgba(255,255,255,0.2)`;
                                ctx.fillRect(drawX + offset, drawY + offset, fillSize, 2);
                                ctx.fillRect(drawX + offset, drawY + offset, 2, fillSize);

                                ctx.fillStyle = `rgba(0,0,0,0.2)`;
                                ctx.fillRect(drawX + offset, drawY + offset + fillSize - 2, fillSize, 2);
                                ctx.fillRect(drawX + offset + fillSize - 2, drawY + offset, 2, fillSize);

                                const studRadius = fillSize * 0.25;
                                ctx.beginPath();
                                ctx.arc(drawX + pixelSize / 2, drawY + pixelSize / 2, studRadius, 0, Math.PI * 2);
                                ctx.fillStyle = color;
                                ctx.fill();

                                ctx.beginPath();
                                ctx.arc(drawX + pixelSize / 2, drawY + pixelSize / 2, studRadius, 0, Math.PI * 2);
                                ctx.lineWidth = 1;
                                ctx.strokeStyle = `rgba(255,255,255,0.3)`;
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.arc(drawX + pixelSize / 2 + 1, drawY + pixelSize / 2 + 1, studRadius, 0, Math.PI * 2);
                                ctx.strokeStyle = `rgba(0,0,0,0.2)`;
                                ctx.stroke();

                            } else if (effect === "Dot" || effect === "Halftone") {
                                ctx.beginPath();
                                const radius = (fillSize / 2) * (effect === "Halftone" ? (r + g + b) / (255 * 3) : 1);
                                ctx.arc(drawX + pixelSize / 2, drawY + pixelSize / 2, radius, 0, Math.PI * 2);
                                ctx.fill();

                            } else if (effect === "ASCII") {
                                const brightness = (r + g + b) / 3;
                                const chars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "];
                                const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
                                ctx.fillStyle = color;
                                ctx.font = `${fillSize}px monospace`;
                                ctx.textAlign = "center";
                                ctx.textBaseline = "middle";
                                ctx.fillText(chars[charIndex], drawX + pixelSize / 2, drawY + pixelSize / 2);

                            } else {
                                // Default square (Dither, Voxel, Lattice, LED, etc.)
                                ctx.fillRect(drawX + offset, drawY + offset, fillSize, fillSize);
                            }
                        }
                    }

                    currentRow = endRow;

                    if (currentRow < rows) {
                        rafRef.current = requestAnimationFrame(renderChunk);
                    } else {
                        // Done!
                        setIsLoading(false);
                    }
                };

                rafRef.current = requestAnimationFrame(renderChunk);
            };

            img.onerror = () => {
                setIsLoading(false);
            };
        }, 0);

        return () => {
            abortRef.current = true;
            cancelAnimationFrame(rafRef.current);
            clearTimeout(timerId);
        };
    }, [src, effect, settings, presetFilter]);

    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
                style={{ width: "100%", height: "100%" }}
            />

            {/* Loading overlay */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-3xl z-10 pointer-events-none">
                    <div className="flex flex-col items-center gap-3">
                        {/* Spinner */}
                        <svg
                            className="animate-spin h-8 w-8 text-white/70"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                        <span className="text-white/60 text-[11px] tracking-widest uppercase font-medium">
                            Rendering…
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
