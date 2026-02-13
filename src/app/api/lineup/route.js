import { NextResponse } from "next/server";


const REVEAL_DATE = new Date("2026-02-10T19:00:00+05:30");

const ARTISTS = [
    { name: "DIVINE", role: "HEADLINER - DAY 1", date: "FEB 22", color: "from-yellow-400 to-orange-500", image: "" },
    { name: "JONITA GANDHI", role: "HEADLINER - DAY 2", date: "FEB 23", color: "from-pink-500 to-purple-500", image: "" },
    { name: "RITVIZ", role: "HEADLINER - DAY 3", date: "FEB 24", color: "from-lime-400 to-emerald-500", image: "" },
    { name: "LOCAL TRAIN", role: "SUPPORTING ACT", date: "FEB 23", color: "from-blue-400 to-cyan-500", image: "" },
];

export async function GET() {
    const now = new Date();

    if (now >= REVEAL_DATE) {
        return NextResponse.json({
            revealed: true,
            artists: ARTISTS,
            revealTimestamp: REVEAL_DATE.toISOString(),
        });
    }

    return NextResponse.json({
        revealed: false,
        artists: [],
        revealTimestamp: REVEAL_DATE.toISOString(),
    });
}
