"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconTicket } from "@tabler/icons-react";

export default function ComingSoonModal({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden p-8 text-center"
                    >
                        {/* Glow Effects */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-lime-400/20 rounded-full blur-[50px] pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                        >
                            <IconX size={24} />
                        </button>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 bg-lime-400/10 rounded-2xl flex items-center justify-center mb-6 border border-lime-400/20">
                                <IconTicket className="text-lime-400" size={32} />
                            </div>

                            <h2 className="text-4xl font-anton uppercase text-white mb-2 tracking-wide">
                                Coming Soon
                            </h2>

                            <p className="text-white/60 font-outfit text-lg mb-8 leading-relaxed">
                                Tickets are not yet available. Stay tuned for the official release!
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
