import { Seo } from '@/components/Seo';
import { About } from '@/features/landing/About';
import { Services } from '@/features/landing/Services';

export default function AboutPage() {
    return (
        <div className="bg-background pt-10">
            <Seo title="Nosotros" description="QUILAB es un consorcio de profesionales que desarrolla software con método y criterio." />
            <div className="mx-auto max-w-6xl px-5 pb-6 lg:px-8">
                <p className="section-index">Estudio</p>
                <h1 className="mt-4 max-w-3xl font-display text-5xl leading-none lg:text-7xl">Organizados para construir, no para parecer ocupados.</h1>
            </div>
            <About />
            <Services />
        </div>
    );
}
