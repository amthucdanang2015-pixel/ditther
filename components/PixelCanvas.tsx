"use client";

import { useEffect, useRef } from "react";

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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = src;
        img.onload = () => {
            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;

            // Calculate object-cover crop
            const canvasAspect = width / height;
            const imgAspect = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;

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

            // If no pixel effect is selected, just draw the image normally
            if (!effect) {
                ctx.clearRect(0, 0, width, height);
                ctx.filter = presetFilter || "none";
                ctx.drawImage(
                    img,
                    offsetX, offsetY, drawWidth, drawHeight, // Source crop
                    0, 0, width, height // Destination
                );
                return;
            }

            // Apply preset filter if any (using Canvas API filter)
            ctx.filter = presetFilter || "none";
            
            // Adjust size based on settings (prevent size <= 0). Slider 0-150 maps to pixel size 4-30
            const pixelSize = Math.max(4, settings.size / 5);
            
            const cols = Math.ceil(width / pixelSize);
            const rows = Math.ceil(height / pixelSize);

            // Draw to offscreen canvas to get colors
            const offscreen = document.createElement("canvas");
            offscreen.width = cols;
            offscreen.height = rows;
            const offCtx = offscreen.getContext("2d");
            if (!offCtx) return;

            offCtx.filter = presetFilter || "none";
            
            offCtx.drawImage(
                img,
                offsetX, offsetY, drawWidth, drawHeight, // Source crop
                0, 0, cols, rows // Destination
            );

            const imageData = offCtx.getImageData(0, 0, cols, rows).data;

            ctx.clearRect(0, 0, width, height);

            for (let y = 0; y < rows; y++) {
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
                        // Draw block
                        ctx.fillRect(drawX + offset, drawY + offset, fillSize, fillSize);
                        
                        // Draw 3D edges
                        ctx.fillStyle = `rgba(255,255,255,0.2)`;
                        ctx.fillRect(drawX + offset, drawY + offset, fillSize, 2); // top highlight
                        ctx.fillRect(drawX + offset, drawY + offset, 2, fillSize); // left highlight
                        
                        ctx.fillStyle = `rgba(0,0,0,0.2)`;
                        ctx.fillRect(drawX + offset, drawY + offset + fillSize - 2, fillSize, 2); // bottom shadow
                        ctx.fillRect(drawX + offset + fillSize - 2, drawY + offset, 2, fillSize); // right shadow

                        // Draw stud
                        const studRadius = fillSize * 0.25;
                        ctx.beginPath();
                        ctx.arc(drawX + pixelSize / 2, drawY + pixelSize / 2, studRadius, 0, Math.PI * 2);
                        ctx.fillStyle = color;
                        ctx.fill();
                        
                        // Stud highlight & shadow
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
                        const radius = (fillSize / 2) * (effect === "Halftone" ? (r+g+b)/(255*3) : 1);
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
                        // Default square (Dither, Voxel, etc)
                        ctx.fillRect(drawX + offset, drawY + offset, fillSize, fillSize);
                    }
                }
            }
        };
    }, [src, effect, settings, presetFilter]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full object-cover transition-all duration-500"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
