"use client";

import React, { useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";

const FRAME_COUNT = 40;

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${paddedIndex}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          // Draw first frame immediately once loaded
          if (canvasRef.current) {
            drawFrame(loadedImages[0], canvasRef.current);
          }
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (image: HTMLImageElement, canvas: HTMLCanvasElement) => {
    if (!image || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // object-fit cover logic
    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - image.width * ratio) / 2;
    const centerShift_y = (canvas.height - image.height * ratio) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      centerShift_x,
      centerShift_y,
      image.width * ratio,
      image.height * ratio
    );
  };

  useEffect(() => {
    if (images.length === 0) return;
    
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map 0-1 to 0-39
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(latest * FRAME_COUNT)
      );
      if (canvasRef.current && images[frameIndex]) {
        drawFrame(images[frameIndex], canvasRef.current);
      }
    });

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current && images.length > 0) {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(scrollYProgress.get() * FRAME_COUNT)
        );
        drawFrame(images[frameIndex], canvasRef.current);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, scrollYProgress]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-[#121212]">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Hide watermark in bottom right corner */}
      <div className="absolute -bottom-8 -right-8 w-64 h-32 bg-[#121212] blur-2xl z-20 pointer-events-none" />
    </div>
  );
}
