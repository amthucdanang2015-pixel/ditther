"use client";

import { useEffect, useState } from "react";
import GalleryCanvas from "./GalleryCanvas";
import GalleryControls from "./GalleryControls";
import { images } from "@/data/gallery";

export default function Gallery() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  console.log("Current image index:", current);

  return (
    <section
      className="relative h-[88vh] overflow-hidden bg-black"
      id="gallery"
    >
      <GalleryCanvas src={images[current]} />
      <div className="absolute bottom-8 right-8">
        <GalleryControls current={current} onChange={setCurrent} />
      </div>
    </section>
  );
}
