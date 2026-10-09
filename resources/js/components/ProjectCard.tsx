import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ProjectCard as ProjectCardType } from '@/types';
import { ArrowUpRight, Layers, Maximize2 } from 'lucide-react';
import { ModalCard } from '@/components/ModalCard';
import { cn } from '@/lib/utils';

export function ProjectCard({
    project,
    index,
    dark = false,
    onOpenModal,
}: {
    project: ProjectCardType;
    index: number;
    dark?: boolean;
    onOpenModal?: () => void;
}) {
    const reverse = index % 2 === 1;
    const [isVisible, setIsVisible] = useState(false);
    const [localModalOpen, setLocalModalOpen] = useState(false);
    const cardRef = useRef<HTMLElement | null>(null);

    const handleOpenModal = () => {
        if (onOpenModal) {
            onOpenModal();
        } else {
            setLocalModalOpen(true);
        }
    };

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            {
                threshold: 0.08,
                rootMargin: '0px 0px -30px 0px',
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <article
            ref={cardRef}
            className={cn(
                'py-12 lg:py-16 first:border-t-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[transform,opacity]',
                dark ? 'border-t border-white/10' : 'border-t border-border',
                isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-[0.985]'
            )}
            style={{
                transitionDelay: `${(index % 3) * 110}ms`,
            }}
        >
            <Link to={`/proyectos/${project.slug}`} className="group grid items-center gap-10 lg:grid-cols-12">
                {/* Project Image Box */}
                <div className={reverse ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}>
                    <div
                        className={cn(
                            'relative aspect-[16/10] overflow-hidden rounded-2xl border shadow-sm transition-all duration-500 group-hover:shadow-[0_16px_40px_-10px_rgba(56,189,248,0.22)]',
                            dark
                                ? 'border-white/10 bg-slate-950/80 group-hover:border-sky-400/50'
                                : 'border-border bg-slate-900 group-hover:border-sky-500/40'
                        )}
                    >
                        {project.cover_url ? (
                            <img
                                src={project.cover_url}
                                alt={project.name}
                                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-ink p-8 text-white">
                                <div className="text-center font-mono text-xs text-sky-400">
                                    <Layers className="mx-auto mb-2 opacity-50" size={32} />
                                    <span>[quilab.co / build_artifact]</span>
                                </div>
                            </div>
                        )}
                        <div className="absolute top-3.5 left-3.5">
                            <span className="rounded-md bg-ink/80 px-2.5 py-1 text-[11px] font-mono text-sky-300 backdrop-blur-md border border-white/10">
                                {project.category?.name ?? 'Software'}
                            </span>
                        </div>

                        {/* Quick Modal Expand Button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleOpenModal();
                            }}
                            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-white/20 bg-slate-950/80 px-2.5 py-1.5 font-mono text-[11px] text-white backdrop-blur-md transition-all hover:bg-sky-500 hover:border-sky-400 hover:text-white shadow-md opacity-90 hover:opacity-100"
                            title="Expandir tarjeta en modal (Modal Cards)"
                        >
                            <Maximize2 size={12} />
                            <span>Modal Card</span>
                        </button>
                    </div>
                </div>

                {/* Project Details */}
                <div className={reverse ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'}>
                    <div className="flex items-center justify-between">
                        <span className={cn('font-mono text-xs font-semibold', dark ? 'text-sky-400' : 'text-sky-600')}>
                            {project.reference || `CASE 00${index + 1}`}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleOpenModal();
                                }}
                                className={cn(
                                    'flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-mono font-medium transition-all duration-300',
                                    dark
                                        ? 'border-white/15 bg-white/5 text-slate-300 hover:border-sky-400 hover:bg-sky-400/10 hover:text-sky-300'
                                        : 'border-border text-slate-600 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700'
                                )}
                                title="Expandir ficha completa en Modal Card"
                            >
                                <Maximize2 size={13} />
                                <span className="hidden sm:inline">Expandir</span>
                            </button>
                            <div
                                className={cn(
                                    'flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110 group-hover:border-sky-400 group-hover:bg-sky-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]',
                                    dark
                                        ? 'border-white/15 bg-white/5 text-slate-300 group-hover:text-slate-950'
                                        : 'border-border text-slate-400 group-hover:text-white'
                                )}
                                title="Ver página completa del proyecto"
                            >
                                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                        </div>
                    </div>

                    <h3
                        className={cn(
                            'mt-3 font-display text-2xl font-bold tracking-tight transition-colors duration-300 lg:text-3xl',
                            dark
                                ? 'text-white group-hover:text-sky-300'
                                : 'text-primary group-hover:text-sky-600'
                        )}
                    >
                        {project.name}
                    </h3>

                    <p className={cn('mt-3 text-sm leading-relaxed line-clamp-3', dark ? 'text-slate-300/85' : 'text-muted-foreground')}>
                        {project.summary}
                    </p>

                    <dl
                        className={cn(
                            'mt-6 grid grid-cols-2 gap-4 rounded-xl p-4 border text-xs',
                            dark
                                ? 'bg-slate-950/60 border-white/10 backdrop-blur-sm'
                                : 'bg-background border-border/80'
                        )}
                    >
                        <div>
                            <dt className={cn('font-mono text-[10px] uppercase', dark ? 'text-slate-400' : 'text-muted-foreground')}>Estado</dt>
                            <dd className={cn('mt-1 flex items-center gap-1.5 font-semibold', dark ? 'text-white' : 'text-primary')}>
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                                {project.status_label}
                            </dd>
                        </div>
                        <div>
                            <dt className={cn('font-mono text-[10px] uppercase', dark ? 'text-slate-400' : 'text-muted-foreground')}>Año / Despliegue</dt>
                            <dd className={cn('mt-1 font-semibold', dark ? 'text-white' : 'text-primary')}>{project.year}</dd>
                        </div>
                    </dl>

                    {project.technologies?.length ? (
                        <div className="mt-5 flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 5).map((tech) => (
                                <span
                                    key={tech.name}
                                    className={cn(
                                        'rounded-md px-2.5 py-0.5 font-mono text-[11px] transition-colors',
                                        dark
                                            ? 'bg-white/5 border border-white/10 text-slate-300 group-hover:border-white/20 group-hover:text-white'
                                            : 'bg-slate-100 text-slate-700'
                                    )}
                                >
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>
            </Link>

            {/* Modal Card Expansion */}
            <ModalCard
                project={project}
                isOpen={localModalOpen}
                onClose={() => setLocalModalOpen(false)}
            />
        </article>
    );
}

export default ProjectCard;
