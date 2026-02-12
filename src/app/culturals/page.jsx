'use client'

import { Footer } from "@/components/Homepage/sections/footer";
import Navbar from "@/components/Homepage/sections/navbar";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IconSparkles, IconUsers, IconCalendar, IconMapPin, IconChevronRight, IconX, IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";

const artistVideos = [
    "/artist-videos/artist (1).mp4",
    "/artist-videos/artist (2).mp4",
    "/artist-videos/artist (3).mp4",
    "/artist-videos/artist (4).mp4",
    "/artist-videos/artist (5).mp4",
    "/artist-videos/artist (6).mp4",
    "/artist-videos/artist (7).mp4",
    "/artist-videos/artist (8).mp4",
    "/artist-videos/artist (9).mp4",
];

const culturalsData = [
    // --- Single Classic ---
    {
        id: 1,
        group: "Group - I",
        title: "V-Step Up: Classical Dance Battle",
        category: "Solo",
        firstPrize: "5,000",
        secondPrize: "2,500",
        externalFee: "200 per participant",
        internalFee: "100 per participant",
        description: "Showcase your classical dance skills in this solo battle.",
        image: "/culturals/vstep classical dance.webp",
        teamSize: "Solo",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 22, 2026",
        venue: "Main Auditorium"
    },
    {
        id: 5,
        group: "Group - II",
        title: "V-Rhythm: Classical Rhythm Battle",
        category: "Solo",
        firstPrize: "5,000",
        secondPrize: "2,500",
        externalFee: "200 per participant",
        internalFee: "100 per participant",
        description: "Express the rhythms of tradition in this solo classical event.",
        image: "/culturals/vrhythm solo classical.webp",
        teamSize: "Solo",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 23, 2026",
        venue: "Music Hall"
    },
    {
        id: 10,
        group: "Group - III",
        title: "V-Glam: Boys (Traditional)",
        category: "Solo",
        firstPrize: "5,000",
        secondPrize: "2,500",
        externalFee: "500 per participant",
        internalFee: "250 per participant",
        description: "Traditional fashion showcase for boys.",
        image: "/culturals/V-Glam (Fashion Show) Boys (treditional.webp",
        teamSize: "Solo",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 24, 2026",
        venue: "Ramp Stage"
    },
    {
        id: 12,
        group: "Group - III",
        title: "V-Glam: Girls (Traditional)",
        category: "Solo",
        firstPrize: "5,000",
        secondPrize: "2,500",
        externalFee: "500 per participant",
        internalFee: "250 per participant",
        description: "Traditional fashion showcase for girls.",
        image: "/culturals/V-Glam (Fashion Show) Girls (treditional).webp",
        teamSize: "Solo",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 24, 2026",
        venue: "Ramp Stage"
    },

    // --- Single Western ---
    {
        id: 2,
        group: "Group - I",
        title: "V-Step Up: Western Dance Battle",
        category: "Solo",
        firstPrize: "5,000",
        secondPrize: "2,500",
        externalFee: "200 per participant",
        internalFee: "100 per participant",
        description: "Unleash your energy in the western dance solo battle.",
        image: "/culturals/vstep weatern battle.webp",
        teamSize: "Solo",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 22, 2026",
        venue: "Main Auditorium"
    },
    {
        id: 6,
        group: "Group - II",
        title: "V-Rhythm: Western Rhythm Battle",
        category: "Solo",
        firstPrize: "5,000",
        secondPrize: "2,500",
        externalFee: "200 per participant",
        internalFee: "100 per participant",
        description: "Show off your western musical prowess.",
        image: "/culturals/vrhythm solo modern.webp",
        teamSize: "Solo",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 23, 2026",
        venue: "Music Hall"
    },
    {
        id: 11,
        group: "Group - III",
        title: "V-Glam: Boys (Western)",
        category: "Solo",
        firstPrize: "5,000",
        secondPrize: "2,500",
        externalFee: "500 per participant",
        internalFee: "250 per participant",
        description: "Western fashion showcase for boys.",
        image: "/culturals/V-Glam (Fashion Show) Boys (western)-1.webp",
        teamSize: "Solo",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 24, 2026",
        venue: "Ramp Stage"
    },
    {
        id: 13,
        group: "Group - III",
        title: "V-Glam: Girls (Western)",
        category: "Solo",
        firstPrize: "5,000",
        secondPrize: "2,500",
        externalFee: "500 per participant",
        internalFee: "250 per participant",
        description: "Western fashion showcase for girls.",
        image: "/culturals/V-Glam (Fashion Show) Girls (western.webp",
        teamSize: "Solo",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 24, 2026",
        venue: "Ramp Stage"
    },
    {
        id: 15,
        group: "Group - IV",
        title: "V-Stand-Up Comedy",
        category: "Solo",
        firstPrize: "5,000",
        secondPrize: "2,500",
        externalFee: "200 per participant",
        internalFee: "100 per participant",
        description: "Tickle our funny bones with your stand-up set.",
        image: "/culturals/V-Stand-Up Comedy-2.webp",
        teamSize: "Solo",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 24, 2026",
        venue: "Open Air Theatre"
    },

    // --- Group Classic ---
    {
        id: 3,
        group: "Group - I",
        title: "V-Step Up: Classical Group Battle",
        category: "Group",
        firstPrize: "12,000",
        secondPrize: "6,000",
        externalFee: "200 per participant",
        internalFee: "100 per participant",
        description: "Synchronize and mesmerize with your group classical performance.",
        image: "/culturals/vstep classical group.webp",
        teamSize: "Group",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 23, 2026",
        venue: "Main Auditorium"
    },
    {
        id: 8,
        group: "Group - II",
        title: "V-Rhythm: Battle of Bands (Classic)",
        category: "Group",
        firstPrize: "12,000",
        secondPrize: "6,000",
        externalFee: "200 per participant",
        internalFee: "100 per participant",
        description: "Classic rock and fusion bands face off.",
        image: "/culturals/vrhythm classical group.webp",
        teamSize: "Group",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 22, 2026",
        venue: "Main Stage"
    },
    {
        id: 16,
        group: "Group - IV",
        title: "V-Nukkad Natak",
        category: "Group",
        firstPrize: "16,000",
        secondPrize: "8,000",
        externalFee: "1000 per group",
        internalFee: "500 per group",
        description: "Street play competition with a message.",
        image: "/culturals/V-Nukkad Natak.webp",
        teamSize: "Group",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 24, 2026",
        venue: "Campus Grounds"
    },

    // --- Group Western ---
    {
        id: 4,
        group: "Group - I",
        title: "V-Step Up: Western Group Battle",
        category: "Group",
        firstPrize: "12,000",
        secondPrize: "6,000",
        externalFee: "200 per participant",
        internalFee: "100 per participant",
        description: "Set the stage on fire with your group western dance.",
        image: "/culturals/vstep western group.webp",
        teamSize: "Group",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 23, 2026",
        venue: "Main Auditorium"
    },
    {
        id: 9,
        group: "Group - II",
        title: "V-Rhythm: Battle of Bands (Western)",
        category: "Group",
        firstPrize: "12,000",
        secondPrize: "6,000",
        externalFee: "200 per participant",
        internalFee: "100 per participant",
        description: "Western bands compete for the top spot.",
        image: "/culturals/vrhythm modern group.webp",
        teamSize: "Group",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 22, 2026",
        venue: "Main Stage"
    },
    {
        id: 7,
        group: "Group - II",
        title: "V-Rhythm: A Cappella Battle Arena",
        category: "Group",
        firstPrize: "12,000",
        secondPrize: "6,000",
        externalFee: "1000 per group",
        internalFee: "500 per group",
        description: "Voices only! Compete in the ultimate A Cappella battle.",
        image: "/culturals/a capella battle arena.webp",
        teamSize: "Group",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 22, 2026",
        venue: "Open Air Theatre"
    },

    // --- Others ---
    {
        id: 14,
        group: "Group - III",
        title: "V-Glam Designers",
        category: "Solo/Group",
        firstPrize: "12,000",
        secondPrize: "6,000",
        externalFee: "500 per participant",
        internalFee: "250 per participant",
        description: "For the creative minds behind the fashion.",
        image: "/culturals/vstep weatern battle.webp",
        teamSize: "Solo/Group",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-cultural-events-43169260-be68-424e-9274-edb3dc1d6a4d",
        date: "Feb 17 - 24, 2026",
        venue: "Design Studio"
    }
];

