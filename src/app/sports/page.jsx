'use client'

import { Footer } from "@/components/Homepage/sections/footer";
import Navbar from "@/components/Homepage/sections/navbar";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IconTrophy, IconUsers, IconCalendar, IconMapPin, IconChevronRight, IconX, IconExternalLink } from "@tabler/icons-react";

// Sports data with enhanced details
const sportsData = [
    // 1. Cricket
    {
        id: 1,
        title: "Cricket (Men)",
        description: "Team of 15 Players • Fee: ₹5000",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
        teamSize: "15 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "11th to 17th Feb 2026",
        venue: "VIT-AP Sports Ground",
        entryFee: "₹5000"
    },
    // 2. Football
    {
        id: 2,
        title: "Football (Men)",
        description: "Team of 15 Players • Fee: ₹5000",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
        teamSize: "15 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "VIT-AP Football Arena",
        entryFee: "₹5000"
    },
    // 3. Volleyball Men
    {
        id: 3,
        title: "Volleyball (Men)",
        description: "Team of 12 Players • Fee: ₹4000",
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&h=400&fit=crop",
        teamSize: "12 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Volleyball Court",
        entryFee: "₹4000"
    },
    // 4. Volleyball Women
    {
        id: 4,
        title: "Volleyball (Women)",
        description: "Team of 12 Players • Fee: ₹4000",
        image: "https://images.unsplash.com/photo-1592656094267-764a45160876?w=600&h=400&fit=crop",
        teamSize: "12 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Volleyball Court",
        entryFee: "₹4000"
    },
    // 5. Basketball Men
    {
        id: 5,
        title: "Basketball (Men)",
        description: "Team of 12 Players • Fee: ₹4000",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop",
        teamSize: "12 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Basketball Court",
        entryFee: "₹4000"
    },
    // 6. Basketball Women
    {
        id: 6,
        title: "Basketball (Women)",
        description: "Team of 12 Players • Fee: ₹4000",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop",
        teamSize: "12 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Basketball Court",
        entryFee: "₹4000"
    },
    // 7. Badminton (Singles) Men
    {
        id: 7,
        title: "Badminton Singles (Men)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Indoor Badminton Court",
        entryFee: "₹400"
    },
    // 8. Badminton (Doubles) Men
    {
        id: 8,
        title: "Badminton Doubles (Men)",
        description: "Team • Fee: ₹800",
        image: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=600&h=400&fit=crop",
        teamSize: "Team",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Indoor Badminton Court",
        entryFee: "₹800"
    },
    // 9. Badminton (Singles) Women
    {
        id: 9,
        title: "Badminton Singles (Women)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1613918116549-b39178526568?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Indoor Badminton Court",
        entryFee: "₹400"
    },
    // 10. Badminton (Doubles) Women
    {
        id: 10,
        title: "Badminton Doubles (Women)",
        description: "Team • Fee: ₹800",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop",
        teamSize: "Team",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Indoor Badminton Court",
        entryFee: "₹800"
    },
    // 11. Table Tennis (Singles) Men
    {
        id: 11,
        title: "Table Tennis Singles (Men)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "TT Hall",
        entryFee: "₹400"
    },
    // 12. Table Tennis (Singles) Women
    {
        id: 12,
        title: "Table Tennis Singles (Women)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "TT Hall",
        entryFee: "₹400"
    },
    // 13. Table Tennis (Doubles) Men
    {
        id: 13,
        title: "Table Tennis Doubles (Men)",
        description: "Team • Fee: ₹800",
        image: "https://images.unsplash.com/photo-1517137879134-48acfbe3be13?w=600&h=400&fit=crop",
        teamSize: "Team",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "TT Hall",
        entryFee: "₹800"
    },
    // 14. Table Tennis (Doubles) Women
    {
        id: 14,
        title: "Table Tennis Doubles (Women)",
        description: "Team • Fee: ₹800",
        image: "https://images.unsplash.com/photo-1517137879134-48acfbe3be13?w=600&h=400&fit=crop",
        teamSize: "Team",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "TT Hall",
        entryFee: "₹800"
    },
    // 15. Lawn Tennis (Singles) Men
    {
        id: 15,
        title: "Lawn Tennis Singles (Men)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Tennis Court",
        entryFee: "₹400"
    },
    // 16. Chess (Women)
    {
        id: 16,
        title: "Chess (Women)",
        description: "Any No. of Players • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Seminar Hall",
        entryFee: "₹400"
    },
    // 17. Kho-Kho Men
    {
        id: 17,
        title: "Kho-Kho (Men)",
        description: "Team of 12 Players • Fee: ₹4000",
        image: "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?w=600&h=400&fit=crop",
        teamSize: "12 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Kho-Kho Court",
        entryFee: "₹4000"
    },
    // 18. Kho-Kho Women
    {
        id: 18,
        title: "Kho-Kho (Women)",
        description: "Team of 12 Players • Fee: ₹4000",
        image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&h=400&fit=crop",
        teamSize: "12 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "12th & 13th Feb 2026",
        venue: "Kho-Kho Court",
        entryFee: "₹4000"
    },
    // 19. Kabaddi Women
    {
        id: 19,
        title: "Kabaddi (Women)",
        description: "Team of 12 Players • Fee: ₹4000",
        image: "https://images.unsplash.com/photo-1601646731671-55b57d34195c?w=600&h=400&fit=crop",
        teamSize: "12 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "14th & 15th Feb 2026",
        venue: "Kabaddi Mat",
        entryFee: "₹4000"
    },
    // 20. Kabaddi Men
    {
        id: 20,
        title: "Kabaddi (Men)",
        description: "Team of 12 Players • Fee: ₹4000",
        image: "https://images.unsplash.com/photo-1616423405786-218413de7640?w=600&h=400&fit=crop",
        teamSize: "12 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "14th & 15th Feb 2026",
        venue: "Kabaddi Mat",
        entryFee: "₹4000"
    },
    {
        id: 21,
        title: "Throwball (Women)",
        description: "Team of 12 Players • Fee: ₹3000",
        image: "https://images.unsplash.com/photo-1592656094267-764a45160876?w=600&h=400&fit=crop",
        teamSize: "12 Players",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "14th Feb 2026",
        venue: "Throwball Court",
        entryFee: "₹3000"
    },
    {
        id: 22,
        title: "Long Jump (Men)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Athletics Track",
        entryFee: "₹400"
    },
    {
        id: 23,
        title: "Long Jump (Women)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1549488330-891ca9d25574?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Athletics Track",
        entryFee: "₹400"
    },
    {
        id: 24,
        title: "Triple Jump (Men)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Athletics Track",
        entryFee: "₹400"
    },
    {
        id: 25,
        title: "Shotput (Men)",
        description: "Individual • Fee: ₹400",
        image: "/sports/shotput-men.png",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Field Events Area",
        entryFee: "₹400"
    },
    // 26. Shotput Women
    {
        id: 26,
        title: "Shotput (Women)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Field Events Area",
        entryFee: "₹400"
    },
    // 27. 100m Meters Men
    {
        id: 27,
        title: "100 Meters (Men)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Athletics Track",
        entryFee: "₹400"
    },
    // 28. 400m Meters Men
    {
        id: 28,
        title: "400 Meters (Men)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Athletics Track",
        entryFee: "₹400"
    },
    // 29. 4x100m Relay Men
    {
        id: 29,
        title: "4x100m Relay (Men)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Athletics Track",
        entryFee: "₹400"
    },
    // 30. 100 Meters Women
    {
        id: 30,
        title: "100 Meters (Women)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Athletics Track",
        entryFee: "₹400"
    },
    // 31. 400 Meters Women
    {
        id: 31,
        title: "400 Meters (Women)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1549488330-891ca9d25574?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Athletics Track",
        entryFee: "₹400"
    },
    // 32. 4x100m Relay Women
    {
        id: 32,
        title: "4x100m Relay (Women)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1549488330-891ca9d25574?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Athletics Track",
        entryFee: "₹400"
    },
    // 33. Discus Throw Men
    {
        id: 33,
        title: "Discus Throw (Men)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1547445722-e7379743c3d5?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Field Events Area",
        entryFee: "₹400"
    },
    // 34. Discus Throw Women
    {
        id: 34,
        title: "Discus Throw (Women)",
        description: "Individual • Fee: ₹400",
        image: "https://images.unsplash.com/photo-1547445722-e7379743c3d5?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Field Events Area",
        entryFee: "₹400"
    },
    // 35. Power Lifting 59-64kg Men
    {
        id: 35,
        title: "Power Lifting 59-64kg (Men)",
        description: "Individual • Fee: ₹500",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Gymnasium",
        entryFee: "₹500"
    },
    // 36. Power Lifting 65-74kg Men
    {
        id: 36,
        title: "Power Lifting 65-74kg (Men)",
        description: "Individual • Fee: ₹500",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Gymnasium",
        entryFee: "₹500"
    },
    // 37. Power Lifting 75-84kg Men
    {
        id: 37,
        title: "Power Lifting 75-84kg (Men)",
        description: "Individual • Fee: ₹500",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Gymnasium",
        entryFee: "₹500"
    },
    // 38. Power Lifting above 85kg Men
    {
        id: 38,
        title: "Power Lifting >85kg (Men)",
        description: "Individual • Fee: ₹500",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
        teamSize: "Individual",
        registrationStatus: "open",
        registrationLink: "https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f",
        date: "15th Feb 2026",
        venue: "Gymnasium",
        entryFee: "₹500"
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

// Sport card component with modern design
function SportCard({ sport, index, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            onClick={() => onClick(sport)}
            className="group relative cursor-pointer aspect-[2/3] w-full"
        >
            {/* Card glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />

            {/* Main card */}
            <div className="relative h-full bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-[var(--primary)]/30 flex flex-col">
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={sport.image}
                        alt={sport.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay - strengthened for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
                </div>

                {/* Registration status badge */}
                {sport.registrationStatus === 'open' ? (
                    <a
                        href={sport.registrationLink}
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
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--primary)] transition-colors duration-300 leading-tight">
                        {sport.title}
                    </h3>
                    <p className="text-gray-200 text-base mb-4 line-clamp-2 leading-relaxed font-medium">
                        {sport.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm font-semibold text-white/90 border-t border-white/20 pt-4">
                        <span className="flex items-center gap-1.5">
                            <IconUsers size={18} className="text-[var(--primary)]" />
                            {sport.teamSize}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <IconCalendar size={18} className="text-[var(--secondary)]" />
                            {sport.date.split(',')[0]}
                        </span>
                    </div>
                </div>

                {/* Hover arrow */}
                <motion.div
                    className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <IconChevronRight className="text-[var(--primary)]" size={24} />
                </motion.div>
            </div>
        </motion.div>
    );
}


// Modal component
function SportModal({ sport, onClose }) {
    if (!sport) return null;

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
                        src={sport.image}
                        alt={sport.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-[var(--primary)] hover:text-black transition-all border border-white/10 z-50 group/close"
                    >
                        <IconX size={20} className="text-white group-hover/close:text-black" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 -mt-20 relative z-10">
                    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 mb-8 shadow-2xl">
                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{sport.title}</h2>
                        <p className="text-white/60 text-lg">{sport.description}</p>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--primary)]/30 transition-colors">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-2 uppercase tracking-wider font-semibold">
                                <IconUsers size={18} />
                                Team Size
                            </div>
                            <div className="text-white text-lg font-medium">{sport.teamSize}</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--primary)]/30 transition-colors">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-2 uppercase tracking-wider font-semibold">
                                <IconTrophy size={18} />
                                Entry Fee
                            </div>
                            <div className="text-[var(--primary)] text-lg font-bold">{sport.entryFee}</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--primary)]/30 transition-colors">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-2 uppercase tracking-wider font-semibold">
                                <IconCalendar size={18} />
                                Date
                            </div>
                            <div className="text-white text-lg font-medium">{sport.date}</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-[var(--primary)]/30 transition-colors">
                            <div className="flex items-center gap-2 text-white/40 text-sm mb-2 uppercase tracking-wider font-semibold">
                                <IconMapPin size={18} />
                                Venue
                            </div>
                            <div className="text-white text-lg font-medium">{sport.venue}</div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://universitywebsitbucket.s3.ap-south-1.amazonaws.com/vitopia/Final+Rules+%26+Regulations.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-4 px-6 rounded-xl transition-all font-medium border border-white/5"
                        >
                            <IconExternalLink size={20} />
                            Rules & Regulations
                        </a>
                        {sport.registrationStatus === 'open' ? (
                            <a
                                href={sport.registrationLink || '#'}
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
function SportsPage() {
    const [selectedSport, setSelectedSport] = useState(null);
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
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--primary)]/10 blur-[120px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--secondary)]/10 blur-[100px]"
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
                            className="inline-flex md:mt-5 items-center gap-2 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full px-4 py-2 mb-8"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <IconTrophy className="text-[var(--primary)]" size={18} />
                            <span className="text-[var(--primary)] text-sm font-medium">VITOPIA 2025 Sports</span>
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                            <span className="block">COMPETE.</span>
                            <span className="block bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent">
                                CONQUER.
                            </span>
                            <span className="block">CELEBRATE.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Join the ultimate sporting extravaganza featuring 8+ sports disciplines,
                            thousands of athletes, and unforgettable moments.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                            {[
                                { value: 8, suffix: "+", label: "Sports" },
                                { value: 500, suffix: "+", label: "Participants" },
                                { value: 3, suffix: "", label: "Days" }
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



            {/* Sports Grid Section */}
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
                            Featured Sports
                        </h2>
                        <p className="text-white/50 max-w-xl mx-auto">
                            Explore our lineup of thrilling sports competitions
                        </p>
                    </motion.div>

                    {/* Sports grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sportsData.map((sport, index) => (
                            <SportCard
                                key={sport.id}
                                sport={sport}
                                index={index}
                                onClick={setSelectedSport}
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
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--primary)]/20 via-[#0a0a0a] to-[var(--secondary)]/10 border border-white/5 p-12 text-center"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-[80px]" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--secondary)]/10 rounded-full blur-[60px]" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready for the Challenge?
                            </h2>
                            <p className="text-white/50 mb-8 max-w-xl mx-auto">
                                Registrations are now <strong>OPEN</strong> for all sports. Secure your spot and represent your college!
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="https://events.vitap.ac.in/e/vitopia-sports-2026-ca922eb3-2265-4aca-bc56-5607cb39d99f"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[var(--primary)] text-black font-semibold px-8 py-4 rounded-full hover:bg-[var(--primary)]/90 transition-all hover:scale-105 active:scale-95"
                                >
                                    Register Now
                                </a>
                                <a
                                    href="https://universitywebsitbucket.s3.ap-south-1.amazonaws.com/vitopia/Final+Rules+%26+Regulations.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white/5 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
                                >
                                    <IconExternalLink size={20} />
                                    Rules & Regulations
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />

            {/* Modal */}
            <AnimatePresence>
                {selectedSport && (
                    <SportModal sport={selectedSport} onClose={() => setSelectedSport(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default SportsPage;
