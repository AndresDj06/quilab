import { Link } from 'react-router-dom';
import { ProjectCard } from '@/components/ProjectCard';
import { DarkVeil } from '@/components/DarkVeil';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useCreative } from '@/context/CreativeContext';
import type { ProjectCard as ProjectType } from '@/types';
import { ArrowRight } from 'lucide-react';

export function ProjectsPreview({ projects, loading }: { projects: ProjectType[]; loading: boolean }) {
    const { config } = useCreative();

    return (
        <section id="proyectos" className="relative overflow-hidden bg-[#050610] text-white px-5 py-24 lg:px-8 border-b border-white/10">
            {/* DarkVeil Background Canvas */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
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
                {/* Atmospheric gradient overlay for readability and depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050610]/75 via-[#050610]/35 to-[#050610]/85" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,6,16,0.65)_100%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                <ScrollReveal>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-semibold">
                                    PRODUCCIÓN // INFRAESTRUCTURA
                                </span>
                            </div>
                            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-md">
                                Infraestructura y productos en producción.
                            </h2>
                        </div>
                        <Link
                            to="/proyectos"
                            className="group inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase text-cyan-300 hover:text-cyan-200 transition-colors"
                        >
                            <span>Ver todos los proyectos</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </ScrollReveal>

                <div className="mt-12">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                            <Skeleton className="h-96 w-full rounded-2xl bg-white/5" />
                            <Skeleton className="h-96 w-full rounded-2xl bg-white/5" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    layout="grid"
                                    dark={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ProjectsPreview;
