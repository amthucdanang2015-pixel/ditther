"use client";

import Image from "next/image";
import { Grid2x2 } from "lucide-react";

const looks = [
    "strip_4.jpg",
    "japanese.jpg",
    "static.jpg",
    "prism.jpg",
    "acid-rain.jpg",
    "mosaic.jpg",
    "voxel.jpg",
    "terminal.jpg",
];
const lookTxt = [
    "Arcade", "Japanese", "Static", "Prism", "Acid Rain", "Mosaic", "Voxel", "Terminal"
];


export default function LooksGrid({ onLookClick }: { onLookClick?: (look: string) => void }) {
    return (
        <div className="grid grid-cols-3 gap-1.5">
            {looks.map((img, index) => (
                <button
                    key={img}
                    onClick={() => onLookClick?.(lookTxt[index])}
                    className="flex justify-center relative h-[50px] aspect-[1.5] overflow-hidden rounded-md group cursor-pointer"
                >
                    <Image
                        loading="eager"
                        src={`/images/${img}`}
                        fill
                        sizes="33vw"
                        alt=""
                        className="object-cover transition duration-300 group-hover:scale-105 h-[50px]"
                    />
                    <p className="absolute bottom-0  text-white text-xs px-2 pb-2">{lookTxt[index]}</p>
                </button>
            ))}

            <button className="relative aspect-[1.2] overflow-hidden rounded-2xl bg-zinc-900">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 cursor-pointer">
                    <Grid2x2 size={20} />
                    View all
                </div>
            </button>
        </div>
    );
}