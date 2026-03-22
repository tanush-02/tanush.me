"use client";

import React, { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import { useScroll } from "framer-motion";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="w-full bg-[#121212]">
      {/* 
        This section represents the 500vh high scrolling area.
        "start start" -> Top of this section hits the top of the viewport.
        "end end" -> Bottom of this section hits the bottom of the viewport.
        This captures exactly the duration where the `sticky` child is pinned.
      */}
      <section ref={containerRef} className="relative h-[500vh] w-full">
        <ScrollyCanvas scrollYProgress={scrollYProgress} />
        <Overlay scrollYProgress={scrollYProgress} />
      </section>

      {/* Projects grid placed below the scrolling canvas area */}
      <section className="relative z-20 w-full bg-[#121212]">
        <Projects />
      </section>
    </main>
  );
}
