"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Hls from "hls.js";

// Instant load (100–150ms): single MP4 URL (use faststart: ffmpeg -i in -c copy -movflags +faststart out.mp4)
const getHeroMp4Url = () => process.env.NEXT_PUBLIC_HERO_VIDEO_MP4_URL?.trim() || "";

// HLS: hybrid (first 10 segments from repo) or full Supabase URL
const getHlsManifestUrl = () => {
    const override = typeof process !== "undefined" && process.env.NEXT_PUBLIC_HLS_VIDEO_URL;
    if (override) return override.trim();
    const hybrid = typeof process !== "undefined" && process.env.NEXT_PUBLIC_USE_HYBRID_HLS;
    if (hybrid) return "/hls/index.m3u8"; // same-origin; resolve to full URL in effect
    const base = typeof process !== "undefined" && process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (base) return `${String(base).replace(/\/$/, "")}/storage/v1/object/public/video/index.m3u8`;
    return "";
};

const HERO_MP4_URL = getHeroMp4Url();
const HLS_MANIFEST_URL = getHlsManifestUrl();
const USE_MP4 = !!HERO_MP4_URL;

const TEXT_FADE_DELAY_MS = 1500; // 1.5s after video starts, then hero text fades

export default function HeroSection() {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);
    const textFadeTimeoutRef = useRef(null);
    const [videoElMounted, setVideoElMounted] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);
    const [textFaded, setTextFaded] = useState(false); // true = hide hero text (after delay from video start)
    const [slide, setSlide] = useState(0); // 0 = video (first), 1 = image
    const [soundUnlocked, setSoundUnlocked] = useState(false); // true after first real user click (required by browsers for unmuted play)
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const m = window.matchMedia("(min-width: 768px)");
        setIsDesktop(m.matches);
        const handler = () => setIsDesktop(m.matches);
        m.addEventListener("change", handler);
        return () => m.removeEventListener("change", handler);
    }, []);

    const setVideoRef = (el) => {
        videoRef.current = el;
        setVideoElMounted(!!el);
    };

    useEffect(() => {
        if (typeof window === "undefined" || !videoElMounted) return;
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        if (!isDesktop) return;

        const video = videoRef.current;
        if (!video) return;

        const onPlay = () => {
            setVideoStarted(true);
            if (textFadeTimeoutRef.current) clearTimeout(textFadeTimeoutRef.current);
            textFadeTimeoutRef.current = setTimeout(() => setTextFaded(true), TEXT_FADE_DELAY_MS);
        };
        const onEnded = () => setSlide(1);

        video.addEventListener("play", onPlay);
        video.addEventListener("ended", onEnded);

        if (USE_MP4 && HERO_MP4_URL) {
            const onCanPlay = () => setVideoReady(true);
            video.addEventListener("canplay", onCanPlay, { once: true });
            video.addEventListener("loadeddata", onCanPlay, { once: true });
            return () => {
                video.removeEventListener("play", onPlay);
                video.removeEventListener("ended", onEnded);
                if (textFadeTimeoutRef.current) clearTimeout(textFadeTimeoutRef.current);
            };
        }

        if (!HLS_MANIFEST_URL) {
            if (typeof window !== "undefined") console.warn("[Hero] No video URL. Set NEXT_PUBLIC_HERO_VIDEO_MP4_URL or NEXT_PUBLIC_SUPABASE_URL.");
            return () => {
                video.removeEventListener("play", onPlay);
                video.removeEventListener("ended", onEnded);
            };
        }

        const manifestUrl = HLS_MANIFEST_URL.startsWith("/") ? window.location.origin + HLS_MANIFEST_URL : HLS_MANIFEST_URL;
        let retryCount = 0;
        let cancelled = false;
        const MAX_RETRY = 1;

        const initHls = () => {
            if (cancelled || !videoRef.current) return;
            if (hlsRef.current) return;
            const v = videoRef.current;
            if (Hls.isSupported()) {
                const hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: false,
                    maxBufferLength: 20,
                    maxMaxBufferLength: 30,
                    maxBufferSize: 30 * 1000 * 1000,
                    maxBufferHole: 0.5,
                    xhrSetup(xhr) {
                        xhr.withCredentials = false;
                    },
                });
                hlsRef.current = hls;
                hls.on(Hls.Events.MANIFEST_PARSED, () => setVideoReady(true));
                hls.on(Hls.Events.LEVEL_LOADED, () => setVideoReady((r) => r || true));
                hls.on(Hls.Events.ERROR, (_, data) => {
                    if (!data.fatal) return;
                    const fragUrl = data.frag?.url ?? data.url ?? "(unknown)";
                    console.error("[Hero HLS] Fatal error:", data.type, data.details, "fragment:", fragUrl);
                    hlsRef.current?.destroy();
                    hlsRef.current = null;
                    if (!cancelled && retryCount < MAX_RETRY && videoRef.current) {
                        retryCount += 1;
                        setTimeout(initHls, 600);
                    }
                });
                hls.loadSource(manifestUrl);
                hls.attachMedia(v);
            } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
                v.src = manifestUrl;
                v.addEventListener("loadedmetadata", () => setVideoReady(true), { once: true });
                v.addEventListener("error", () => console.error("[Hero HLS] Video load error"));
            }
        };

        const runAfterLayout = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (!cancelled && videoRef.current && !hlsRef.current) initHls();
                });
            });
        };
        const timeoutId = setTimeout(runAfterLayout, 0);

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
            if (videoRef.current) {
                videoRef.current.removeEventListener("play", onPlay);
                videoRef.current.removeEventListener("ended", onEnded);
            }
            if (textFadeTimeoutRef.current) clearTimeout(textFadeTimeoutRef.current);
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [videoElMounted]);

    // Start playback muted immediately (browsers allow this); unmuted play needs one real user click
    useEffect(() => {
        if (!videoReady || !videoRef.current || slide !== 0) return;
        const el = videoRef.current;
        el.muted = true;
        el.currentTime = 0;
        el.play().catch(() => {});
    }, [videoReady, slide]);

    // Unlock sound on first real user click (browsers require a real gesture for unmuted play)
    const handleUnlockSound = React.useCallback((e) => {
        if (slide !== 0 || !videoRef.current) return;
        setSoundUnlocked(true);
        const el = videoRef.current;
        el.muted = false;
        el.play().catch(() => {});
    }, [slide]);

    // Unmute + play when user clicks/hovers elsewhere (e.g. after overlay is gone)
    const handleUnmute = React.useCallback(() => {
        if (slide !== 0 || !videoRef.current) return;
        const el = videoRef.current;
        el.muted = false;
        el.play().catch(() => {});
    }, [slide]);

    // When switching to video frame (slide 0): show text again until fade delay after play
    useEffect(() => {
        if (slide === 0) setTextFaded(false);
    }, [slide]);

    // On mobile (no video): auto-advance to slide 1 after delay
    useEffect(() => {
        if (typeof window === "undefined") return;
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        if (isDesktop) return;
        const t = setTimeout(() => setSlide(1), 4000);
        return () => clearTimeout(t);
    }, []);

    // When returning to slide 0: play muted (sound unlocks on next real click if needed)
    useEffect(() => {
        if (slide !== 0 || !videoRef.current) return;
        const v = videoRef.current;
        v.muted = !soundUnlocked;
        v.currentTime = 0;
        v.play().catch(() => {});
    }, [slide, videoReady, soundUnlocked]);

    // When on image slide (slide 1), pause video only (keep unmuted)
    useEffect(() => {
        if (slide !== 1 || !videoRef.current) return;
        const v = videoRef.current;
        try {
            v.pause();
        } catch (_) {}
    }, [slide]);

    // After 5 sec on image frame, auto-return to video frame
    useEffect(() => {
        if (slide !== 1) return;
        const t = setTimeout(() => setSlide(0), 5000);
        return () => clearTimeout(t);
    }, [slide]);

    // Show hero text: on image frame always; on video frame until 1.5s after video starts
    const showText = slide === 1 || !textFaded;

    return (
        <section
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-12 md:py-20"
            onClick={handleUnmute}
            onPointerEnter={handleUnmute}
        >
            {/* One-time overlay: click anywhere to enable sound (browser requires real user gesture) */}
            {slide === 0 && !soundUnlocked && (
                <button
                    type="button"
                    onClick={handleUnlockSound}
                    className="absolute inset-0 z-[5] cursor-pointer md:block hidden"
                    aria-label="Click to play sound"
                />
            )}
            {/* Slide 0: Mobile – image + text until "advance" */}

            {/* Desktop: sliding “scroll” between video and image frames */}
            <motion.div
                className="absolute inset-0 z-0 overflow-hidden flex"
                animate={{ x: isDesktop ? (slide === 0 ? "0%" : "-50%") : "0%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "200%" }}
            >
                {/* Frame 0: HLS video (desktop only; hidden on mobile) */}
                <div className="relative flex-shrink-0 w-1/2 h-full overflow-hidden pointer-events-none hidden md:block">
                    <div
                        className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-70"
                        style={{ visibility: slide === 0 ? "visible" : "hidden" }}
                    >
                        <video
                            ref={setVideoRef}
                            src={USE_MP4 ? HERO_MP4_URL : undefined}
                            className="absolute inset-0 w-full h-full object-cover bg-black"
                            playsInline
                            muted
                            loop={false}
                            preload="auto"
                            aria-label="Hero background video"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                {/* Frame 1: image */}
                <div className="relative flex-shrink-0 w-1/2 h-full overflow-hidden">
                    <Image
                        src="/hero-image.png"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            </motion.div>

            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] z-0" />

            {/* Gradient Blobs - only on slide 0 / when no image bg */}
            {slide === 0 && (
                <>
                    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />
                </>
            )}

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 10 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl mx-auto text-center"
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center border border-lime-400/30 rounded-full px-4 py-2 bg-lime-400/5 backdrop-blur-md mb-4 md:mb-2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                    >
                        <span className="text-lime-400 font-outfit font-semibold tracking-wider text-[10px] md:text-sm uppercase">
                            The Ultimate Fest of VIT-AP
                        </span>
                    </motion.div>

                    {/* Date Display - Highly Visible */}
                    <motion.div
                        className="mb-4 md:mb-6 flex flex-col items-center justify-center leading-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="text-2xl md:text-5xl font-anton text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-white to-lime-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.5)] tracking-wider">
                            22 - 24 FEB 2026
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="text-[16vw] sm:text-[15vw] md:text-[12vw] leading-[0.85] font-anton text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 uppercase select-none tracking-tight mb-4 md:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        VITOPIA
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.div
                        className="flex items-center justify-center gap-4 md:gap-6 text-xl md:text-5xl lg:text-6xl font-black italic tracking-tight mb-6 md:mb-5"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400 py-1 px-1 md:px-2">SPORT</span>
                        <span className="text-xl md:text-5xl font-light italic text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-white to-purple-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">×</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 py-1 px-1 md:px-2">CULTURE</span>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        className="max-w-2xl hidden md:block mx-auto text-gray-400 text-base md:text-lg lg:text-xl font-outfit leading-relaxed mb-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Experience the 3-day saga of adrenaline, art, and innovation.
                        <br className="hidden sm:block" />
                        Join us for the most electrifying event of the year.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm mx-auto sm:max-w-none"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Link href={"/culturals"} className="w-full sm:w-auto text-center cursor-pointer px-8 py-3.5 md:px-10 md:py-4 bg-gradient-to-r from-lime-400 to-green-400 text-black font-anton text-sm md:text-lg uppercase tracking-wider hover:from-lime-300 hover:to-green-300 transition-all duration-300 shadow-[0_0_30px_rgba(190,242,100,0.4)] hover:shadow-[0_0_50px_rgba(190,242,100,0.6)] hover:scale-105">
                            View Events
                        </Link>
                        <button onClick={() => { document.getElementById("card-section").scrollIntoView({ behavior: "smooth" }) }} className="w-full sm:w-auto cursor-pointer px-8 py-3.5 md:px-10 md:py-4 border-2 border-white/20 text-white font-anton text-sm md:text-lg uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm">
                            Highlights
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Slide dots – center below (desktop only; mobile shows only image frame) */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center gap-2">
                <button
                    type="button"
                    aria-label="Slide 1"
                    onClick={() => setSlide(0)}
                    className={`w-2 h-2 rounded-full transition-colors ${slide === 0 ? "bg-white" : "bg-gray-500 hover:bg-gray-400"}`}
                />
                <button
                    type="button"
                    aria-label="Slide 2"
                    onClick={() => setSlide(1)}
                    className={`w-2 h-2 rounded-full transition-colors ${slide === 1 ? "bg-white" : "bg-gray-500 hover:bg-gray-400"}`}
                />
            </div>

            {/* Decorative Ticker */}
            <div className="absolute bottom-0 w-full border-t border-white/10 py-4 bg-black/50 backdrop-blur-sm overflow-hidden">
                <div className="ticker-wrapper">
                    <div className="ticker-content whitespace-nowrap flex gap-12 text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">
                        {Array(8).fill("•  Feb 22-24, 2026  •  Register Now  •  VITOPIA  ").map((item, i) => (
                            <span key={i}>{item}</span>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes ticker {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .ticker-wrapper {
                    display: flex;
                    will-change: transform;
                }

                .ticker-content {
                    animation: ticker 30s linear infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .ticker-content {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    );
}
