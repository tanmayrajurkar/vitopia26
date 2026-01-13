'use client'

import { Footer } from "@/components/Homepage/sections/footer";
import Navbar from "@/components/Homepage/sections/navbar";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IconSparkles, IconUsers, IconCalendar, IconMapPin, IconChevronRight, IconX, IconExternalLink } from "@tabler/icons-react";

// Cultural events data
const culturalsData = [
    {
        id: 1,
        title: "Dance Competition",
        description: "Solo and group dance performances across classical, western, and folk genres",
        image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop",
        teamSize: "1-8 members",
        registrationStatus: "open",
        date: "Feb 14-15, 2025",
        venue: "Main Auditorium"
    },
    {
        id: 2,
        title: "Music Fest",
        description: "Vocal and instrumental competitions featuring rock, classical, and fusion",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
        teamSize: "1-6 members",
        registrationStatus: "closed",
        date: "Feb 15-16, 2025",
        venue: "Open Air Theatre"
    },
    {
        id: 3,
        title: "Drama & Theatre",
        description: "Stage plays, street plays, and mime performances",
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop",
        teamSize: "5-15 members",
        registrationStatus: "closed",
        date: "Feb 16, 2025",
        venue: "Main Auditorium"
    },
    {
        id: 4,
        title: "Fashion Show",
        description: "Showcase your creativity through themed fashion walks",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
        teamSize: "8-12 members",
        registrationStatus: "closed",
        date: "Feb 17, 2025",
        venue: "Main Stage"
    },
    {
        id: 5,
        title: "Art & Painting",
        description: "Canvas painting, sketching, and digital art competitions",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "closed",
        date: "Feb 14, 2025",
        venue: "Art Gallery"
    },
    {
        id: 6,
        title: "Photography",
        description: "Capture the essence of VITOPIA through your lens",
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "closed",
        date: "Feb 14-17, 2025",
        venue: "Campus Wide"
    },
    {
        id: 7,
        title: "Literary Events",
        description: "Debates, poetry slam, creative writing, and quiz competitions",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
        teamSize: "1-3 members",
        registrationStatus: "closed",
        date: "Feb 15, 2025",
        venue: "Seminar Hall"
    },
    {
        id: 8,
        title: "Stand-up Comedy",
        description: "Make the crowd laugh with your original comedy sets",
        image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "closed",
        date: "Feb 16, 2025",
        venue: "Open Air Theatre"
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
            className="group relative cursor-pointer h-[420px] w-full"
        >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />

            {/* Main card */}
            <div className="relative h-full bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-[var(--secondary)]/30 flex flex-col">
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay - strengthened for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
                </div>

                {/* Registration status badge */}
                {event.registrationStatus === 'open' ? (
                    <a
                        href={event.registrationLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md border shadow-lg transition-transform hover:scale-105 bg-[var(--primary)] text-black border-[var(--primary)] shadow-[var(--primary)]/20"
                    >
                        Register
                    </a>
                ) : (
                    <div className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md border shadow-lg transition-transform hover:scale-105 bg-black/80 text-white/60 border-white/10">
                        Closed
                    </div>
                )}

                {/* Content positioned at bottom with better spacing */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end h-full">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--secondary)] transition-colors duration-300 leading-tight">
                        {event.title}
                    </h3>
                    <p className="text-gray-200 text-base mb-4 line-clamp-2 leading-relaxed font-medium">
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
                className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Image header */}
                <div className="relative h-64 sm:h-72 overflow-hidden group">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                <div className="p-8 -mt-20 relative z-10">
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
                                Team Size
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
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--secondary)]/30 transition-colors col-span-1 sm:col-span-2">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-2 uppercase tracking-wider font-semibold">
                                <IconMapPin size={18} />
                                Venue
                            </div>
                            <div className="text-white text-lg font-medium">{event.venue}</div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://universitywebsitbucket.s3.ap-south-1.amazonaws.com/vitopia/Vitopia+(Prime+Event+Rules)_2025+.pdf"
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="bg-[#050505] min-h-screen flex items-center justify-center">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-16 h-16 rounded-full border-2 border-[var(--primary)] border-t-transparent"
                    style={{ animation: 'spin 1s linear infinite' }}
                />
            </div>
        );
    }

    return (
        <div className="bg-[#050505] min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
                {/* Animated background */}
                <div className="absolute inset-0">
                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }}
                    />

                    {/* Gradient orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--secondary)]/10 blur-[120px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent)]/10 blur-[100px]"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

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
                                { value: 8, suffix: "+", label: "Events" },
                                { value: 1000, suffix: "+", label: "Participants" },
                                { value: 4, suffix: "", label: "Days" }
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
                                href="https://universitywebsitbucket.s3.ap-south-1.amazonaws.com/vitopia/Vitopia+(Prime+Event+Rules)_2025+.pdf"
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
    );
}

export default CulturalsPage;
