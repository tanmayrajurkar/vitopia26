"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const ExplosionEffect = () => {
    const sparks = useMemo(() =>
        Array.from({ length: 60 }, (_, i) => {
            const angle = (i / 60) * 360 + (Math.random() - 0.5) * 30;
            return {
                angle, velocity: 200 + Math.random() * 800,
                size: 2 + Math.random() * 8, delay: Math.random() * 0.12,
                dur: 0.5 + Math.random() * 0.8, isHot: Math.random() > 0.4,
            };
        }), []);

    const smokeBlobs = useMemo(() =>
        Array.from({ length: 12 }, () => ({
            x: (Math.random() - 0.5) * 400, y: -100 - Math.random() * 300,
            size: 60 + Math.random() * 120, delay: Math.random() * 0.3,
        })), []);

    const debris = useMemo(() =>
        Array.from({ length: 15 }, () => ({
            angle: Math.random() * 360, velocity: 150 + Math.random() * 400,
            size: 4 + Math.random() * 10, delay: Math.random() * 0.1,
            rotation: Math.random() * 720 - 360,
        })), []);

    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
            {/* Central fireball */}
            <motion.div
                className="absolute w-32 h-32 rounded-full"
                style={{ background: "radial-gradient(circle, #fff 0%, #FFD54F 30%, #FF6F00 60%, transparent 100%)" }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 6, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            />
            {/* Shockwave rings */}
            <motion.div className="absolute w-10 h-10 rounded-full border-[3px] border-orange-300/80"
                initial={{ scale: 0, opacity: 1 }} animate={{ scale: 50, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }} />
            <motion.div className="absolute w-10 h-10 rounded-full border-2 border-yellow-200/40"
                initial={{ scale: 0, opacity: 1 }} animate={{ scale: 35, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} />
            {/* Sparks */}
            {sparks.map((s, i) => (
                <motion.div key={`s-${i}`} className="absolute rounded-full"
                    style={{
                        width: s.size, height: s.size,
                        background: s.isHot ? "radial-gradient(circle, #fff, #FFD54F, #FF6F00)" : "radial-gradient(circle, #FF8A65, #D84315)",
                        boxShadow: s.isHot ? "0 0 8px 2px rgba(255,200,0,0.6)" : "0 0 4px 1px rgba(255,100,0,0.4)",
                    }}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{ opacity: 0, x: Math.cos((s.angle * Math.PI) / 180) * s.velocity, y: Math.sin((s.angle * Math.PI) / 180) * s.velocity, scale: 0 }}
                    transition={{ duration: s.dur, ease: "easeOut", delay: s.delay }} />
            ))}
            {/* Debris */}
            {debris.map((d, i) => (
                <motion.div key={`d-${i}`} className="absolute bg-neutral-700 rounded-sm"
                    style={{ width: d.size, height: d.size * 0.6 }}
                    initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                    animate={{ opacity: 0, x: Math.cos((d.angle * Math.PI) / 180) * d.velocity, y: Math.sin((d.angle * Math.PI) / 180) * d.velocity + 200, rotate: d.rotation }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: d.delay }} />
            ))}
            {/* Smoke */}
            {smokeBlobs.map((sm, i) => (
                <motion.div key={`sm-${i}`} className="absolute rounded-full bg-neutral-800/60 blur-2xl"
                    style={{ width: sm.size, height: sm.size }}
                    initial={{ opacity: 0.6, x: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, x: sm.x, y: sm.y, scale: 2 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.15 + sm.delay }} />
            ))}
        </div>
    );
};

/* ═══════════════════════════════════════════
   TIME FORMAT HELPERS
   ═══════════════════════════════════════════ */
function formatTime(totalSeconds) {
    if (totalSeconds <= 0) return { h: "00", m: "00", s: "00" };
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    return {
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
    };
}

/* ═══════════════════════════════════════════
   UNIFIED BOMB SVG
   viewBox: 300 × 460
   Bomb centre: (150, 310), radius: 130
   Fuse path: bomb-base (start) → tip (end)
   Flame burns from tip → toward bomb
   
   KEY: Both fuse burn & flame position are driven
   by the SAME `remaining` fraction (0–1) via inline
   style, NOT via framer-motion animate, so they are
   guaranteed to be in perfect sync every frame.
   ═══════════════════════════════════════════ */
const FUSE_PATH = "M 150 175 C 130 140, 100 130, 110 100 S 150 50, 180 30";

