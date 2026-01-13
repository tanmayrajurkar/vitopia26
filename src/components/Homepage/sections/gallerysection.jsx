"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
    "/last_lineup/jonitha.avif",
    "/vitap_drone.webp",
    "/last_lineup/jonitha.avif",
    "/vitap_drone.webp",
    "/last_lineup/jonitha.avif",
    "/vitap_drone.webp",
];

export default function GallerySection() {
    const containerRef = useRef(null);

    // Optimized scroll configuration
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

    return (
        <section ref={containerRef} className="py-24 bg-[#050505] overflow-hidden relative border-y border-white/10">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(190, 242, 100, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(190, 242, 100, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Section Header */}
            <motion.div
                className="mb-16 text-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-anton uppercase mb-4 leading-none">
                    <span className="text-white/80">MEMORIES</span>
                </h2>
                <div className="relative -mt-5 md:-mt-5 lg:-mt-5">
                    <h3 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400 font-outfit font-semibold uppercase tracking-[0.3em]">
                        Capture The Moment
                    </h3>
                </div>
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent mx-auto mt-6" />
            </motion.div>

            <div className="flex flex-col gap-6 md:gap-8 relative">
                {/* Row 1 - Left to Right - Scroll Linked */}
                <motion.div
                    style={{ x: x1, willChange: 'transform' }}
                    className="flex gap-6 md:gap-8"
                >
                    {[...images, ...images].map((src, i) => (
                        <div
                            key={`row1-${i}`}
                            className="relative w-[350px] md:w-[400px] h-[220px] md:h-[250px] shrink-0 rounded-xl overflow-hidden group border-2 border-white/10 hover:border-lime-400/40 transition-colors duration-300 bg-black"
                        >
                            <Image
                                src={src}
                                fill
                                className="object-cover grayscale-0 group-hover:grayscale group-hover:scale-105 transition-all duration-500"
                                alt="Gallery Memory"
                                loading="lazy"
                            />
                            {src === "/vitap_drone.webp" && (
                                <Image
                                    src="/night-vit.jpg"
                                    fill
                                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    alt="Gallery Memory Night"
                                    loading="lazy"
                                />
                            )}
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Lime Glow on Hover */}
                            <div className="absolute inset-0 bg-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                        </div>
                    ))}
                </motion.div>

                {/* Row 2 - Right to Left - Scroll Linked */}
                <motion.div
                    style={{ x: x2, willChange: 'transform' }}
                    className="flex gap-6 md:gap-8"
                >
                    {[...images, ...images].reverse().map((src, i) => (
                        <div
                            key={`row2-${i}`}
                            className="relative w-[350px] md:w-[400px] h-[220px] md:h-[250px] shrink-0 rounded-xl overflow-hidden group border-2 border-white/10 hover:border-purple-500/40 transition-colors duration-300 bg-black"
                        >
                            <Image
                                src={src}
                                fill
                                className="object-cover grayscale-0 group-hover:grayscale group-hover:scale-105 transition-all duration-500"
                                alt="Gallery Memory"
                                loading="lazy"
                            />
                            {src === "/vitap_drone.webp" && (
                                <Image
                                    src="/night-vit.jpg"
                                    fill
                                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    alt="Gallery Memory Night"
                                    loading="lazy"
                                />
                            )}
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Purple Glow on Hover */}
                            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
