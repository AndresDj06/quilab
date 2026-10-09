import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Seo } from '@/components/Seo';
import { Hero } from '@/features/landing/Hero';
import { ProjectsPreview } from '@/features/landing/ProjectsPreview';
import { About } from '@/features/landing/About';
import { Services } from '@/features/landing/Services';
import { Team } from '@/features/landing/Team';
import { Contact } from '@/features/landing/Contact';
import { ScrollReveal } from '@/components/ScrollReveal';
import type { LandingPayload } from '@/types';
import { Code2, Users, Layers, Award } from 'lucide-react';

export default function LandingPage() {
    const [data, setData] = useState<LandingPayload | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/public/landing')
            .then((response) => setData(response.data))
            .finally(() => setLoading(false));
    }, []);

    const statIcons = [Layers, Users, Award, Code2];

    return (
        <>
            <Seo description="QUILAB — Consorcio de desarrollo de software, arquitectura moderna y soluciones digitales de alto impacto." />
            <Hero />
            
            {/* Stats section starting dark at #050610 (seamless with Hero) and color grading down into white */}
            <div className="relative text-white overflow-hidden" style={{ background: '#050610' }}>
                {/* Ambient subtle glow at the top matching hero */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,rgba(56,189,248,0.09),transparent_70%)]" />

                <div className="relative mx-auto max-w-6xl px-5 pt-12 pb-10 lg:px-8">
                    <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {[
                            [data?.stats?.projects ?? '5', 'Proyectos Desarrollados', 'Plataformas & Apps'],
                            [data?.stats?.members ?? '8', 'Ingenieros & Especialistas', 'Consorcio Activo'],
                            [data?.stats?.finished ?? '2', 'Entregas en Producción', '100% Verificadas'],
                            [data?.stats?.years ?? '3', 'Años de Trayectoria', 'I+D & Software'],
                        ].map(([value, label, sub], index) => {
                            const Icon = statIcons[index] || Code2;
                            return (
                                <ScrollReveal key={String(label)} delay={index * 90}>
                                    <div className="group border-l-2 border-sky-500/35 pl-5 transition-all duration-300 hover:border-sky-400">
                                        <div className="flex items-center gap-2 text-sky-400 mb-1.5">
                                            <Icon size={15} />
                                            <span className="font-mono text-[11px] tracking-wider uppercase text-slate-400">{sub}</span>
                                        </div>
                                        <dd className="font-display text-3xl font-bold tracking-tight text-white lg:text-4xl drop-shadow-[0_0_12px_rgba(56,189,248,0.2)]">{value}</dd>
                                        <dt className="mt-1 text-xs font-medium text-slate-400">{label}</dt>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </dl>
                </div>

                {/* Seamless Chromatic Color Grading Transition from dark into pure white */}
                <div
                    className="h-28 sm:h-44 w-full pointer-events-none"
                    style={{
                        background: 'linear-gradient(180deg, #050610 0%, #071120 22%, #0e1e36 44%, #1e2e4a 62%, #425575 76%, #8fa3c4 88%, #dce4f0 95%, #ffffff 100%)'
                    }}
                />
            </div>

            {/* Mainpage sections on clean white / light background */}
            <ProjectsPreview projects={data?.projects ?? []} loading={loading} />
            <About />
            <Services />
            <Team members={data?.members ?? []} loading={loading} />
            <Contact />
        </>
    );
}