const BombSVG = ({ remaining, timeDisplay, isUrgent }) => {
    // remaining: 1 = full fuse, 0 = fully burnt
    // burnt portion = 1 - remaining (drawn from tip end)
    const burnt = 1 - remaining;

    return (
        <svg
            viewBox="0 0 300 460"
            className="w-[260px] h-[380px] md:w-[320px] md:h-[470px] select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient id="bombBody" cx="38%" cy="32%" r="65%">
                    <stop offset="0%" stopColor="#666" />
                    <stop offset="35%" stopColor="#333" />
                    <stop offset="70%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#0a0a0a" />
                </radialGradient>
                <radialGradient id="specular" cx="32%" cy="28%" r="30%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                <radialGradient id="rimLight" cx="50%" cy="90%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,80,0,0.08)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <filter id="flameGlow" x="-150%" y="-150%" width="400%" height="400%">
                    <feGaussianBlur stdDeviation="5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="screenGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            {/* ── BOMB BODY ── */}
            <circle cx="150" cy="310" r="130" fill="url(#bombBody)" />
            <circle cx="150" cy="310" r="130" fill="none" stroke="#444" strokeWidth="3" />
            <circle cx="150" cy="310" r="127" fill="none" stroke="#222" strokeWidth="1" />
            <circle cx="150" cy="310" r="130" fill="url(#specular)" />
            <circle cx="150" cy="310" r="130" fill="url(#rimLight)" />

            {/* Rivets */}
            {[0, 60, 120, 180, 240, 300].map((a) => {
                const r = 118;
                const cx = 150 + r * Math.cos((a * Math.PI) / 180);
                const cy = 310 + r * Math.sin((a * Math.PI) / 180);
                return (
                    <g key={a}>
                        <circle cx={cx} cy={cy} r="5" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
                        <circle cx={cx - 1} cy={cy - 1} r="1.5" fill="#555" />
                    </g>
                );
            })}

            {/* ── FUSE CAP ── */}
            <rect x="125" y="170" width="50" height="22" rx="4" fill="#3a3a3a" stroke="#555" strokeWidth="1.5" />
            <line x1="130" y1="176" x2="170" y2="176" stroke="#555" strokeWidth="0.8" />
            <line x1="130" y1="181" x2="170" y2="181" stroke="#555" strokeWidth="0.8" />
            <line x1="130" y1="186" x2="170" y2="186" stroke="#555" strokeWidth="0.8" />
            <rect x="128" y="172" width="44" height="3" rx="1" fill="rgba(255,255,255,0.06)" />

            {/* ── FUSE CORD ── */}
            <path d={FUSE_PATH} stroke="#3E2723" strokeWidth="7" strokeLinecap="round" />
            <path d={FUSE_PATH} stroke="#6D4C41" strokeWidth="5" strokeLinecap="round" />
            <path d={FUSE_PATH} stroke="#8D6E63" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

            {/* Burnt overlay — drawn from the TIP end backward
          pathLength="1" lets us use normalised dash values.
          dasharray = "burnt 1"  draws `burnt` length, then a gap longer than the rest
          dashoffset = -remaining  shifts the drawn segment to start at the `remaining` point
          → the dark overlay covers from position `remaining` to 1.0 (tip→burnt portion) */}
            {burnt > 0.001 && (
                <path
                    d={FUSE_PATH}
                    stroke="#333"
                    strokeWidth="5"
                    strokeLinecap="round"
                    pathLength="1"
                    strokeDasharray={`${burnt} 1`}
                    strokeDashoffset={`${-remaining}`}
                />
            )}

            {/* ── FLAME — inline style, perfectly synced with fuse ── */}
            {/* offsetDistance = remaining*100% means flame sits at the boundary
          between unburnt (0→remaining) and burnt (remaining→1) */}
            <g
                filter="url(#flameGlow)"
                style={{
                    offsetPath: `path("${FUSE_PATH}")`,
                    offsetRotate: "0deg",
                    offsetDistance: `${remaining * 100}%`,
                }}
            >
                {/* Outer flame */}
                <ellipse cx="0" cy="-12" rx="8" ry="18" fill="#FF6D00">
                    <animate attributeName="ry" values="18;24;16;22;18" dur="0.35s" repeatCount="indefinite" />
                    <animate attributeName="rx" values="8;6;9;7;8" dur="0.35s" repeatCount="indefinite" />
                </ellipse>
                {/* Mid flame */}
                <ellipse cx="0" cy="-9" rx="5" ry="13" fill="#FFB300">
                    <animate attributeName="ry" values="13;17;11;15;13" dur="0.28s" repeatCount="indefinite" />
                    <animate attributeName="rx" values="5;4;6;4;5" dur="0.28s" repeatCount="indefinite" />
                </ellipse>
                {/* Inner flame */}
                <ellipse cx="0" cy="-6" rx="3" ry="8" fill="#FFF9C4">
                    <animate attributeName="ry" values="8;11;7;10;8" dur="0.22s" repeatCount="indefinite" />
                </ellipse>
                {/* White-hot core */}
                <circle cx="0" cy="0" r="4" fill="#FFF" opacity="0.95" />
            </g>

            {/* ── TIMER DISPLAY ── */}
            <rect x="68" y="278" width="164" height="64" rx="10" fill="#111" stroke="#333" strokeWidth="2" />
            <rect x="74" y="284" width="152" height="52" rx="7" fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="1" />
            <rect x="76" y="285" width="148" height="14" rx="5" fill="rgba(255,255,255,0.03)" />
            {/* LED indicator dots */}
            <circle cx="84" cy="293" r="2" fill={isUrgent ? "#EF4444" : "#7F1D1D"} />
            <circle cx="216" cy="293" r="2" fill={isUrgent ? "#EF4444" : "#7F1D1D"} />

            {/* HH : MM : SS */}
            <text
                x="150" y="316"
                textAnchor="middle" dominantBaseline="central"
                fontFamily="monospace" fontSize="28" fontWeight="bold" letterSpacing="2"
                fill={isUrgent ? "#EF4444" : "#DC2626"}
                filter={isUrgent ? "url(#screenGlow)" : undefined}
            >
                {timeDisplay.h}:{timeDisplay.m}:{timeDisplay.s}
            </text>
        </svg>
    );
};

