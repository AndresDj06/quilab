import { Link } from 'react-router-dom';
import { ProjectCard } from '@/components/ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProjectCard as ProjectType } from '@/types';

export function ProjectsPreview({ projects, loading }: { projects: ProjectType[]; loading: boolean }) {
    return (
        <section id="proyectos" className="relative bg-background px-5 py-24 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-end justify-between gap-6">
                    <div>
                        <p className="section-index">02 / Proyectos</p>
                        <h2 className="mt-4 max-w-xl font-display text-4xl leading-none lg:text-6xl">Casos con estructura, no vitrinas.</h2>
                    </div>
                    <Link to="/proyectos" className="hidden rounded-full border border-border/80 px-4 py-2 text-xs tracking-[0.16em] uppercase text-muted-foreground hover:border-accent hover:text-accent sm:block">
                        Ver archivo
                    </Link>
                </div>
                <div className="mt-12">
                    {loading ? (
                        <div className="space-y-10">
                            <Skeleton className="h-64 w-full" />
                            <Skeleton className="h-64 w-full" />
                        </div>
                    ) : (
                        projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)
                    )}
                </div>
            </div>
        </section>
    );
}
