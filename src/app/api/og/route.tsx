import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import universityTypes from '@/data/universityTypes.json';
import { typeDescriptions } from '@/data/typeDescriptions';

export const runtime = 'edge';

// Simple mapping from Tailwind classes used in universityTypes.json to Hex codes
// Used because Satori (ImageResponse) doesn't resolve Tailwind classes automatically without setup.
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
        const bgColor = colorMap[uniData.color] || '#4f46e5'; // Default indigo

        const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
        const characterImageUrl = `${origin}${uniData.image}`;

        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f8fafc', // slate-50
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: '"Noto Sans JP", sans-serif',
                    }}
                >
                    {/* Card Container */}
                    <div
                        style={{
                            display: 'flex',
                            width: '90%',
                            height: '85%',
                            backgroundColor: 'white',
                            borderRadius: '50px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        {/* Left Side: Text */}
                        <div
                            style={{
                                flex: '1.3',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: '60px',
                                backgroundColor: '#ffffff',
                                position: 'relative',
                            }}
                        >
                            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#64748b', marginBottom: 16, letterSpacing: '0.05em' }}>
                                あなたの性格タイプ
                            </div>
                            <div style={{ fontSize: 96, fontWeight: 900, color: '#1e293b', lineHeight: 1, marginBottom: 16 }}>
                                {uniData.name}
                            </div>
                            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#94a3b8', marginBottom: 48 }}>
                                {type}
                            </div>

                            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#334155', lineHeight: 1.4, marginBottom: 24 }}>
                                {uniData.stereotype}
                            </div>

                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
                                <div style={{ fontSize: 24, color: '#cbd5e1', fontWeight: 'bold' }}>
                                    #UniType16
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Image with Background */}
                        <div
                            style={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: bgColor,
                                position: 'relative',
                            }}
                        >
                            {/* Slanted Separator Effect */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -50,
                                    left: -60,
                                    width: 120,
                                    height: '140%',
                                    backgroundColor: 'white',
                                    transform: 'rotate(10deg)',
                                }}
                            />

                            {/* Character Image */}
                            <img
                                src={characterImageUrl}
                                alt={uniData.name}
                                style={{
                                    width: '85%',
                                    height: '85%',
                                    objectFit: 'contain',
                                    position: 'relative',
                                    zIndex: 10,
                                }}
                            />
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
