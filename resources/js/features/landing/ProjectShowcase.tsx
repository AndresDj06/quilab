import { useMemo } from 'react';
import FlexCarousel from '@/components/FlexCarousel';
import type { CarouselItem } from '@/types';
import { Layers, MousePointerClick, Sparkles } from 'lucide-react';

interface ProjectShowcaseProps {
    items?: CarouselItem[];
}

const DEFAULT_ITEMS: CarouselItem[] = [
    {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=max',
        alt: 'Data Lakehouse & Realtime Metrics',
        title: 'Nexus Analytics Core',
        subtitle: 'Plataforma de Datos & Telemetría en Tiempo Real'
    },
    {
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=max',
        alt: 'Cloud Kubernetes Cluster',
        title: 'KubeMesh Orchestrator',
        subtitle: 'Infraestructura Cloud Multi-Región'
    },
    {
        src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80&auto=format&fit=max',
        alt: 'Zero-Trust Protocol Engine',
        title: 'CipherShield Gateway',
        subtitle: 'Seguridad Empresarial & Criptografía'
    },
    {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80&auto=format&fit=max',
        alt: 'LLM Orchestration & Inference',
        title: 'Synapse Cognitive Engine',
        subtitle: 'Modelos de Inteligencia Artificial & RAG'
    },
    {
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=max',
        alt: 'Fintech Transaction Hub',
        title: 'Pulse Financial Gateway',
        subtitle: 'Procesamiento de Pagos de Alta Disponibilidad'
    }
];

export function ProjectShowcase({ items }: ProjectShowcaseProps) {
    const carouselItems = useMemo(() => {
        if (items && items.length >= 3) {
            return items;
        }
        if (items && items.length > 0) {
            return [...items, ...DEFAULT_ITEMS.slice(items.length)];
        }
        return DEFAULT_ITEMS;
    }, [items]);

    return (
        <section id="showcase" className="relative bg-[#050610] text-white py-24 overflow-hidden border-b border-white/10">
            {/* Ambient background glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.12),transparent_60%)]" />

            <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-mono text-sky-300">
                            <Sparkles size={13} className="text-sky-400" />
                            <span>02 // CAPTURAS & SHOWCASE INTERACTIVO</span>
                        </div>
                        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Arquitecturas visuales e interfaces en producción.
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                            Explora capturas interactivas de nuestras plataformas de software, sistemas distribuidos y consolas de ingeniería impulsadas por WebGL fluid lens.
                        </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                        <MousePointerClick size={14} className="text-sky-400" />
                        <span>Haz clic o arrastra para navegar</span>
                    </div>
                </div>

                {/* Interactive 3D FlexCarousel Container */}
                <div className="mt-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 p-2 sm:p-4 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.6)]">
                    <div style={{ width: '100%', height: '560px', position: 'relative' }}>
                        <FlexCarousel
                            items={carouselItems}
                            preset="liquid"
                            intro="rise"
                            cardHeight={0.5}
                            gap={12}
                            squeeze={0.2}
                            focusOnClick
                            captions
                            fit="natural"
                            radius={0}
                            lensWidth={0.74}
                            lensHeight={1.18}
                            tilt={62}
                            roundness={1}
                            bend={0.34}
                            reach={0.38}
                            curl="twist"
                            dispersion={0.45}
                            liquid={0}
                            followCursor={false}
                            autoplay={false}
                            interval={4}
                            captureWheel
                        />
                    </div>
                </div>

                {/* Footer caption bar */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 px-2">
                    <span className="flex items-center gap-2">
                        <Layers size={13} className="text-sky-400" />
                        <span>Capturas administrables vía CRUD en Panel Admin</span>
                    </span>
                    <span>WebGL Shader · OGL Engine</span>
                </div>
            </div>
        </section>
    );
}
