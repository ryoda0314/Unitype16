import { Metadata, ResolvingMetadata } from 'next';
import universityTypes from '@/data/universityTypes.json';
import { Header } from '@/components/Header';
import Link from 'next/link';

type Props = {
    params: Promise<{ type: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { type } = await params;

    // Validate type
    const uniData = universityTypes[type as keyof typeof universityTypes];
    if (!uniData) {
        return {
            title: 'UniType16 - 大学ラベル性格診断',
        }
    }

    const title = `私の性格タイプは【${uniData.name}】でした！ | UniType16`;
    const description = uniData.stereotype.replace(/\n/g, ' ');

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: [`/api/og?type=${type}`],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [`/api/og?type=${type}`],
        },
    }
}

export default async function SharePage({ params }: Props) {
    const { type } = await params;
    const uniData = universityTypes[type as keyof typeof universityTypes];

    if (!uniData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>タイプが見つかりませんでした。</p>
                <Link href="/" className="ml-4 text-indigo-600 hover:underline">トップへ戻る</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-700 pt-16">
            {/* Header is client component, might need wrapper or just omit strict props for simple view */}
            {/* We can reproduce a simple header or use the component if it handles missing props gracefully or we pass dummies. 
                 Header needs callbacks. We'll just put a simple nav here. */}
            <header className="fixed top-0 left-0 right-0 h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-4 lg:px-8 shadow-sm">
                <Link href="/" className="flex items-center gap-4 hover:opacity-70 transition-opacity">
                    <img
                        src="/assets/logo_header.png"
                        alt="UniType16 Logo"
                        className="h-20 w-auto object-contain hover:scale-105 transition-transform translate-y-2"
                    />
                    <span className="text-4xl font-black text-slate-800 tracking-tight font-sans">
                        UniType<span className="text-indigo-600">16</span>
                    </span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto py-12 px-6">
                <div className="text-center mb-12">
                    <p className="text-slate-500 font-bold mb-2">共有された診断結果</p>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800">
                        この人のタイプは<br />
                        <span className="text-indigo-600 text-5xl md:text-6xl mt-2 block">{uniData.name}</span>
                    </h1>
                </div>

                <div className="flex flex-col items-center justify-center mb-12">
                    <div className="relative w-full max-w-lg aspect-square bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 flex items-center justify-center overflow-hidden">
                        <div className={`absolute inset-0 opacity-10 ${uniData.color} rounded-[3rem]`}></div>
                        <img
                            src={uniData.image}
                            alt={uniData.name}
                            className="w-full h-full object-contain drop-shadow-lg"
                        />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto text-center mb-16">
                    <p className="text-xl font-bold text-slate-700 whitespace-pre-line leading-relaxed">
                        {uniData.stereotype}
                    </p>
                </div>

                <div className="text-center space-y-6">
                    <p className="text-slate-500 font-medium">あなたは何タイプ？</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:shadow-xl hover:-translate-y-1 shadow-lg shadow-indigo-200"
                    >
                        診断スタート
                    </Link>
                </div>
            </main>
        </div>
    );
}
