"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const days = [
    {
        id: 1,
        label: "DAY 1",
        date: "FEB 22",
        color: "from-lime-400 to-green-500",
        accentColor: "lime",
        borderColor: "border-lime-400/40",
        glowColor: "rgba(190, 242, 100, 0.4)",
        textColor: "text-lime-400",
        bgAccent: "bg-lime-400",
        artists: [
            {
                name: "Mohana Bhogaraju",
                role: "Playback Singer",
                image: "/artists/mohana.png",
                gradient: "from-black/20 via-black/10 to-black/80",
            },
            {
                name: "Hesham Abdul Wahab",
                role: "Music Director",
                image: "/artists/hesham.jpeg",
                gradient: "from-black/20 via-black/10 to-black/80",
            },
            

            {
                name: "DJ Notorious",
                role: "DJ",
                image: "/artists/notorious.png",
                gradient: "from-black/20 via-black/10 to-black/80",
            },
        ],
    },
    {
        id: 2,
        label: "DAY 2",
        date: "FEB 23",
        color: "from-purple-500 to-pink-500",
        accentColor: "purple",
        borderColor: "border-purple-500/40",
        glowColor: "rgba(168, 85, 247, 0.4)",
        textColor: "text-purple-400",
        bgAccent: "bg-purple-500",
        artists: [
            {
                name: "Band Circles",
                role: "Live Band",
                image: "/artists/circles.png",
                gradient: "from-black/20 via-black/10 to-black/80",
            },
            {
                name: "Band Macca",
                role: "Live Band",
                image: "/artists/macca.png",
                gradient: "from-black/20 via-black/10 to-black/80",
            },
            {
                name: "Darshan Raval",
                role: "Playback Singer",
                image: "/artists/darshan.png",
                gradient: "from-black/20 via-black/10 to-black/80",
            },
            {
                name: "DJ Teri Miko",
                role: "DJ",
                image: "/artists/terimiko.png",
                gradient: "from-black/20 via-black/10 to-black/80",
            },
        ],
    },
    {
        id: 3,
        label: "DAY 3",
        date: "FEB 24",
        color: "from-amber-400 to-orange-500",
        accentColor: "amber",
        borderColor: "border-amber-400/40",
        glowColor: "rgba(251, 191, 36, 0.4)",
        textColor: "text-amber-400",
        bgAccent: "bg-amber-400",
        artists: [
            {
                name: "Pineapple Express",
                role: "Live Band",
                image: "/artists/pineapple.png",
                gradient: "from-black/20 via-black/10 to-black/80",
            },
            {
                name: "Mohan Sisters Live",
                role: "Live Performers",
                image: "/artists/mohan-sisters.png",
                gradient: "from-black/20 via-black/10 to-black/80",
            },

            {
                name: "DJ Prithvi Sai",
                role: "DJ",
                image: "/artists/prithvi.png",
                gradient: "from-black/20 via-black/10 to-black/80",
            },
        ],
    },
];

// Fallback gradient backgrounds using artist initials
const getInitials = (name) =>
    name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

const gradientFallbacks = [
    "from-lime-600 via-emerald-700 to-green-900",
    "from-emerald-600 via-teal-700 to-cyan-900",
    "from-green-600 via-lime-700 to-emerald-900",
    "from-purple-600 via-fuchsia-700 to-pink-900",
    "from-fuchsia-600 via-purple-700 to-violet-900",
    "from-violet-600 via-indigo-700 to-purple-900",
    "from-amber-600 via-orange-700 to-red-900",
    "from-yellow-600 via-amber-700 to-orange-900",
    "from-orange-600 via-red-700 to-rose-900",
];

function ArtistCard({ artist, index, day, fallbackGradient }) {
    const [imgError, setImgError] = useState(false); // default to fallback until images are added

    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <div
                className={`relative overflow-hidden rounded-2xl border-2 ${day.borderColor} bg-black/60 backdrop-blur-sm transition-all duration-500 hover:scale-[1.03] aspect-[3/4]`}
                style={{
                    boxShadow: `0 0 0px ${day.glowColor}`,
                    transition: "box-shadow 0.5s ease, transform 0.5s ease",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 40px ${day.glowColor}`)
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0px ${day.glowColor}`)
                }
            >
                {/* Background — Image or Gradient Fallback */}
                {!imgError ? (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={artist.image}
                            alt={artist.name}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                            onError={() => setImgError(true)}
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                ) : (
                    <div
                        className={`absolute inset-0 z-0 bg-gradient-to-br ${fallbackGradient}`}
                    >
                        {/* Large initials as background pattern */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[120px] md:text-[160px] font-anton text-white/[0.06] select-none leading-none">
                                {getInitials(artist.name)}
                            </span>
                        </div>
                        {/* Subtle grid pattern */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                                backgroundSize: "30px 30px",
                            }}
                        />
                    </div>
                )}

                {/* Gradient overlay */}
                <div
                    className={`absolute inset-0 z-[1] bg-gradient-to-t ${artist.gradient}`}
                />

                {/* Noise texture */}
                <div
                    className="absolute inset-0 z-[2] opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />





                {/* Shine effect on hover */}
                <div className="absolute inset-0 z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                </div>
            </div>
        </motion.div>
    );
}

