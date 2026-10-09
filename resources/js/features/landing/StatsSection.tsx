import { DarkVeil } from '@/components/DarkVeil';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useCreative } from '@/context/CreativeContext';
import { Layers, Users, Award, Code2 } from 'lucide-react';

interface StatsSectionProps {
    stats?: {
        projects?: number;
        members?: number;
        finished?: number;
        years?: number;
    };
}

export function StatsSection({ stats }: StatsSectionProps) {
    const { config } = useCreative();

    const items = [
        {
            value: stats?.projects ?? '5',
            label: 'Proyectos Desarrollados',
            sub: 'Plataformas & Apps',
            icon: Layers,
            glowColor: 'rgba(6,182,212,0.28)',
        },
        {
            value: stats?.members ?? '8',
            label: 'Ingenieros & Especialistas',
            sub: 'Consorcio Activo',
            icon: Users,
            glowColor: 'rgba(56,189,248,0.28)',
        },
        {
            value: stats?.finished ?? '2',
            label: 'Entregas en Producción',
            sub: '100% Verificadas',
            icon: Award,
            glowColor: 'rgba(16,185,129,0.28)',
        },
        {
            value: stats?.years ?? '3',
            label: 'Años de Trayectoria',
            sub: 'I+D & Software',
            icon: Code2,
            glowColor: 'rgba(168,85,247,0.28)',
        },
    ];

    return (
        <section className="relative overflow-hidden bg-[#050610] text-white py-14 sm:py-16 lg:py-20 border-b border-white/10">
            {/* DarkVeil Background Canvas */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-75">
                <DarkVeil
                    hueShift={config.darkVeil.hueShift}
                    speed={config.darkVeil.speed}
                    scanlineFrequency={config.darkVeil.scanlineFrequency}
                    warpAmount={config.darkVeil.warpAmount}
                    noiseIntensity={config.darkVeil.noiseIntensity}
                    scanlineIntensity={config.darkVeil.scanlineIntensity}
                    resolutionScale={config.darkVeil.resolutionScale}
                    lightMode={config.darkVeil.lightMode}
                />
                {/* Atmospheric gradient overlay for depth, contrast and fluid blending */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050610]/75 via-[#050610]/40 to-[#050610]/85" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,6,16,0.65)_100%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
                <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <ScrollReveal key={item.label} delay={index * 90}>
                                <div className="group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 cursor-default">
                                    {/* Liquid Glass Background Layers */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-white/[0.04] backdrop-blur-xl sm:backdrop-blur-2xl transition-all duration-500 group-hover:from-white/[0.12] group-hover:to-white/[0.06]" />
                                    <div className="absolute inset-0 rounded-2xl bg-[#050610]/50" />

                                    {/* Specular Reflective Edges ("Bordes reflectantes liquid glass") */}
                                    {/* 1. Base Glass Border */}
                                    <div className="absolute inset-0 rounded-2xl border border-white/15 transition-all duration-500 group-hover:border-cyan-400/40" />

                                    {/* 2. Top Specular Edge Highlight (Reflected Light Beam) */}
                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] rounded-t-2xl bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:via-cyan-300" />

                                    {/* 3. Lateral Specular Glare (Prismatic Edge Light) */}
                                    <div className="pointer-events-none absolute inset-y-0 left-0 w-[1px] rounded-l-2xl bg-gradient-to-b from-white/50 via-white/10 to-transparent opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:from-cyan-300/80" />

                                    {/* 4. Bottom Ambient Refraction */}
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] rounded-b-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                    {/* 5. Inset & Drop Specular Shadow */}
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-1px_1px_rgba(255,255,255,0.04),0_12px_32px_-4px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.25),inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_0_20px_rgba(56,189,248,0.12)]" />

                                    {/* 6. Liquid Glare Ambient Glow behind content */}
                                    <div
                                        className="pointer-events-none absolute -top-12 -left-12 h-36 w-36 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                        style={{ backgroundColor: item.glowColor }}
                                    />

                                    {/* Card Content (Elevated z-10) */}
                                    <div className="relative z-10">
                                        {/* Card Header: Icon + Category Badge */}
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] text-cyan-300 transition-all duration-300 group-hover:scale-105 group-hover:text-cyan-200 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                                <Icon size={19} />
                                            </div>
                                            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-300/90 bg-cyan-950/50 border border-cyan-400/25 px-2.5 py-1 rounded-full backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                                                {item.sub}
                                            </span>
                                        </div>

                                        {/* Card Metric: Value */}
                                        <div className="mt-6 flex items-baseline gap-2">
                                            <dd className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]">
                                                {item.value}
                                            </dd>
                                            <span className="font-mono text-base font-bold text-cyan-400 select-none">+</span>
                                        </div>

                                        {/* Card Label */}
                                        <dt className="mt-2 text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300 leading-snug">
                                            {item.label}
                                        </dt>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </dl>
            </div>
        </section>
    );
}

export default StatsSection;
