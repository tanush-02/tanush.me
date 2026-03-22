"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% to 15% (fades out completely before section 2)
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 1], [1, 1, 0, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0, 0.15, 1], [0, -50, -50], { clamp: true });

  // Section 2: 25% to 45%
  const opacity2 = useTransform(scrollYProgress, [0, 0.24, 0.3, 0.4, 0.46, 1], [0, 0, 1, 1, 0, 0], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0, 0.25, 0.45, 1], [50, 50, -50, -50], { clamp: true });

  // Section 3: 55% to 75%
  const opacity3 = useTransform(scrollYProgress, [0, 0.54, 0.6, 0.7, 0.76, 1], [0, 0, 1, 1, 0, 0], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0, 0.55, 0.75, 1], [50, 50, -50, -50], { clamp: true });

  // Section 4: 85% to 100%
  const opacity4 = useTransform(scrollYProgress, [0, 0.84, 0.9, 1], [0, 0, 1, 1], { clamp: true });
  const y4 = useTransform(scrollYProgress, [0, 0.85, 1], [50, 50, -50], { clamp: true });

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-x-0 outline-none top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-4 drop-shadow-xl">
            Tanush
          </h1>
          <p className="text-xl md:text-3xl text-neutral-300 font-light tracking-widest uppercase">
            Software Developer
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-x-0 outline-none top-1/2 -translate-y-1/2 flex flex-col items-start justify-center max-w-6xl mx-auto px-8 md:px-16 text-left w-full"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6 drop-shadow-lg max-w-2xl leading-tight">
            I build digital experiences.
          </h2>
          <div className="w-24 h-1 bg-white/50 rounded-full" />
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-x-0 outline-none top-1/2 -translate-y-1/2 flex flex-col items-end justify-center max-w-6xl mx-auto px-8 md:px-16 text-right w-full"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6 drop-shadow-lg max-w-3xl leading-tight">
            Bridging design <br />
            <span className="text-neutral-400">&amp; engineering.</span>
          </h2>
        </motion.div>

        {/* Section 4 */}
        <motion.div 
          style={{ opacity: opacity4, y: y4 }}
          className="absolute inset-x-0 outline-none top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center px-8 md:px-16 w-full"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-8 drop-shadow-lg max-w-4xl leading-snug">
            Scroll down to see my work.
          </h2>
          <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
        </motion.div>

      </div>
    </div>
  );
}
