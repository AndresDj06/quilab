import { HeroGrid } from '@/components/HeroGrid';
import { DarkVeil } from '@/components/DarkVeil';
import GlowCursor from '@/components/GlowCursor';
import TechText from '@/components/TechText';
import VaporType from '@/components/VaporType';
import SpecularButton from '@/components/SpecularButton';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useCreative } from '@/context/CreativeContext';
import { ArrowRight, Code2, Cpu, Database, Layers, Users, Award } from 'lucide-react';

const techBadges = [
    { icon: Code2, label: 'Full-Stack Architecture' },
    { icon: Layers, label: 'Cloud & Kubernetes' },
    { icon: Database, label: 'Distributed Systems' },
    { icon: Cpu, label: 'AI & Data Pipelines' },
];

export interface HeroProps {
    stats?: {
        projects?: number;
        members?: number;
        finished?: number;
        years?: number;
    };
}

export function Hero({ stats }: HeroProps) {
    const { config } = useCreative();

    const statsList = [
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
        <section className="relative bg-[#050610] text-white overflow-hidden">
            {/* Unified Combined Background for the Entire Hero and Stats */}
            <div className="pointer-events-none absolute inset-0 z-0">
                {/* 1. DarkVeil WebGL Procedural Shader Canvas across the full Hero */}
                <div className="absolute inset-0 opacity-75">
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
                </div>

                {/* 2. Overlaid Parametric Grid & Node Network on transparent canvas */}
                <HeroGrid transparent={true} />

                {/* 3. Smooth Atmospheric Depth and Color Grading */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050610]/80 via-[#050610]/45 to-[#050610]/85" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,transparent_25%,rgba(5,6,16,0.65)_100%)]" />
            </div>

            {/* Viewport 1: Hero Main Stage (Fills 100% of the screen/tab on load) */}
            <div className="relative z-10 min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] flex flex-col justify-center">
                <GlowCursor
                    color={config.glowCursor.color1}
                    secondaryColor={config.glowCursor.color2}
                    trailLength={config.glowCursor.trailLength}
                    trailWidth={config.glowCursor.trailWidth}
                    trailTaper={config.glowCursor.trailTaper}
                    followSpeed={config.glowCursor.followSpeed}
                    glowIntensity={config.glowCursor.glowIntensity}
                    glowSpread={config.glowCursor.glowSpread}
                    brightness={config.glowCursor.brightness}
                    pulseSpeed={config.glowCursor.pulseSpeed}
                    noiseStrength={config.glowCursor.noiseStrength}
                    idleFade={config.glowCursor.idleFade}
                    idleTimeout={config.glowCursor.idleTimeout}
                    fadeDuration={900}
                    blendMode="screen"
                    className="relative z-10 flex-1 flex flex-col justify-center"
                >
                    <div className="relative mx-auto w-full max-w-7xl px-5 py-8 sm:py-12 lg:px-8 lg:py-16">
                        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
                            {/* Left Column: Floating Headline & Introduction */}
                            <div className="lg:col-span-7 flex flex-col justify-center">
                                {/* Headline */}
                                <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.16]">
                                    Construimos software de{' '}
                                    <VaporType
                                        align="start"
                                        words={['alto impacto', 'gran alcance', 'alto rendimiento', 'gran valor']}
                                        color={config.vaporType.color}
                                        vaporColor={config.vaporType.vaporColor}
                                        sweep="left"
                                        spread={config.vaporType.spread}
                                        rise={config.vaporType.rise}
                                        turbulence={config.vaporType.turbulence}
                                        density={config.vaporType.density}
                                        condense={config.vaporType.condense}
                                        hold={config.vaporType.hold}
                                        dissolve={config.vaporType.dissolve}
                                        className="font-bold text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                                    />{' '}
                                    <span className="inline-block">y arquitectura escalable.</span>
                                </h1>

                                {/* Subtitle */}
                                <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-300/90 max-w-2xl">
                                    QUILAB reúne escuadras especializadas de ingenieros senior, arquitectos de software y líderes de producto para diseñar, desarrollar y desplegar plataformas digitales de misión crítica.
                                </p>

                                {/* Dynamic Tech Pods */}
                                <div className="mt-6 flex flex-wrap items-center gap-2">
                                    {techBadges.map((badge, idx) => {
                                        const Icon = badge.icon;
                                        return (
                                            <div
                                                key={idx}
                                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-300 backdrop-blur-sm transition-colors hover:border-sky-400/40 hover:text-white"
                                            >
                                                <Icon size={14} className="text-sky-400" />
                                                <span>{badge.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Action Buttons using SpecularButton */}
                                <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                                    <SpecularButton
                                        to="/proyectos"
                                        variant="primary"
                                        size="md"
                                        radius={12}
                                        className="font-mono text-xs font-bold tracking-wider uppercase"
                                    >
                                        <span>Explorar Proyectos</span>
                                        <ArrowRight size={15} />
                                    </SpecularButton>

                                    <SpecularButton
                                        to="/nosotros"
                                        variant="secondary"
                                        size="md"
                                        radius={12}
                                        className="font-mono text-xs font-semibold tracking-wider uppercase"
                                    >
                                        <span>Conocer el Consorcio</span>
                                    </SpecularButton>
                                </div>
                            </div>

                            {/* Right Column: Floating Interactive Stage for <quilab> */}
                            <div className="lg:col-span-5">
                                <div className="relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-950/65 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(56,189,248,0.1)] overflow-hidden min-h-[300px] sm:min-h-[380px] lg:min-h-[440px]">
                                    {/* Radial Glow Effect */}
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.15),transparent_70%)]" />

                                    <div className="relative w-full h-[240px] sm:h-[320px] select-none">
                                        <TechText
                                            text="<quilab>"
                                            fontWeight={600}
                                            fontSize={150}
                                            reveal="letter"
                                            dashLength={4}
                                            dashGap={2}
                                            specks={15}
                                            color="#ffffff"
                                            accentColor="#38bdf8"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlowCursor>
            </div>

            {/* Continuous Second Fold: Liquid Glass Stats Sharing the Same Unified Background */}
            <div className="relative z-10 w-full pt-4 pb-16 lg:pt-8 lg:pb-24">
                <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
                        {statsList.map((item, index) => {
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
            </div>
        </section>
    );
}
