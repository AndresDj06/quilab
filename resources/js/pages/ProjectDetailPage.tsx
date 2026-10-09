import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Seo } from '@/components/Seo';
import { MemberCard } from '@/components/MemberCard';
import { Skeleton } from '@/components/ui/skeleton';
import FlexCarousel from '@/components/FlexCarousel';
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
            <header className="bg-ink text-white">
                <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-24">
                    <div className="lg:col-span-7">
                        <p className="section-index text-white/50">{project.reference}</p>
                        <h1 className="mt-4 font-display text-5xl leading-none lg:text-7xl">{project.name}</h1>
                        <p className="mt-6 max-w-xl text-white/65">{project.title}</p>
                    </div>
                    <dl className="grid content-end gap-4 text-sm lg:col-span-4 lg:col-start-9">
                        <div>
                            <dt className="section-index text-white/40">Estado</dt>
                            <dd>{project.status_label}</dd>
                        </div>
                        <div>
                            <dt className="section-index text-white/40">Año</dt>
                            <dd>{project.year}</dd>
                        </div>
                        <div>
                            <dt className="section-index text-white/40">Ubicación</dt>
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
                <section className="bg-[#050610] text-white px-5 py-20 lg:px-8 border-y border-white/10">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                            <div>
                                <p className="section-index text-sky-400">Capturas & Galería del Proyecto</p>
                                <h2 className="mt-2 font-display text-3xl font-bold text-white">Vistas y arquitectura de la plataforma</h2>
                            </div>
                            <span className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md self-start sm:self-auto">
                                {project.images.length} {project.images.length === 1 ? 'captura' : 'capturas'}
                            </span>
                        </div>

                        {project.images.length >= 2 ? (
                            <div className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-2 sm:p-4 backdrop-blur-xl shadow-2xl mb-12">
                                <div style={{ width: '100%', height: '520px', position: 'relative' }}>
                                    <FlexCarousel
                                        items={project.images.map((img) => ({
                                            src: img.url,
                                            alt: img.alt || project.name,
                                            title: img.caption || project.name,
                                            subtitle: project.title || 'QUILAB Module',
                                        }))}
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
                        ) : null}

                        <div className="grid gap-6 md:grid-cols-2">
                            {project.images.map((image) => (
                                <figure key={image.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                    <img src={image.url} alt={image.alt || ''} className="w-full object-cover aspect-video" loading="lazy" />
                                    {image.caption ? (
                                        <figcaption className="p-3 text-xs font-mono text-slate-300 border-t border-white/5 bg-black/40">
                                            {image.caption}
                                        </figcaption>
                                    ) : null}
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
                            <div key={result.label} className="border-t border-border pt-5">
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
