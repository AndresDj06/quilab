import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Seo } from '@/components/Seo';
import { MemberCard } from '@/components/MemberCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Project, ProjectCard } from '@/types';

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [related, setRelated] = useState<ProjectCard[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        setProject(null);
        api.get(`/public/projects/${slug}`)
            .then((response) => {
                setProject(response.data.project);
                setRelated(response.data.related);
            })
            .catch(() => setError(true));
    }, [slug]);

    if (error) {
        return (
            <div className="mx-auto max-w-3xl px-5 py-24">
                <h1 className="font-display text-5xl">Proyecto no encontrado</h1>
                <Link to="/proyectos" className="mt-6 inline-block text-sm uppercase tracking-[0.16em]">
                    Volver al archivo
                </Link>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="mx-auto max-w-6xl px-5 py-24">
                <Skeleton className="h-[60vh] w-full" />
            </div>
        );
    }

    return (
        <article className="bg-background">
            <Seo title={project.name} description={project.meta_description || project.summary} />
            <header className="relative overflow-hidden bg-ink text-white">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_80%_0%,rgba(46,196,182,0.16),transparent),radial-gradient(700px_400px_at_0%_80%,rgba(232,197,106,0.14),transparent)]" />
                <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-24">
                    <div className="lg:col-span-7">
                        <p className="section-index !text-teal/80">{project.reference}</p>
                        <h1 className="mt-4 font-display text-5xl leading-none lg:text-7xl">{project.name}</h1>
                        <p className="mt-6 max-w-xl text-white/70">{project.title}</p>
                    </div>
                    <dl className="glass-panel-dark grid content-end gap-4 rounded-3xl p-6 text-sm lg:col-span-4 lg:col-start-9">
                        <div>
                            <dt className="section-index !text-white/50">Estado</dt>
                            <dd>{project.status_label}</dd>
                        </div>
                        <div>
                            <dt className="section-index !text-white/50">Año</dt>
                            <dd>{project.year}</dd>
                        </div>
                        <div>
                            <dt className="section-index !text-white/50">Ubicación</dt>
                            <dd>{project.location || '—'}</dd>
                        </div>
                    </dl>
                </div>
                {project.cover_url ? (
                    <div className="mx-auto max-w-6xl px-5 lg:px-8">
                        <img src={project.cover_url} alt="" className="aspect-[16/8] w-full object-cover" />
                    </div>
                ) : null}
            </header>

            <div className="mx-auto max-w-3xl space-y-16 px-5 py-20 lg:px-0">
                <section>
                    <p className="section-index">Descripción</p>
                    <p className="mt-4 text-lg leading-relaxed">{project.description}</p>
                </section>
                <section className="grid gap-10 sm:grid-cols-2">
                    <div>
                        <p className="section-index">Problema</p>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
                    </div>
                    <div>
                        <p className="section-index">Solución</p>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
                    </div>
                </section>
                <section>
                    <p className="section-index">Tecnologías</p>
                    <p className="mt-4 font-mono text-sm uppercase tracking-[0.14em]">
                        {project.technologies?.map((tech) => tech.name).join(' · ')}
                    </p>
                </section>
                {project.features?.length ? (
                    <section>
                        <p className="section-index">Características</p>
                        <ol className="mt-6 divide-y divide-border border-y border-border">
                            {project.features.map((feature, index) => (
                                <li key={feature} className="flex gap-4 py-4 text-sm">
                                    <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                                    {feature}
                                </li>
                            ))}
                        </ol>
                    </section>
                ) : null}
            </div>

            {project.members?.length ? (
                <section className="border-t border-border px-5 py-20 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <p className="section-index">Equipo involucrado</p>
                        <div className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                            {project.members.map((member) => (
                                <div key={member.id}>
                                    <MemberCard member={member} />
                                    {member.pivot?.role ? (
                                        <p className="mt-3 text-sm text-muted-foreground">
                                            {member.pivot.role}
                                            {member.pivot.responsibility ? ` — ${member.pivot.responsibility}` : ''}
                                        </p>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {project.images?.length ? (
                <section className="bg-ink px-5 py-20 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <p className="section-index text-white/50">Galería</p>
                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            {project.images.map((image) => (
                                <figure key={image.id}>
                                    <img src={image.url} alt={image.alt || ''} className="w-full rounded-2xl object-cover" loading="lazy" />
                                    {image.caption ? <figcaption className="mt-2 text-xs text-white/50">{image.caption}</figcaption> : null}
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {project.results?.length ? (
                <section className="px-5 py-20 lg:px-8">
                    <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
                        {project.results.map((result) => (
                            <div key={result.label} className="glass-card rounded-3xl p-6">
                                <p className="section-index">{result.label}</p>
                                <p className="mt-3 font-display text-4xl">{result.value}</p>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}

            {related.length ? (
                <section className="border-t border-border px-5 py-20 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <p className="section-index">Proyecto relacionado</p>
                        {related.slice(0, 1).map((item, index) => (
                            <div key={item.id} className="mt-6">
                                <Link to={`/proyectos/${item.slug}`} className="font-display text-4xl hover:text-accent">
                                    {item.name}
                                </Link>
                                <p className="mt-3 max-w-xl text-sm text-muted-foreground">{item.summary}</p>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}
        </article>
    );
}
