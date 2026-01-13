"use client";
import React from "react";
import CountdownTimer from "@/components/Homepage/CountDownTimer";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const TimerSection = () => {
  return (
    <section className="bg-[#050505] py-20 md:py-32 relative overflow-hidden border-y border-lime-400/20">
      {/* Static Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(190, 242, 100, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(190, 242, 100, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* CTA Side */}
          <div className="text-center lg:text-left space-y-8 flex-1">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-anton text-white leading-none uppercase">
                THE COUNTDOWN
              </h2>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-anton leading-none uppercase relative inline-block">
                <span
                  className="text-transparent bg-gradient-to-r from-lime-400 via-green-400 to-lime-400 bg-clip-text animate-pulse"
                  style={{
                    WebkitTextStroke: '2px rgba(190, 242, 100, 0.3)'
                  }}
                >
                  HAS BEGUN
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-50" />
              </h2>
            </div>

            <p className="text-white/60 font-outfit text-lg md:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed">
              The ultimate fest experience is just around the corner. Secure your spot now!
            </p>

            {/* Creative Geometric Button */}
            <div className="relative inline-block group">
              {/* Pulsing Glow Background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-lime-400 via-green-400 to-lime-400 opacity-30 blur-2xl group-hover:opacity-50 animate-pulse transition-opacity duration-300" />

              <Link
                href="https://events.vitap.ac.in/e/vitopia-2025-cultural-dd247f1d-90e2-4daa-8615-441050caf953"
                target="_blank"
                className="relative block overflow-hidden"
                style={{
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
                }}
              >
                {/* Main Button */}
                <div className="relative px-12 py-6 bg-gradient-to-r from-lime-400 via-green-400 to-lime-500 text-black font-anton text-xl md:text-2xl uppercase tracking-[0.2em] transition-all duration-300 group-hover:from-lime-300 group-hover:via-green-300 group-hover:to-lime-400">
                  <div className="flex items-center gap-4 relative z-10">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">GRAB PASSES</span>
                    <MdArrowOutward className="text-2xl group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                  </div>

                  {/* Diagonal Shimmer */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

                  {/* Animated Scanline */}
                  <div className="absolute left-0 right-0 h-[2px] bg-white/60 top-1/2 -translate-y-1/2 group-hover:animate-ping" />
                </div>
              </Link>

              {/* Decorative Corner Elements */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-lime-400 group-hover:w-8 group-hover:h-8 transition-all duration-300" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-lime-400 group-hover:w-8 group-hover:h-8 transition-all duration-300" />

              {/* Small Accent Dots */}
              {/* <div className="absolute -top-1 -right-1 w-2 h-2 bg-lime-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full group-hover:scale-150 transition-transform duration-300" /> */}
            </div>
          </div>

          {/* Timer Component Wrapper */}
          <div className="w-full lg:w-auto flex-1 max-w-4xl">
            <div className="relative p-8 md:p-12 lg:p-16">
              <CountdownTimer />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TimerSection;
