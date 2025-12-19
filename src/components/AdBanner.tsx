"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface AdBannerProps {
    slot: string;
    format?: "auto" | "rectangle" | "vertical" | "horizontal";
    responsive?: boolean;
    className?: string;
}

export function AdBanner({
    slot,
    format = "auto",
    responsive = true,
    className = ""
}: AdBannerProps) {
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
            style={{ display: "block" }}
            data-ad-client="ca-pub-5978675398132986"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
        />
    );
}

// Sidebar ad component for desktop quiz pages
export function SidebarAd() {
    return (
        <div className="hidden xl:block fixed top-28 w-[160px] h-[600px]">
            <div className="bg-slate-100 rounded-lg overflow-hidden h-full flex items-center justify-center text-slate-400 text-xs">
                {/* AdSense will fill this space */}
                <AdBanner
                    slot="YOUR_VERTICAL_AD_SLOT_ID"
                    format="vertical"
                    responsive={false}
                    className="w-[160px] h-[600px]"
                />
            </div>
        </div>
    );
}

// Left sidebar positioned
export function LeftSidebarAd() {
    return (
        <div className="hidden xl:block fixed top-28 left-4 2xl:left-[calc((100vw-800px)/2-180px)] w-[160px] h-[600px] z-30">
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden h-full">
                <AdBanner
                    slot="YOUR_VERTICAL_AD_SLOT_ID"
                    format="vertical"
                    responsive={false}
                    className="w-[160px] h-[600px]"
                />
            </div>
        </div>
    );
}

// Right sidebar positioned
export function RightSidebarAd() {
    return (
        <div className="hidden xl:block fixed top-28 right-4 2xl:right-[calc((100vw-800px)/2-180px)] w-[160px] h-[600px] z-30">
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden h-full">
                <AdBanner
                    slot="YOUR_VERTICAL_AD_SLOT_ID"
                    format="vertical"
                    responsive={false}
                    className="w-[160px] h-[600px]"
                />
            </div>
        </div>
    );
}
