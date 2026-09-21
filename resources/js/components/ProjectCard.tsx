import { Link } from 'react-router-dom';
import type { ProjectCard as ProjectCardType } from '@/types';
import { formatIndex } from '@/lib/utils';

export function ProjectCard({ project, index }: { project: ProjectCardType; index: number }) {
    const reverse = index % 2 === 1;

    return (
        <article className="py-6 lg:py-8">
            <Link to={`/proyectos/${project.slug}`} className="group glass-card grid items-center gap-8 rounded-[2rem] p-5 lg:grid-cols-12 lg:p-7">
                <div className={reverse ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-6'}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] bg-ink">
                        {project.cover_url ? (
                            <img
                                src={project.cover_url}
                                alt=""
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                loading="lazy"
                            />
                        ) : (
                            <div className="ink-grid h-full w-full" />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-teal/10" />
                    </div>
                </div>
                <div className={reverse ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5 lg:col-start-8'}>
                    <p className="section-index">
                        {project.reference || `PROJECT / ${formatIndex(index + 1, 3)}`}
                    </p>
                    <h3 className="mt-4 font-display text-4xl leading-none lg:text-5xl">{project.name}</h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                    <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <dt className="section-index">Categoría</dt>
                            <dd className="mt-1">{project.category?.name ?? '—'}</dd>
                        </div>
                        <div>
                            <dt className="section-index">Estado</dt>
                            <dd className="mt-1">{project.status_label}</dd>
                        </div>
                        <div>
                            <dt className="section-index">Año</dt>
                            <dd className="mt-1">{project.year}</dd>
                        </div>
                        <div>
                            <dt className="section-index">Equipo</dt>
                            <dd className="mt-1">{project.members_count ?? 0} miembros</dd>
                        </div>
                    </dl>
                    {project.technologies?.length ? (
                        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                            {project.technologies.map((tech) => tech.name).join(' · ')}
                        </p>
                    ) : null}
                </div>
            </Link>
        </article>
    );
}
