"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface AdBannerProps {
    className?: string;
    style?: React.CSSProperties;
}

export function AdBanner({ className = "", style }: AdBannerProps) {
    const adRef = useRef<HTMLModElement>(null);
    const isLoaded = useRef(false);

    useEffect(() => {
        if (!isLoaded.current && adRef.current) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                isLoaded.current = true;
            } catch (e) {
                console.error("AdSense error:", e);
            }
        }
    }, []);

    return (
        <ins
            ref={adRef}
            className={`adsbygoogle ${className}`}
            style={{ display: "block", ...style }}
            data-ad-client="ca-pub-5978675398132986"
            data-ad-slot=""
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
}

// Vertical sidebar ad for desktop quiz pages
export function VerticalSidebarAd({ className = "" }: { className?: string }) {
    const adRef = useRef<HTMLModElement>(null);
    const isLoaded = useRef(false);

    useEffect(() => {
        if (!isLoaded.current && adRef.current) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                isLoaded.current = true;
            } catch (e) {
                console.error("AdSense error:", e);
            }
        }
    }, []);

    return (
        <ins
            ref={adRef}
            className={`adsbygoogle ${className}`}
            style={{
                display: "inline-block",
                width: "160px",
                height: "600px"
            }}
            data-ad-client="ca-pub-5978675398132986"
        />
    );
}

// Left sidebar positioned
export function LeftSidebarAd() {
    return (
        <div className="hidden xl:flex fixed top-28 left-4 2xl:left-[calc((100vw-800px)/2-180px)] w-[160px] h-[600px] z-30 items-center justify-center">
            <div className="bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200/50 rounded-xl overflow-hidden w-full h-full flex items-center justify-center">
                <VerticalSidebarAd />
            </div>
        </div>
    );
}

// Right sidebar positioned
export function RightSidebarAd() {
    return (
        <div className="hidden xl:flex fixed top-28 right-4 2xl:right-[calc((100vw-800px)/2-180px)] w-[160px] h-[600px] z-30 items-center justify-center">
            <div className="bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200/50 rounded-xl overflow-hidden w-full h-full flex items-center justify-center">
                <VerticalSidebarAd />
            </div>
        </div>
    );
}
