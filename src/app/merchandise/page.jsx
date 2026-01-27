'use client'

import { Footer } from "@/components/Homepage/sections/footer";
import Navbar from "@/components/Homepage/sections/navbar";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IconShoppingBag, IconTag, IconShirt, IconHanger, IconChevronRight, IconX, IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";

// Merchandise data
const merchData = [
    {
        id: 1,
        title: "VITOPIA '26 Official Tee",
        description: "The official merchandise for VITOPIA 2026. Featuring a gritty, urban design that captures the spirit of the fest.",
        price: "₹300",
        image: "/tshirts/T1.jpeg",
        slides: ["/tshirts/T1-1.jpeg", "/tshirts/T1-2.jpeg"],
        category: "T-Shirt",
        status: "available",
        link: "https://events.vitap.ac.in/e/merchandise-sales-t-shirts-of-vitopia-2026-9725c9cf-f606-4f66-b3bd-ecefede5d7b1"
    },
    {
        id: 2,
        title: "Limited Edition Graphic Tee",
        description: "Exclusive limited run design with premium cotton blend. Stand out from the crowd.",
        price: "₹300",
        image: "/tshirts/T2.jpeg",
        slides: ["/tshirts/T2-1.jpeg", "/tshirts/T2-2.jpeg"],
        category: "T-Shirt",
        status: "available",
        link: "https://events.vitap.ac.in/e/merchandise-sales-t-shirts-of-vitopia-2026-9725c9cf-f606-4f66-b3bd-ecefede5d7b1"
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

// Merch card component
function MerchCard({ item, index, onClick }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!item.slides || item.slides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % item.slides.length);
        }, 2500); // Switch every 2.5 seconds

        return () => clearInterval(interval);
    }, [item.slides]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            onClick={() => onClick(item)}
            className="group relative cursor-pointer h-[420px] w-full"
        >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />

            {/* Main card */}
            <div className="relative h-full bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-[var(--accent)]/30 flex flex-col">
                {/* Image Slideshow */}
                <div className="absolute inset-0 overflow-hidden">
                    <AnimatePresence>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 h-full w-full"
                        >
                            <Image
                                src={item.slides ? item.slides[currentSlide] : item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Gradient overlay - strengthened for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
                </div>

                {/* Status badge */}
                {item.status !== 'available' && (
                    <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${item.status === 'sold_out'
                        ? 'bg-red-500/20 text-red-500 border border-red-500/20'
                        : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/20'
                        }`}>
                        {item.status === 'sold_out' ? 'Sold Out' : 'Selling Fast'}
                    </div>
                )}

                {/* Content positioned at bottom with better spacing */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end h-full">
                    <span className="text-[var(--accent)] text-xs font-bold tracking-wider uppercase mb-2">
                        {item.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight">
                        {item.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-xs font-medium text-white/50 border-t border-white/10 pt-4 mt-auto">
                        <span className="text-xl font-bold text-white">{item.price}</span>
                        <div className="flex items-center gap-2">
                            <span className="bg-white/10 px-2 py-1 rounded text-white/70">S</span>
                            <span className="bg-white/10 px-2 py-1 rounded text-white/70">M</span>
                            <span className="bg-white/10 px-2 py-1 rounded text-white/70">L</span>
                            <span className="bg-white/10 px-2 py-1 rounded text-white/70">XL</span>
                            <span className="bg-white/10 px-2 py-1 rounded text-white/70">XXL</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Modal component
function MerchModal({ item, onClose }) {
    if (!item) return null;

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
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-[var(--accent)] hover:text-black transition-all border border-white/10 z-50 group/close"
                    >
                        <IconX size={20} className="text-white group-hover/close:text-black" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 -mt-20 relative z-10">
                    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 mb-8 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold uppercase tracking-wider mb-3">
                                    {item.category}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{item.title}</h2>
                            </div>
                            <div className="text-3xl font-bold text-[var(--accent)]">{item.price}</div>
                        </div>
                        <p className="text-white/60 text-lg mt-4">{item.description}</p>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--accent)]/30 transition-colors">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-2 uppercase tracking-wider font-semibold">
                                <IconShirt size={18} />
                                Material
                            </div>
                            <div className="text-white text-lg font-medium">100% Cotton (240 GSM)</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--accent)]/30 transition-colors">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-2 uppercase tracking-wider font-semibold">
                                <IconHanger size={18} />
                                Fit
                            </div>
                            <div className="text-white text-lg font-medium">Unisex</div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-4">
                        {item.status === 'sold_out' ? (
                            <button
                                disabled
                                className="w-full bg-white/10 text-white/40 py-4 rounded-xl font-semibold cursor-not-allowed uppercase tracking-wide border border-white/5"
                            >
                                Sold Out
                            </button>
                        ) : (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[var(--accent)]/20"
                            >
                                <IconShoppingBag size={22} />
                                Buy Now
                            </a>
                        )}
                        <p className="text-center text-white/30 text-xs">
                            *Pickup available at University Campus counter soon
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Main page component
function MerchandisePage() {
    const [selectedItem, setSelectedItem] = useState(null);




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
                        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/10 blur-[120px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/10 blur-[100px]"
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
                            className="inline-flex md:mt-5 items-center gap-2 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full px-4 py-2 mb-8"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <IconTag className="text-[var(--accent)]" size={18} />
                            <span className="text-[var(--accent)] text-sm font-medium">Official Merchandise</span>
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                            <span className="block">WEAR.</span>
                            <span className="block bg-gradient-to-r from-[var(--accent)] via-[#8b5cf6] to-[var(--primary)] bg-clip-text text-transparent">
                                FLAUNT.
                            </span>
                            <span className="block">VIBE.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Grab the exclusive VITOPIA '26 collection. Limited edition apparel and accessories
                            designed to make you stand out.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Merch Grid Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Latest Collection
                        </h2>
                        <p className="text-white/50 max-w-xl mx-auto">
                            Explore our premium range of festival gear
                        </p>
                    </motion.div>

                    {/* Merch grid - Centered with Flex */}
                    <div className="flex flex-wrap justify-center gap-10">
                        {merchData.map((item, index) => (
                            <div key={item.id} className="w-full sm:w-[calc(50%-20px)] lg:w-[calc(25%-20px)] min-w-[300px] max-w-[380px]">
                                <MerchCard
                                    item={item}
                                    index={index}
                                    onClick={setSelectedItem}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <MerchModal item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default MerchandisePage;