// Animated counter component
function AnimatedCounter({ value, suffix = "" }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// Event card component with modern design
function EventCard({ event, index, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            onClick={() => onClick(event)}
            className="group relative cursor-pointer aspect-[2/3] w-full"
        >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />

            {/* Main card */}
            <div className="relative h-full bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-[var(--secondary)]/30 flex flex-col">
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay - strengthened for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
                </div>

                {/* Registration status badge */}
                {event.registrationStatus === 'open' ? (
                    <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md border shadow-lg transition-transform hover:scale-105 bg-[var(--primary)] text-black border-[var(--primary)] shadow-[var(--primary)]/20"
                    >
                        Register
                    </a>
                ) : (
                    <div className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md border shadow-lg transition-transform hover:scale-105 bg-black/80 text-white/60 border-white/10">
                        Opening Soon
                    </div>
                )}

                {/* Content positioned at bottom with better spacing */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end h-full">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--secondary)] transition-colors duration-300 leading-tight">
                        {event.title}
                    </h3>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-2 leading-relaxed font-medium opacity-80">
                        {event.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm font-semibold text-white/90 border-t border-white/20 pt-4">
                        <span className="flex items-center gap-1.5">
                            <IconUsers size={18} className="text-[var(--secondary)]" />
                            {event.teamSize}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <IconCalendar size={18} className="text-[var(--accent)]" />
                            {event.date.split(',')[0]}
                        </span>
                    </div>
                </div>

                {/* Hover arrow */}
                <motion.div
                    className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <IconChevronRight className="text-[var(--secondary)]" size={24} />
                </motion.div>
            </div>
        </motion.div>
    );
}

// Modal component
function EventModal({ event, onClose }) {
    if (!event) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 lg:p-8"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Image header */}
                <div className="relative h-64 sm:h-72 overflow-hidden group">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-[var(--secondary)] hover:text-black transition-all border border-white/10 z-50 group/close"
                    >
                        <IconX size={20} className="text-white group-hover/close:text-black" />
                    </button>

                </div>

                {/* Content */}
                <div className="p-8 -mt-10 relative z-10">
                    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 mb-8 shadow-2xl">
                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h2>
                        <p className="text-white/60 text-lg">{event.description}</p>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--secondary)]/30 transition-colors">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-2 uppercase tracking-wider font-semibold">
                                <IconUsers size={18} />
                                Category
                            </div>
                            <div className="text-white text-lg font-medium">{event.teamSize}</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--secondary)]/30 transition-colors">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-2 uppercase tracking-wider font-semibold">
                                <IconCalendar size={18} />
                                Date
                            </div>
                            <div className="text-white text-lg font-medium">{event.date}</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--secondary)]/30 transition-colors">
                            <div className="flex items-center gap-2 text-[var(--accent)] text-sm mb-2 uppercase tracking-wider font-semibold">
                                <span>🏆</span>
                                First Prize
                            </div>
                            <div className="text-white text-xl font-bold">₹ {event.firstPrize}</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--secondary)]/30 transition-colors">
                            <div className="flex items-center gap-2 text-[var(--secondary)] text-sm mb-2 uppercase tracking-wider font-semibold">
                                <span>🥈</span>
                                Second Prize
                            </div>
                            <div className="text-white text-xl font-bold">₹ {event.secondPrize}</div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--secondary)]/30 transition-colors col-span-1 sm:col-span-2">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-2 uppercase tracking-wider font-semibold">
                                <IconMapPin size={18} />
                                Registration Fee
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <span className="text-white/80 text-base">Internal: <span className="text-white font-medium">₹ {event.internalFee}</span></span>
                                <span className="hidden sm:block text-white/20">|</span>
                                <span className="text-white/80 text-base">External: <span className="text-white font-medium">₹ {event.externalFee}</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="/VITopia 2026 Cultural Prime_Events_Rule_Book'26.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-4 px-6 rounded-xl transition-all font-medium border border-white/5"
                        >
                            <IconExternalLink size={20} />
                            Rules & Regulations
                        </a>
                        {event.registrationStatus === 'open' ? (
                            <a
                                href={event.registrationLink || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-black font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[var(--primary)]/20"
                            >
                                Register Now
                            </a>
                        ) : (
                            <button
                                className="flex-1 bg-white/10 text-white/40 py-4 px-6 rounded-xl cursor-not-allowed font-medium"
                                disabled
                            >
                                Registrations Closed
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}



// Main page component
function CulturalsPage() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [videoIndex, setVideoIndex] = useState(-1);
    const videoRef = useRef(null);

    // Pick a random starting video on mount (client-side only)
    useEffect(() => {
        setVideoIndex(Math.floor(Math.random() * artistVideos.length));
    }, []);

    const handleVideoEnd = useCallback(() => {
        setVideoIndex((prev) => (prev + 1) % artistVideos.length);
    }, []);

    useEffect(() => {
        if (videoIndex < 0) return;
        const video = videoRef.current;
        if (video) {
            video.load();
            video.play().catch(() => { });
        }
    }, [videoIndex]);

    return (
        <div className="bg-[#050505] min-h-screen relative">
            {/* Fixed video background across entire page */}
            <div className="fixed inset-0 z-0">
                {videoIndex >= 0 && (
                    <video
                        ref={videoRef}
                        key={videoIndex}
                        src={artistVideos[videoIndex]}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        playsInline
                        onEnded={handleVideoEnd}
                    />
                )}
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">

                    {/* Content */}
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Badge */}
                            <motion.div
                                className="inline-flex md:mt-5 items-center gap-2 bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 rounded-full px-4 py-2 mb-8"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <IconSparkles className="text-[var(--secondary)]" size={18} />
                                <span className="text-[var(--secondary)] text-sm font-medium">VITOPIA 2026 Culturals</span>
                            </motion.div>

                            {/* Title */}
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                                <span className="block">EXPRESS.</span>
                                <span className="block bg-gradient-to-r from-[var(--secondary)] via-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent">
                                    CREATE.
                                </span>
                                <span className="block">INSPIRE.</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                                Unleash your artistic talents at the grandest cultural extravaganza
                                featuring dance, music, drama, and more.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                                {[
                                    { value: 16, suffix: "+", label: "Events" },
                                    { value: 1000, suffix: "+", label: "Participants" },
                                    { value: 3, suffix: "+", label: "Days" }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                        </div>
                                        <div className="text-white/40 text-sm uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>


                </section>

                {/* Events Grid Section */}
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Section header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                Featured Events
                            </h2>
                            <p className="text-white/50 max-w-xl mx-auto">
                                Explore our lineup of spectacular cultural competitions
                            </p>
                        </motion.div>

                        {/* Events grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {culturalsData.map((event, index) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    index={index}
                                    onClick={setSelectedEvent}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--secondary)]/20 via-[#0a0a0a] to-[var(--accent)]/10 border border-white/5 p-12 text-center"
                        >
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--secondary)]/10 rounded-full blur-[80px]" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--accent)]/10 rounded-full blur-[60px]" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Ready to Shine?
                                </h2>
                                <p className="text-white/50 mb-8 max-w-xl mx-auto">
                                    Check out the rule book and prepare for the most exciting cultural fest of the year.
                                </p>
                                <a
                                    href="/VITopia 2026 Cultural Prime_Events_Rule_Book'26.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[var(--primary)] text-black font-semibold px-8 py-4 rounded-full hover:bg-[var(--primary)]/90 transition-all hover:scale-105 active:scale-95"
                                >
                                    <IconExternalLink size={20} />
                                    View Rule Book
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Footer />

                {/* Modal */}
                <AnimatePresence>
                    {selectedEvent && (
                        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default CulturalsPage;
