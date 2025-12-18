import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import universityTypes from '@/data/universityTypes.json';
import { typeDescriptions } from '@/data/typeDescriptions';

export const runtime = 'edge';

const colorMap: Record<string, string> = {
    "bg-emerald-500": "#10b981",
    "bg-teal-500": "#14b8a6",
    "bg-cyan-500": "#06b6d4",
    "bg-sky-500": "#0ea5e9",
    "bg-blue-600": "#2563eb",
    "bg-indigo-600": "#4f46e5",
    "bg-violet-600": "#7c3aed",
    "bg-purple-600": "#9333ea",
    "bg-fuchsia-600": "#c026d3",
    "bg-rose-500": "#f43f5e",
    "bg-orange-500": "#f97316",
    "bg-amber-500": "#f59e0b",
    "bg-yellow-500": "#eab308",
    "bg-lime-500": "#84cc16",
    "bg-green-500": "#22c55e",
    "bg-emerald-600": "#059669",
};

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');

        if (!type || !universityTypes[type as keyof typeof universityTypes]) {
            return new Response('Type not found', { status: 404 });
        }

        const uniData = universityTypes[type as keyof typeof universityTypes];
        const descData = typeDescriptions[type as keyof typeof typeDescriptions];
        const bgColor = colorMap[uniData.color] || '#4f46e5';

        const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
        const characterImageUrl = `${origin}${uniData.image}`;

        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f8fafc',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: '"Noto Sans JP", sans-serif',
                    }}
                >
                    {/* Main Container - Matches ResultView Hero */}
                    <div
                        style={{
                            display: 'flex',
                            width: '95%',
                            height: '90%',
                            backgroundColor: 'white',
                            borderRadius: '60px',
                            overflow: 'hidden',
                            boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.2)',
                            position: 'relative',
                        }}
                    >
                        {/* Colored Background Shape (Right Side) */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '55%',
                                height: '100%',
                                backgroundColor: bgColor,
                                // Satori doesn't support complex clip-path polygon perfectly, 
                                // using a slanted transform or just a straight angle is safer.
                                // Let's try a simple skewed separator approach or just a rect for now to be safe, 
                                // but User liked the diagonal in ResultView.
                                // We'll try to visually mimic it with a rotated white blocker if needed, 
                                // but a straight colored block is cleaner for OG if clip-path fails.
                                // Let's try Satori's polygon if possible, or just a rotated div.
                                clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)', // Try this, commonly supported in newer Satori
                            }}
                        />

                        {/* Content Wrapper */}
                        <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', zIndex: 10 }}>

                            {/* Left Panel: Text */}
                            <div
                                style={{
                                    flex: '1.2',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    padding: '60px',
                                    paddingRight: '20px',
                                }}
                            >
                                <div style={{ fontSize: 24, fontWeight: 'bold', color: '#64748b', marginBottom: 12, letterSpacing: '0.05em' }}>
                                    あなたの性格タイプ
                                </div>
                                <div style={{ fontSize: 90, fontWeight: 900, color: '#1e293b', lineHeight: 1.1, marginBottom: 16 }}>
                                    {uniData.name}
                                </div>
                                <div style={{ fontSize: 48, fontWeight: 'bold', color: '#94a3b8', marginBottom: 40 }}>
                                    {type}
                                </div>

                                <div style={{ fontSize: 30, fontWeight: 'bold', color: '#334155', lineHeight: 1.5, marginBottom: 24 }}>
                                    {uniData.stereotype}
                                </div>

                                {/* Tagline */}
                                {descData?.tagline && (
                                    <div style={{ fontSize: 24, color: '#64748b', marginTop: 10 }}>
                                        {descData.tagline}
                                    </div>
                                )}
                            </div>

                            {/* Right Panel: Character ID Card */}
                            <div
                                style={{
                                    flex: '1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '40px',
                                }}
                            >
                                {/* ID Card Container */}
                                <div
                                    style={{
                                        display: 'flex',
                                        backgroundColor: 'white',
                                        borderRadius: '40px',
                                        padding: '30px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                        transform: 'rotate(2deg)', // The "Student ID" tilt
                                        width: '420px', // Fixed size constraints for typical OG
                                        height: '520px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    {/* Slot hint */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 20,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: 60,
                                            height: 6,
                                            backgroundColor: '#f1f5f9',
                                            borderRadius: 999,
                                        }}
                                    />

                                    <img
                                        src={characterImageUrl}
                                        alt={uniData.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
    }
}
