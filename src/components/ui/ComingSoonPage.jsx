"use client";
import React from "react";
import { motion } from "framer-motion";
import { IconRocket, IconClock } from "@tabler/icons-react";

export default function ComingSoonPage({ title = "Coming Soon", description = "We are working hard to bring this to you." }) {
    return (
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(190, 242, 100, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(190, 242, 100, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px'
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-lime-400/5 blur-[100px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center px-4 max-w-2xl mx-auto"
            >
                <h1 className="text-5xl md:text-7xl font-anton text-white mb-6 uppercase tracking-wide">
                    {title}
                </h1>

                <p className="text-white/60 font-outfit text-lg md:text-xl leading-relaxed">
                    {description}
                </p>

                {/* Decorative Lines */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-lime-400/50" />
                    <IconClock size={16} className="text-lime-400/50" />
                    <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-lime-400/50" />
                </div>
            </motion.div>
        </div>
    );
}
