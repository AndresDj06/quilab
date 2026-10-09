import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import type { Project, ProjectCard as ProjectCardType } from '@/types';
import { 
    X, 
    ExternalLink, 
    ArrowRight, 
    Calendar, 
    Layers, 
    Users, 
    CheckCircle2, 
    TrendingUp, 
    Cpu, 
    Maximize2 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalCardProps {
    project: ProjectCardType;
    isOpen: boolean;
    onClose: () => void;
}

export function ModalCard({ project, isOpen, onClose }: ModalCardProps) {
    const [fullProject, setFullProject] = useState<Project | null>(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    // Load rich project details when modal opens
    useEffect(() => {
        if (!isOpen) return;

        setLoadingDetails(true);
        api.get(`/public/projects/${project.slug}`)
            .then((res) => {
                setFullProject(res.data.project);
            })
            .catch(() => {
                // Keep displaying baseline project card info if request fails
            })
            .finally(() => {
                setLoadingDetails(false);
            });
    }, [isOpen, project.slug]);

    // Keyboard ESC listener and scroll lock
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    const data = fullProject || (project as Partial<Project>);

    return (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-300"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop with blur */}
            <div 
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Card Container */}
            <div 
                className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-border flex flex-col animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header preview bar with cover image */}
                <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden bg-slate-950 shrink-0">
                    {data.cover_url ? (
                        <img 
                            src={data.cover_url} 
                            alt={data.name} 
                            className="h-full w-full object-cover" 
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-ink text-white">
                            <Layers className="opacity-40 text-sky-400" size={48} />
                        </div>
                    )}
                    
                    {/* Ambient overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Top action controls */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white hover:text-slate-950 hover:scale-105"
                            aria-label="Cerrar modal"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Floating category & reference badge */}
                    <div className="absolute bottom-4 left-5 sm:left-8 right-5 flex flex-wrap items-end justify-between gap-3 text-white">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="rounded-md bg-sky-500/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-sky-300 border border-sky-400/30 backdrop-blur-md">
                                    {data.category?.name ?? 'Software Engineering'}
                                </span>
                                <span className="font-mono text-xs text-slate-300">
                                    {data.reference || `CASE #${data.id}`}
                                </span>
                            </div>
                            <h2 className="mt-1.5 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white drop-shadow-md">
                                {data.name}
                            </h2>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                            <Calendar size={13} className="text-sky-400" />
                            <span>{data.year}</span>
                        </div>
                    </div>
                </div>

                {/* Modal Card Content Body */}
                <div className="p-6 sm:p-8 space-y-8 flex-1">
                    {/* Subtitle & summary */}
                    <div>
                        <h3 className="font-display text-lg font-bold text-primary">
                            {data.title}
                        </h3>
                        <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {data.summary}
                        </p>
                    </div>

                    {/* Problem & Solution (if available) */}
                    {(data.problem || data.solution) ? (
                        <div className="grid gap-6 sm:grid-cols-2 rounded-xl bg-slate-50 p-5 sm:p-6 border border-border/80">
                            {data.problem ? (
                                <div>
                                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                                        Desafío & Restricciones
                                    </h4>
                                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                                        {data.problem}
                                    </p>
                                </div>
                            ) : null}

                            {data.solution ? (
                                <div>
                                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-sky-600 flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-sky-500" />
                                        Arquitectura Implementada
                                    </h4>
                                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                                        {data.solution}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    ) : null}

                    {/* Features list */}
                    {data.features && data.features.length > 0 ? (
                        <div>
                            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary mb-3">
                                Capacidades & Entregables de Ingeniería
                            </h4>
                            <div className="grid gap-2.5 sm:grid-cols-2">
                                {data.features.map((feat, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                                        <CheckCircle2 size={16} className="text-sky-500 shrink-0 mt-0.5" />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {/* Metrics & Results KPIs */}
                    {data.results && data.results.length > 0 ? (
                        <div className="border-t border-border pt-6">
                            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                                <TrendingUp size={14} className="text-emerald-500" />
                                Impacto Medible en Producción
                            </h4>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {data.results.map((metric, idx) => (
                                    <div key={idx} className="rounded-xl border border-border bg-slate-50/50 p-4">
                                        <dd className="font-display text-2xl font-bold text-primary">{metric.value}</dd>
                                        <dt className="mt-1 text-xs text-muted-foreground">{metric.label}</dt>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {/* Tech Stack badges */}
                    {data.technologies && data.technologies.length > 0 ? (
                        <div className="border-t border-border pt-6">
                            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                                <Cpu size={14} className="text-sky-500" />
                                Stack & Tecnologías Principales
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {data.technologies.map((tech) => (
                                    <span 
                                        key={tech.name} 
                                        className="rounded-lg border border-border bg-slate-100 px-3 py-1 font-mono text-xs text-slate-800"
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {/* Engineering Squad Members */}
                    {data.members && data.members.length > 0 ? (
                        <div className="border-t border-border pt-6">
                            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                                <Users size={14} className="text-sky-500" />
                                Integrantes del Consorcio que Desarrollaron este Proyecto
                            </h4>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {data.members.map((member) => (
                                    <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-slate-50/70">
                                        <div className="h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-slate-900 text-sky-400 font-bold flex items-center justify-center text-xs">
                                            {member.photo_url ? (
                                                <img src={member.photo_url} alt={member.public_name} className="h-full w-full object-cover" />
                                            ) : (
                                                member.initials
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-primary truncate">{member.public_name}</p>
                                            <p className="text-[11px] font-mono text-sky-600 truncate">{member.pivot?.role || member.role_title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Footer action bar */}
                <div className="border-t border-border bg-slate-50 px-6 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0 rounded-b-2xl">
                    <div className="flex items-center gap-2">
                        {data.external_url ? (
                            <a
                                href={data.external_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-700 hover:text-sky-600 transition-colors"
                            >
                                <ExternalLink size={14} />
                                <span>Ver Despliegue en Vivo</span>
                            </a>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-mono uppercase font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                        >
                            Cerrar Ficha
                        </button>
                        <Link
                            to={`/proyectos/${data.slug}`}
                            className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all hover:bg-slate-800"
                        >
                            <span>Ver Caso de Estudio Completo</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCard;
