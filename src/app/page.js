"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Homepage/sections/navbar";
import HeroSection from "@/components/Homepage/sections/herosection1";
import AboutSection from "@/components/Homepage/sections/aboutsection";
import TimerSection from "@/components/Homepage/sections/timersection";
import CardSection from "@/components/Homepage/sections/cardsection";
import GallerySection from "@/components/Homepage/sections/gallerysection";
import { Footer } from "@/components/Homepage/sections/footer";
import { ScrollWrapper } from "@/components/ui/scroll-wrapper";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-lime-400 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

export default function Page() {
  return (
    <main className="bg-black min-h-screen selection:bg-primary selection:text-black overflow-x-hidden">
      <ScrollProgress />
      <Navbar />

      {/* Hero doesn't need scale-out effect, just clean entry */}
      <div className="relative z-10">
        <HeroSection />
      </div>

      <ScrollWrapper className="z-20">
        <TimerSection />
      </ScrollWrapper>

      <ScrollWrapper className="z-30">
        <AboutSection />
      </ScrollWrapper>

      <ScrollWrapper className="z-20">
        <CardSection />
      </ScrollWrapper>

      <ScrollWrapper className="z-10">
        <GallerySection />
      </ScrollWrapper>

      <div className="relative z-0">
        <Footer />
      </div>
    </main>
  );
}
