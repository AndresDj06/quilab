import { MemberCard } from '@/components/MemberCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollReveal } from '@/components/ScrollReveal';
import type { Member } from '@/types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Team({ members, loading }: { members: Member[]; loading: boolean }) {
    const [lead, ...rest] = members;

    return (
        <section id="equipo" className="border-b border-border bg-slate-50/60 px-5 py-24 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <ScrollReveal>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="tech-tag">04 // TALENTO & INGENIERÍA</p>
                            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                                Escuadras lideradas por ingenieros senior.
                            </h2>
                        </div>
                        <Link
                            to="/equipo"
                            className="group inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase text-sky-600 hover:text-sky-700"
                        >
                            <span>Conoce a todos los miembros</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </ScrollReveal>

                <div className="mt-14 space-y-10">
                    {loading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Skeleton className="h-80 w-full rounded-xl" />
                            <Skeleton className="h-80 w-full rounded-xl" />
                            <Skeleton className="h-80 w-full rounded-xl" />
                        </div>
                    ) : (
                        <>
                            {lead ? (
                                <ScrollReveal>
                                    <MemberCard member={lead} featured />
                                </ScrollReveal>
                            ) : null}
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {rest.map((member, idx) => (
                                    <ScrollReveal key={member.id} delay={(idx % 3) * 100}>
                                        <MemberCard member={member} />
                                    </ScrollReveal>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
