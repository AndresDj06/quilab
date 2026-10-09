import { Link } from 'react-router-dom';
import { ProjectCard } from '@/components/ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollReveal } from '@/components/ScrollReveal';
import type { ProjectCard as ProjectType } from '@/types';
import { ArrowRight } from 'lucide-react';

export function ProjectsPreview({ projects, loading }: { projects: ProjectType[]; loading: boolean }) {
    return (
        <section id="proyectos" className="bg-white px-5 py-24 lg:px-8 border-b border-border">
            <div className="mx-auto max-w-6xl">
                <ScrollReveal>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            {/* "01 // CASOS & PROYECTOS" removed as requested */}
                            <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                                Infraestructura y productos en producción.
                            </h2>
                        </div>
                        <Link
                            to="/proyectos"
                            className="group inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase text-sky-600 hover:text-sky-700 transition-colors"
                        >
                            <span>Ver todos los proyectos</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </ScrollReveal>

                <div className="mt-12">
                    {loading ? (
                        <div className="space-y-12">
                            <Skeleton className="h-72 w-full rounded-xl" />
                            <Skeleton className="h-72 w-full rounded-xl" />
                        </div>
                    ) : (
                        <div>
                            {projects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} dark={false} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ProjectsPreview;
