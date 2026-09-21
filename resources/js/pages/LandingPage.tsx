import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Seo } from '@/components/Seo';
import { Hero } from '@/features/landing/Hero';
import { ProjectsPreview } from '@/features/landing/ProjectsPreview';
import { About } from '@/features/landing/About';
import { Services } from '@/features/landing/Services';
import { Team } from '@/features/landing/Team';
import { Contact } from '@/features/landing/Contact';
import type { LandingPayload } from '@/types';

export default function LandingPage() {
    const [data, setData] = useState<LandingPayload | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/public/landing')
            .then((response) => setData(response.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Seo description="Consorcio de profesionales que construye productos digitales de alto nivel." />
            <Hero />
            {data?.stats ? (
                <div className="relative overflow-hidden border-y border-white/10 bg-ink">
                    <dl className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-10 text-white lg:grid-cols-4 lg:gap-6 lg:px-8">
                        {[
                            [data.stats.projects, 'Proyectos publicados'],
                            [data.stats.members, 'Profesionales'],
                            [data.stats.finished, 'Entregas'],
                            [data.stats.years, 'Años de archivo'],
                        ].map(([value, label]) => (
                            <div key={String(label)} className="glass-panel-dark rounded-2xl px-5 py-5">
                                <dt className="section-index !text-teal/80">{label}</dt>
                                <dd className="mt-2 font-display text-4xl text-gradient-gold">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            ) : null}
            <ProjectsPreview projects={data?.projects ?? []} loading={loading} />
            <About />
            <Services />
            <Team members={data?.members ?? []} loading={loading} />
            <Contact />
        </>
    );
}
