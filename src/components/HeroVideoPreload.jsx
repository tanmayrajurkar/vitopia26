"use client";

import { useEffect } from "react";

function getSupabaseBase() {
    const b = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return b ? String(b).replace(/\/$/, "") : "";
}

/**
 * Preloads hero video: MP4 if set; else hybrid HLS manifest (same-origin) or Supabase HLS manifest.
 */
export default function HeroVideoPreload() {
    useEffect(() => {
        if (typeof document === "undefined") return;

        const mp4Url = process.env.NEXT_PUBLIC_HERO_VIDEO_MP4_URL?.trim();
        const useHybridHls = process.env.NEXT_PUBLIC_USE_HYBRID_HLS;
        const base = getSupabaseBase();

        const links = [];

        if (mp4Url) {
            const preconnect = document.createElement("link");
            preconnect.rel = "preconnect";
            try {
                const u = new URL(mp4Url);
                preconnect.href = u.origin;
                preconnect.crossOrigin = "anonymous";
                document.head.appendChild(preconnect);
                links.push(preconnect);
            } catch (_) {}

            const preload = document.createElement("link");
            preload.rel = "preload";
            preload.href = mp4Url;
            preload.as = "video";
            preload.type = "video/mp4";
            document.head.appendChild(preload);
            links.push(preload);
        } else if (useHybridHls) {
            const origin = window.location.origin;
            const preloadManifest = document.createElement("link");
            preloadManifest.rel = "preload";
            preloadManifest.href = `${origin}/hls/index.m3u8`;
            preloadManifest.as = "fetch";
            document.head.appendChild(preloadManifest);
            links.push(preloadManifest);

            for (let i = 0; i <= 4; i++) {
                const seg = `segment_${String(i).padStart(3, "0")}.ts`;
                const preloadSeg = document.createElement("link");
                preloadSeg.rel = "preload";
                preloadSeg.href = `${origin}/hls/${seg}`;
                preloadSeg.as = "fetch";
                document.head.appendChild(preloadSeg);
                links.push(preloadSeg);
            }

            if (base) {
                const segmentBase = `${base}/storage/v1/object/public/video`;
                const preconnect = document.createElement("link");
                preconnect.rel = "preconnect";
                preconnect.href = base;
                preconnect.crossOrigin = "anonymous";
                document.head.appendChild(preconnect);
                links.push(preconnect);
                for (let i = 11; i <= 15; i++) {
                    const seg = `segment_${String(i).padStart(3, "0")}.ts`;
                    const preloadSeg = document.createElement("link");
                    preloadSeg.rel = "preload";
                    preloadSeg.href = `${segmentBase}/${seg}`;
                    preloadSeg.as = "fetch";
                    preloadSeg.crossOrigin = "anonymous";
                    document.head.appendChild(preloadSeg);
                    links.push(preloadSeg);
                }
            }
        } else if (base) {
            const preconnect = document.createElement("link");
            preconnect.rel = "preconnect";
            preconnect.href = base;
            preconnect.crossOrigin = "anonymous";
            document.head.appendChild(preconnect);
            links.push(preconnect);

            const manifestUrl = `${base}/storage/v1/object/public/video/index.m3u8`;
            const preload = document.createElement("link");
            preload.rel = "preload";
            preload.href = manifestUrl;
            preload.as = "fetch";
            preload.crossOrigin = "anonymous";
            document.head.appendChild(preload);
            links.push(preload);
        }

        return () => links.forEach((el) => el.remove());
    }, []);

    return null;
}
