"use client";

import Image from "next/image";
import { Grid2x2 } from "lucide-react";

const looks = [
    "strip_2.jpg",
    "strip_3.jpg",
    "strip_4.jpg",
    "strip_5.jpg",
    "strip_6.jpg",
    "strip_7.jpg",
    "strip_8.jpg",
    "strip_9.jpg",
];

export default function LooksGrid() {
    return (
        <div className="grid grid-cols-3 gap-3">
            {looks.map((img, index) => (
                <button
                    key={img}
                    className="relative aspect-[1.2] overflow-hidden rounded-2xl group"
                >
                    <Image
                        src={`/images/${img}`}
                        fill
                        alt=""
                        className="object-cover transition duration-300 group-hover:scale-105"
                    />
                </button>
            ))}

            <button className="relative aspect-[1.2] overflow-hidden rounded-2xl bg-zinc-900">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50">
                    <Grid2x2 size={20} />
                    View all
                </div>
            </button>
        </div>
    );
}