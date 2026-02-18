import { NextResponse } from "next/server";

/**
 * Hybrid HLS manifest: segment_000–010 from repo (public/hls/), segment_011–035 from Supabase.
 * Served at /hls/index.m3u8 via rewrite so relative segment paths resolve to same origin.
 */

const SEGMENT_DURATION = 2.0; // seconds per segment (adjust to match your encode)
const LOCAL_FIRST = 0;   // segment_000.ts (from repo)
const LOCAL_LAST = 10;   // through segment_010.ts = 11 segments from repo
const SUPABASE_FIRST = 11;
const SUPABASE_LAST = 35; // segment_011.ts to segment_035.ts = 25 segments from Supabase

function pad3(n) {
    return String(n).padStart(3, "0");
}

export async function GET() {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") || "";
    const segmentBase = base ? `${base}/storage/v1/object/public/video` : "";

    const lines = [
        "#EXTM3U",
        "#EXT-X-VERSION:3",
        "#EXT-X-TARGETDURATION:" + Math.ceil(SEGMENT_DURATION),
        "#EXT-X-MEDIA-SEQUENCE:0",
        "#EXT-X-PLAYLIST-TYPE:VOD",
    ];

    for (let i = LOCAL_FIRST; i <= LOCAL_LAST; i++) {
        lines.push(`#EXTINF:${SEGMENT_DURATION.toFixed(6)},`);
        lines.push(`segment_${pad3(i)}.ts`);
    }

    for (let i = SUPABASE_FIRST; i <= SUPABASE_LAST; i++) {
        lines.push(`#EXTINF:${SEGMENT_DURATION.toFixed(6)},`);
        if (segmentBase) {
            lines.push(`${segmentBase}/segment_${pad3(i)}.ts`);
        } else {
            lines.push(`segment_${pad3(i)}.ts`);
        }
    }

    lines.push("#EXT-X-ENDLIST");

    const body = lines.join("\n");

    return new NextResponse(body, {
        headers: {
            "Content-Type": "application/vnd.apple.mpegurl",
            "Cache-Control": "public, max-age=60",
        },
    });
}
