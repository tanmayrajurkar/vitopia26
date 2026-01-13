"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconBallFootball, IconMusic, IconCpu, IconStarFilled } from "@tabler/icons-react";

const bentoItems = [
  {
    title: "SPORTS",
    description: "Unleash your inner athlete. 15+ adrenaline pumping events.",
    href: "/sports",
    icon: <IconBallFootball className="w-14 h-14" />,
    color: "from-lime-400 to-green-500",
    borderColor: "border-lime-400/30",
    hoverBorderColor: "group-hover:border-lime-400/80",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(190,242,100,0.4)]",
    size: "col-span-12 md:col-span-8",
    backgroundImage: "/sports.png",
  },
  {
    title: "CULTURALS",
    description: "Dance, Music, Drama & more.",
    href: "/culturals",
    icon: <IconMusic className="w-14 h-14" />,
    color: "from-pink-500 to-rose-600",
    borderColor: "border-pink-500/30",
    hoverBorderColor: "group-hover:border-pink-500/80",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(236,72,153,0.4)]",
    size: "col-span-12 md:col-span-4",
    backgroundImage: "/culturals.png",
  },
  {
    title: "STATE RALLY",
    description: "One Nation, A Million Stories – The State-Wise Rally at VITOPIA 2025!.",
    href: "/",
    icon: <IconCpu className="w-14 h-14" />,
    color: "from-purple-500 to-violet-600",
    borderColor: "border-purple-500/30",
    hoverBorderColor: "group-hover:border-purple-500/80",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]",
    size: "col-span-12 md:col-span-4",
    backgroundImage: "/state-rally.png",
  },
  {
    title: "PRO-SHOW",
    description: "Star-studded nights you'll never forget.",
    href: "/",
    icon: <IconStarFilled className="w-14 h-14" />,
    color: "from-amber-400 to-orange-500",
    borderColor: "border-amber-400/30",
    hoverBorderColor: "group-hover:border-amber-400/80",
    glowColor: "group-hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]",
    size: "col-span-12 md:col-span-8",
    backgroundImage: "/night.png",
  },
];

export default function CardSection() {
  return (
    <section id="card-section" className="py-24 bg-[#050505] relative overflow-hidden border-y border-white/10">
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

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-5xl md:text-7xl font-anton text-white uppercase mb-4">
            EXPLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">CATEGORIES</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent mx-auto" />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[280px]">
          {bentoItems.map((item, idx) => (
            <motion.div
              key={idx}
              className={item.size}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Link
                href={item.href}
                className={`group relative h-full overflow-hidden rounded-2xl border-2 ${item.borderColor} ${item.hoverBorderColor} bg-black/40 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] ${item.glowColor} block`}
              >
                {/* Background Image if available */}
                {item.backgroundImage && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
                      style={{ backgroundImage: `url(${item.backgroundImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                )}

                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Grid Pattern Overlay */}
                {!item.backgroundImage && <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
                  style={{
                    backgroundImage: `
                      linear-gradient(white 1px, transparent 1px),
                      linear-gradient(90deg, white 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />}

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                  {/* Icon - Top Right */}
                  <div className={`self-end text-white/20 group-hover:text-white/40 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12`}>
                    {item.icon}
                  </div>

                  {/* Text Content - Bottom */}
                  <div className="space-y-3">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-anton uppercase tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <p className="font-outfit text-base md:text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Explore Arrow */}
                    <div className="flex items-center gap-2 text-sm font-outfit uppercase tracking-widest text-white/60 group-hover:text-white group-hover:gap-3 transition-all duration-300">
                      <span>Explore</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
