'use client';
import { motion } from 'framer-motion';
import { IconMail, IconPhone, IconUser, IconMapPin, IconMessage, IconSend, IconBuildingCommunity, IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const webhookURL = 'https://ptb.discord.com/api/webhooks/1459484455231164416/0MT2TG2-ZeAVuCxuPJ6mawDsEMp4c6cggRaYv94gti0KxxdMfnfTJHgxqH9omxF3nTU3';

            const embed = {
                embeds: [{
                    title: "📬 New Contact Form Submission",
                    color: 0xbef264, // lime-400
                    fields: [
                        { name: "👤 Name", value: formData.name, inline: true },
                        { name: "📧 Email", value: formData.email, inline: true },
                        { name: "📋 Subject", value: formData.subject, inline: false },
                        { name: "💬 Message", value: formData.message, inline: false }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: { text: "VITOPIA 2026 Contact Form" }
                }]
            };

            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(embed)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const coordinatorGroups = [
        {
            type: "Event Coordinators",
            members: [
                { name: "Dr. S Gopikrishnan", position: "Convenor", email: "convenor.vitopia@vitap.ac.in" },
                { name: "Dr. Karishma Bisht", position: "Co Convenor – Cultural Events", email: "karishma.b@vitap.ac.in" },
                { name: "Dr. Guruprakash Jayabalasamy", position: "Co Convenor – Pro Show Events", email: "guruprakash@vitap.ac.in" },
                { name: "Dr. U M Gopala Krishna", position: "Co Convenor – Sports", email: "gopalkrishna.um@vitap.ac.in", phone: "+91 81421 77143" },
            ],
        },
        {
            type: "Sports Coordinators",
            members: [
                { name: "Mr. Sathwik Sangani", position: "Sports Student Coordinator", email: "sathwik.22bce7808@vitapstudent.ac.in", phone: "+91 93813 58149" },
                { name: "Mr. Gujarathi Dheeraj", position: "Sports Student Coordinator", email: "dheeraj.22bce9581@vitapstudent.ac.in", phone: "+91 98851 29430" },
            ],
        },
        {
            type: "Accommodation & Transport",
            members: [
                { name: "PAWAN KUMAR", position: "Accommodation Student Coordinator", email: "Pawan.22bce9637@vitapstudent.ac.in", phone: "+91 82470 15128" },
                { name: "Aravind Kumar", position: "Transport Student Coordinator", email: "aravind.22bce20503@vitapstudent.ac.in", phone: "+91 72073 40228" },
            ]
        }
    ];

    return (
        <div className="bg-[#050505] min-h-screen pt-24 pb-20 relative overflow-hidden font-sans">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
                <motion.div
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[120px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--secondary)]/10 rounded-full blur-[120px]"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity, delay: 2 }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20 md:mt-5"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full px-4 py-2 mb-8"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <IconBuildingCommunity className="text-[var(--primary)]" size={18} />
                        <span className="text-[var(--primary)] text-sm font-medium">24/7 Support</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                        <span className="block">GET IN</span>
                        <span className="block bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent">
                            TOUCH.
                        </span>
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
                        Have questions about VITOPIA '26? Reach out to our coordinators or drop us a message directly.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {/* Left Column: Form & Map */}
                    <div className="space-y-8">
                        {/* Contact Form Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-10 relative overflow-hidden"
                        >

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-white mb-2">Send Message</h2>
                                <p className="text-white/50 mb-8">We'll get back to you within 24 hours.</p>

                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-1">Name</label>
                                            <div className="relative group/input">
                                                <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/input:text-[var(--primary)] transition-colors" size={20} />
                                                <input
                                                    type="text"
                                                    placeholder="Vitian"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--primary)]/50 focus:bg-white/10 transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-1">Email</label>
                                            <div className="relative group/input">
                                                <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within/input:text-[var(--primary)] transition-colors" size={20} />
                                                <input
                                                    type="email"
                                                    placeholder="vitian@vitapstudent.ac.in"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--primary)]/50 focus:bg-white/10 transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-1">Subject</label>
                                        <div className="relative">
                                            <select
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white/80 focus:outline-none focus:border-[var(--primary)]/50 focus:bg-white/10 transition-all font-medium appearance-none cursor-pointer"
                                            >
                                                <option className="bg-[#0a0a0a]">General Inquiry</option>
                                                <option className="bg-[#0a0a0a]">Registration Issue</option>
                                                <option className="bg-[#0a0a0a]">Sponsorship</option>
                                                <option className="bg-[#0a0a0a]">Technical Support</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-white/50 pl-1">Message</label>
                                        <div className="relative group/input">
                                            <IconMessage className="absolute left-4 top-4 text-white/30 group-focus-within/input:text-[var(--primary)] transition-colors" size={20} />
                                            <textarea
                                                rows="5"
                                                placeholder="How can we help you?"
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--primary)]/50 focus:bg-white/10 transition-all font-medium resize-none leading-relaxed"
                                            />
                                        </div>
                                    </div>

                                    {/* Minimalist Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full cursor-pointer bg-gradient-to-r from-lime-400 to-green-400 hover:from-lime-300 hover:to-green-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                        <IconSend size={20} className="group-hover:translate-x-1 transition-transform duration-300" stroke={2} />
                                    </button>

                                    {/* Success/Error Messages */}
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-400"
                                        >
                                            <IconCheck size={20} />
                                            <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
                                        </motion.div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400"
                                        >
                                            <IconX size={20} />
                                            <span className="font-medium">Failed to send message. Please try again later.</span>
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        </motion.div>

                        {/* Map Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="border border-white/10 rounded-3xl overflow-hidden h-[600px] relative group"
                        >
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.792714666442!2d80.49996984234657!3d16.494371616339006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f27d40f21c55%3A0x1490eacd54859850!2sVIT-AP%20University!5e1!3m2!1sen!2sin!4v1768039268056!5m2!1sen!2sin" width="600" height="600" style={{ border: '0' }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=600&fit=crop"
                                className="w-full h-full object-cover opacity-30 grayscale-0 group-hover:grayscale group-hover:scale-105 transition-all duration-700"
                                alt="VIT-AP Campus"
                            />
                        </motion.div>
                    </div>

                    {/* Right Column: Coordinators Section */}
                    <div className="space-y-8">
                        {coordinatorGroups.map((group, groupIndex) => (
                            <motion.div
                                key={groupIndex}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--primary)]/50 to-transparent" />
                                    <h3 className="text-xl font-bold text-white whitespace-nowrap uppercase tracking-wider">
                                        {group.type}
                                    </h3>
                                    <div className="h-[1px] w-8 bg-white/10" />
                                </div>

                                <div className="grid gap-4">
                                    {group.members.map((member, index) => (
                                        <div
                                            key={index}
                                            className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 hover:border-[var(--primary)]/20 transition-all group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[var(--primary)]/20 group-hover:text-[var(--primary)] transition-all shrink-0">
                                                    <IconUser size={24} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-bold text-lg leading-tight mb-1 truncate">{member.name}</h4>
                                                    <p className="text-[var(--primary)] text-sm font-medium mb-3">{member.position}</p>

                                                    <div className="space-y-1.5 text-sm">
                                                        <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors truncate">
                                                            <IconMail size={14} className="shrink-0" />
                                                            {member.email}
                                                        </a>
                                                        {member.phone && (
                                                            <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                                                                <IconPhone size={14} className="shrink-0" />
                                                                {member.phone}
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
