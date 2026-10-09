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
            <Seo description="QUILAB — Consorcio de desarrollo de software, arquitectura moderna y soluciones digitales de alto impacto." />
            <Hero stats={data?.stats} />

            {/* Mainpage sections on clean white / light background */}
            <ProjectsPreview projects={data?.projects ?? []} loading={loading} />
            <About />
            <Services />
            <Team members={data?.members ?? []} loading={loading} />
            <Contact />
        </>
    );
}
