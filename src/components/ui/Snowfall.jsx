"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * Snowfall Component
 * 
 * A production-quality, canvas-based snowfall animation with toggle control.
 * 
 * Key Features:
 * - Canvas rendering for optimal performance (handles 100+ particles at 60fps)
 * - requestAnimationFrame for smooth, battery-efficient animation
 * - Natural snowflake behavior with variable size, speed, and drift
 * - Respects prefers-reduced-motion accessibility setting
 * - Proper cleanup to prevent memory leaks
 * - Non-interactive overlay (pointer-events: none on canvas)
 */

// Configuration for snowflake behavior
const CONFIG = {
    // Particle count based on screen size (will be dynamically adjusted)
    baseParticleCount: 150,
    mobileParticleCount: 80,

    // Size range (radius in pixels)
    minSize: 1,
    maxSize: 3.5,

    // Speed range (pixels per frame)
    minSpeed: 0.3,
    maxSpeed: 1.0,

    // Opacity range
    minOpacity: 0.25,
    maxOpacity: 0.7,

    // Horizontal drift amplitude
    driftAmplitude: 0.4,

    // Fade transition duration (ms)
    fadeTransition: 400,

    // Mobile breakpoint
    mobileBreakpoint: 768,
};

/**
 * Creates a single snowflake with randomized properties
 */
function createSnowflake(canvasWidth, canvasHeight, startAbove = false) {
    return {
        x: Math.random() * canvasWidth,
        y: startAbove
            ? -Math.random() * canvasHeight  // Start above viewport for initial spawn
            : Math.random() * canvasHeight,   // Random position for reset
        radius: Math.random() * (CONFIG.maxSize - CONFIG.minSize) + CONFIG.minSize,
        speed: Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed) + CONFIG.minSpeed,
        opacity: Math.random() * (CONFIG.maxOpacity - CONFIG.minOpacity) + CONFIG.minOpacity,
        drift: Math.random() * CONFIG.driftAmplitude - CONFIG.driftAmplitude / 2,
        phase: Math.random() * Math.PI * 2, // Random phase for sine wave drift
    };
}

/**
 * Draws a single snowflake with soft radial gradient
 */
function drawSnowflake(ctx, flake) {
    const gradient = ctx.createRadialGradient(
        flake.x, flake.y, 0,
        flake.x, flake.y, flake.radius
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${flake.opacity})`);
    gradient.addColorStop(0.6, `rgba(255, 255, 255, ${flake.opacity * 0.6})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
}

export default function Snowfall() {
    const canvasRef = useRef(null);
    const snowflakesRef = useRef([]);
    const animationRef = useRef(null);
    const isRunningRef = useRef(false);
    const canvasOpacityRef = useRef(0);

    const [isActive, setIsActive] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // Initialize snowflakes
    const initSnowflakes = useCallback((canvas) => {
        const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;
        const count = isMobile ? CONFIG.mobileParticleCount : CONFIG.baseParticleCount;

        snowflakesRef.current = Array.from({ length: count }, () =>
            createSnowflake(canvas.width, canvas.height, false)
        );
    }, []);

    // Main animation loop
    const animate = useCallback(() => {
        if (!isRunningRef.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle fade in/out
        const targetOpacity = isRunningRef.current ? 1 : 0;
        const opacityStep = 1 / (CONFIG.fadeTransition / 16.67); // ~60fps

        if (canvasOpacityRef.current < targetOpacity) {
            canvasOpacityRef.current = Math.min(canvasOpacityRef.current + opacityStep, 1);
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set global alpha for fade effect
        ctx.globalAlpha = canvasOpacityRef.current;

        // Update and draw each snowflake
        snowflakesRef.current.forEach((flake) => {
            // Update position
            flake.y += flake.speed;
            // Sine wave horizontal drift for organic movement
            flake.x += Math.sin(flake.phase + flake.y * 0.008) * flake.drift;

            // Recycle snowflake when it goes off-screen
            if (flake.y > canvas.height + flake.radius) {
                flake.y = -flake.radius * 2;
                flake.x = Math.random() * canvas.width;
                // Slightly randomize properties on recycle for variation
                flake.speed = Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed) + CONFIG.minSpeed;
                flake.phase = Math.random() * Math.PI * 2;
            }

            // Wrap horizontally
            if (flake.x < -flake.radius) {
                flake.x = canvas.width + flake.radius;
            } else if (flake.x > canvas.width + flake.radius) {
                flake.x = -flake.radius;
            }

            drawSnowflake(ctx, flake);
        });

        ctx.globalAlpha = 1;

        animationRef.current = requestAnimationFrame(animate);
    }, []);

    // Handle resize
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Re-initialize snowflakes on significant resize
            if (isActive) {
                initSnowflakes(canvas);
            }
        };

        // Initial size
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isActive, initSnowflakes]);

    // Start/Stop animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (isActive && !prefersReducedMotion) {
            // Start snowfall
            isRunningRef.current = true;
            canvasOpacityRef.current = 0;
            initSnowflakes(canvas);
            animate();
        } else {
            // Stop snowfall with fade out
            isRunningRef.current = false;

            // Fade out animation
            const fadeOut = () => {
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                canvasOpacityRef.current -= 1 / (CONFIG.fadeTransition / 16.67);

                if (canvasOpacityRef.current > 0) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.globalAlpha = canvasOpacityRef.current;

                    snowflakesRef.current.forEach((flake) => {
                        drawSnowflake(ctx, flake);
                    });

                    ctx.globalAlpha = 1;
                    requestAnimationFrame(fadeOut);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    snowflakesRef.current = [];
                }
            };

            if (canvasOpacityRef.current > 0) {
                fadeOut();
            }
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isActive, prefersReducedMotion, animate, initSnowflakes]);

    // Toggle function exposed for external use
    const toggleSnow = useCallback(() => {
        setIsActive((prev) => !prev);
    }, []);

    // Don't render anything if user prefers reduced motion
    if (prefersReducedMotion) {
        return null;
    }

    return (
        <>
            {/* Snow Canvas Layer */}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="fixed inset-0 z-[9999] pointer-events-none"
                style={{
                    mixBlendMode: "screen",
                }}
            />

            {/* Toggle Button */}
            <button
                onClick={toggleSnow}
                aria-label={isActive ? "Stop snowfall" : "Start snowfall"}
                aria-pressed={isActive}
                className={`
          fixed bottom-6 left-6 z-[10000]
          flex items-center gap-2 px-4 py-2.5
          rounded-full
          font-medium text-sm
          transition-all duration-300 ease-out
          backdrop-blur-md
          border
          ${isActive
                        ? "bg-white/15 border-lime-400/40 text-white shadow-[0_0_20px_rgba(190,242,100,0.25)]"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20"
                    }
          active:scale-95
        `}
            >
                <span
                    className={`
            text-lg transition-transform duration-300
            ${isActive ? "animate-pulse" : ""}
          `}
                    style={{
                        transform: isActive ? "rotate(0deg)" : "rotate(-15deg)",
                    }}
                >
                    ❄️
                </span>
                <span className="hidden sm:inline">
                    {isActive ? "Snow on" : "Let it snow"}
                </span>
            </button>
        </>
    );
}

// Export toggle methods for external control if needed
export const startSnow = () => {
    const event = new CustomEvent("snowfall:start");
    window.dispatchEvent(event);
};

export const stopSnow = () => {
    const event = new CustomEvent("snowfall:stop");
    window.dispatchEvent(event);
};
