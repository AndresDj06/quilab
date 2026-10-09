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
            
            {/* Stats section on white background with original sizing and without gradient */}
            <div className="bg-white border-b border-border">
                <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
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
                                    <div className="group border-l-2 border-sky-500/40 pl-5 transition-all duration-300 hover:border-sky-500">
                                        <div className="flex items-center gap-2 text-sky-600 mb-1.5">
                                            <Icon size={15} />
                                            <span className="font-mono text-[11px] tracking-wider uppercase text-slate-500">{sub}</span>
                                        </div>
                                        <dd className="font-display text-3xl font-bold tracking-tight text-primary lg:text-4xl">{value}</dd>
                                        <dt className="mt-1 text-xs font-medium text-muted-foreground">{label}</dt>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </dl>
                </div>
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