/* ═══════════════════════════════════════
   MAIN COMPONENT
   
   Phases:
     "loading"    → fetching initial data
     "countdown"  → bomb visible, timer ticking
     "exploding"  → bomb gone, particles playing, fetching artists
     "revealed"   → artist cards visible
   ═══════════════════════════════════════ */
export default function ArtistRevealSection() {
    const [phase, setPhase] = useState("loading");
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(1);
    const [artists, setArtists] = useState([]);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    // ── Initial fetch — only when section scrolls into view ──
    useEffect(() => {
        if (!isInView) return;
        fetch("/api/lineup")
            .then((r) => r.json())
            .then((data) => {
                if (data.revealed) {
                    // Already revealed → show explosion intro then cards
                    setArtists(data.artists);
                    setPhase("exploding");
                    setTimeout(() => setPhase("revealed"), 1200);
                } else {
                    const revealTime = new Date(data.revealTimestamp).getTime();
                    const now = Date.now();
                    const diff = Math.max(1, Math.floor((revealTime - now) / 1000));
                    setSecondsLeft(diff);
                    setTotalSeconds(diff);
                    setPhase("countdown");
                }
            })
            .catch(() => {
                setPhase("countdown");
                setSecondsLeft(0);
                setTotalSeconds(1);
            });
    }, [isInView]);

    // ── Countdown tick ──
    useEffect(() => {
        if (phase !== "countdown" || secondsLeft <= 0) return;
        const id = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(id);
                    triggerExplosion();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase, secondsLeft > 0]);

    // Explosion: bomb disappears IMMEDIATELY, then fetch artists in background
    const triggerExplosion = useCallback(() => {
        setPhase("exploding");

        // After explosion animation, show cards (even if fetch isn't done yet)
        const revealTimeout = setTimeout(() => setPhase("revealed"), 1200);

        // Fetch artists in background — poll if needed
        const fetchArtists = async () => {
            let attempts = 0;
            while (attempts < 10) {
                try {
                    const res = await fetch("/api/lineup");
                    const data = await res.json();
                    if (data.revealed && data.artists?.length > 0) {
                        setArtists(data.artists);
                        return;
                    }
                } catch (e) { /* retry */ }
                attempts++;
                await new Promise((r) => setTimeout(r, 1500));
            }
        };
        fetchArtists();

        return () => clearTimeout(revealTimeout);
    }, []);

    // Derived values
    const remaining = totalSeconds > 0
        ? Math.max(0, Math.min(1, secondsLeft / totalSeconds))
        : 0;
    const timeDisplay = formatTime(secondsLeft);
    const isUrgent = secondsLeft > 0 && secondsLeft < 60;

    if (phase === "loading") {
        return (
            <section ref={sectionRef} className="relative min-h-screen w-full bg-black" />
        );
    }

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-20"
        >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-950/20 blur-[140px]" />
            </div>
            {/* Grid */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }} />

            <AnimatePresence mode="wait">
                {phase === "countdown" && (
                    /* ───── COUNTDOWN ───── */
                    <motion.div
                        key="bomb"
                        className="relative z-10 flex flex-col items-center justify-center"
                        exit={{ opacity: 0, scale: 4, filter: "blur(40px)" }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Label */}
                        <motion.div className="mb-6 text-center"
                            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}>
                            <span className="text-lime-400/60 font-mono text-lg font-bold md:text-3xl tracking-[0.3em] uppercase">
                                Pro-Show Artist Reveal
                            </span>
                        </motion.div>

                        <motion.div
                            className="relative"
                            animate={
                                isUrgent
                                    ? { scale: [1, 1.06, 0.97, 1.04, 1], rotate: [-1, 1.5, -2, 1, 0] }
                                    : { y: [0, -6, 0] }
                            }
                            transition={
                                isUrgent
                                    ? { duration: 0.2, repeat: Infinity }
                                    : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                            }
                        >
                            {isUrgent && (
                                <motion.div
                                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-52 h-20 rounded-full bg-red-600/25 blur-3xl"
                                    animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.15, 1] }}
                                    transition={{ duration: 0.3, repeat: Infinity }}
                                />
                            )}
                            <BombSVG remaining={remaining} timeDisplay={timeDisplay} isUrgent={isUrgent} />
                        </motion.div>

                        <motion.p
                            className="mt-6 text-xl md:text-2xl font-anton text-white/30 tracking-[0.2em] uppercase select-none"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            Detonation in{" "}
                            <span className="text-red-500/80 drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                                {timeDisplay.h}h {timeDisplay.m}m {timeDisplay.s}s
                            </span>
                        </motion.p>
                    </motion.div>
                )}

                {phase === "exploding" && (
                    /* ───── EXPLOSION ───── */
                    <motion.div
                        key="explosion"
                        className="relative z-30 w-full h-full flex items-center justify-center"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ExplosionEffect />
                        {/* Full-screen flash */}
                        <motion.div
                            className="fixed inset-0 z-50 pointer-events-none"
                            style={{ background: "radial-gradient(circle, #fff 0%, #FFD54F 40%, transparent 80%)" }}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                    </motion.div>
                )}

                {phase === "revealed" && (
                    /* ───── REVEALED ───── */
                    <motion.div key="reveal" className="w-full z-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}>

                        <div className="container mx-auto px-4">
                            <motion.div className="text-center mb-12"
                                initial={{ y: 60, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1, duration: 0.8, type: "spring" }}>
                                <h2 className="text-5xl md:text-8xl lg:text-9xl font-anton text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 uppercase tracking-tighter">
                                    LINEUP REVEALED
                                </h2>
                                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent mx-auto mt-4" />
                            </motion.div>

                            {/* Artist Cards */}
                            {artists.length > 0 ? (
                                <div className="flex gap-6 md:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar px-4">
                                    {artists.map((artist, idx) => (
                                        <motion.div key={idx}
                                            className="min-w-[280px] md:min-w-[380px] snap-center flex-shrink-0"
                                            initial={{ y: 100, opacity: 0, rotateZ: 4 }}
                                            animate={{ y: 0, opacity: 1, rotateZ: 0 }}
                                            transition={{ delay: 0.2 + idx * 0.15, duration: 0.7, type: "spring", stiffness: 100 }}>
                                            <div className="relative h-[450px] md:h-[520px] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer bg-neutral-900 transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(190,242,100,0.15)]">
                                                {/* Artist Image */}
                                                {artist.image && (
                                                    <img
                                                        src={artist.image}
                                                        alt={artist.name}
                                                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                                                    />
                                                )}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${artist.color} opacity-15 group-hover:opacity-25 transition-opacity duration-500`} />
                                                {!artist.image && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-8xl opacity-[0.06] font-anton select-none">?</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 md:p-8 flex flex-col justify-end">
                                                    <span className="text-lime-400 font-mono text-xs tracking-widest mb-3 border border-lime-400/30 self-start px-3 py-1 rounded-full bg-lime-400/10">{artist.role}</span>
                                                    <h3 className="text-3xl md:text-5xl font-anton text-white uppercase mb-1 leading-[0.95] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{artist.name}</h3>
                                                    <p className="text-white/60 font-outfit text-base md:text-lg">{artist.date} • 7:00 PM</p>
                                                </div>
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <motion.div
                                        className="inline-block w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    <p className="text-white/40 font-outfit mt-4">Loading lineup...</p>
                                </div>
                            )}

                            <motion.div className="text-center mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                                <button onClick={() => document.getElementById("card-section")?.scrollIntoView({ behavior: "smooth" })}
                                    className="px-10 py-3.5 rounded-full border border-white/20 text-white font-outfit uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                                    Explore All Events
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}