export default function ArtistsSection() {
    const [activeDay, setActiveDay] = useState(0);
    const currentDay = days[activeDay];

    return (
        <section className="bg-[#050505] py-16 md:py-28 relative overflow-hidden border-y border-lime-400/20">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(190, 242, 100, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(190, 242, 100, 0.08) 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            {/* Radial Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[160px] transition-all duration-1000 pointer-events-none"
                style={{
                    background:
                        activeDay === 0
                            ? "radial-gradient(circle, rgba(190,242,100,0.3), transparent 70%)"
                            : activeDay === 1
                                ? "radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)"
                                : "radial-gradient(circle, rgba(251,191,36,0.3), transparent 70%)",
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="mb-12 md:mb-16 text-center"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="inline-flex items-center border border-lime-400/30 rounded-full px-4 py-2 bg-lime-400/5 backdrop-blur-md mb-6">
                        <span className="text-lime-400 font-outfit font-semibold tracking-wider text-[10px] md:text-sm uppercase">
                            ✦ Artist Lineup Revealed ✦
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-anton text-white uppercase mb-4 leading-none">
                        PROSHOW{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-400 to-lime-400">
                            LINEUP
                        </span>
                    </h2>

                    <p className="text-white/50 font-outfit text-sm md:text-lg max-w-lg mx-auto">
                        3 Nights. 10 Acts. One Unforgettable Experience.
                    </p>

                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent mx-auto mt-6" />
                </motion.div>

                {/* Day Tabs */}
                <motion.div
                    className="flex justify-center gap-2 md:gap-4 mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    {days.map((day, idx) => (
                        <button
                            key={day.id}
                            onClick={() => setActiveDay(idx)}
                            className={`relative group cursor-pointer px-5 py-3 md:px-8 md:py-4 font-anton text-sm md:text-lg uppercase tracking-wider transition-all duration-500 rounded-xl border-2 ${activeDay === idx
                                ? `${day.borderColor} bg-white/5`
                                : "border-white/10 bg-transparent hover:border-white/20 hover:bg-white/[0.02]"
                                }`}
                            style={
                                activeDay === idx
                                    ? { boxShadow: `0 0 30px ${day.glowColor.replace("0.4", "0.15")}` }
                                    : {}
                            }
                        >
                            <span
                                className={`transition-colors duration-300 ${activeDay === idx ? day.textColor : "text-white/40"
                                    }`}
                            >
                                {day.label}
                            </span>
                            <span
                                className={`block text-[10px] md:text-xs font-outfit tracking-widest mt-0.5 transition-colors duration-300 ${activeDay === idx ? "text-white/60" : "text-white/20"
                                    }`}
                            >
                                {day.date}
                            </span>

                            {/* Active indicator line */}
                            {activeDay === idx && (
                                <motion.div
                                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] rounded-full bg-gradient-to-r ${day.color}`}
                                    layoutId="activeTab"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Artist Cards Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeDay}
                        className={`grid grid-cols-1 ${currentDay.artists.length === 4 ? "md:grid-cols-4 max-w-7xl" : "md:grid-cols-3 max-w-5xl"} gap-5 md:gap-6 mx-auto`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentDay.artists.map((artist, idx) => (
                            <ArtistCard
                                key={artist.name}
                                artist={artist}
                                index={idx}
                                day={currentDay}
                                fallbackGradient={
                                    gradientFallbacks[activeDay * 3 + idx] || gradientFallbacks[0]
                                }
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Bottom decorative element */}
                <motion.div
                    className="mt-12 md:mt-16 flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/20" />
                    <span className="text-white/20 font-outfit text-xs uppercase tracking-[0.3em]">
                        Feb 22 – 24, 2026
                    </span>
                    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-white/20" />
                </motion.div>
            </div>

            {/* Styled JSX for animations */}
            <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
        </section>
    );
}
