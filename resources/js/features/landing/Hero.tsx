import { HeroGrid } from '@/components/HeroGrid';
import GlowCursor from '@/components/GlowCursor';
import TechText from '@/components/TechText';
import VaporType from '@/components/VaporType';
import SpecularButton from '@/components/SpecularButton';
import { useCreative } from '@/context/CreativeContext';
import { ArrowRight, Code2, Cpu, Database, Layers } from 'lucide-react';

const techBadges = [
    { icon: Code2, label: 'Full-Stack Architecture' },
    { icon: Layers, label: 'Cloud & Kubernetes' },
    { icon: Database, label: 'Distributed Systems' },
    { icon: Cpu, label: 'AI & Data Pipelines' },
];

export function Hero() {
    const { config } = useCreative();

    return (
        <section className="relative min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] bg-[#050610] text-white flex flex-col justify-center overflow-hidden">
            <HeroGrid />

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
        </section>
    );
}
