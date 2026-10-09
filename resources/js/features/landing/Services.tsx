import { Globe, Smartphone, Server, Cpu, LineChart, Layout, Network, RefreshCw, Layers } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const capabilities = [
    {
        icon: Globe,
        index: '01',
        title: 'Desarrollo Web & SaaS',
        desc: 'Plataformas web de alto rendimiento, micro-frontends y portales empresariales con React, Next.js y ecosistemas modernos.',
    },
    {
        icon: Smartphone,
        index: '02',
        title: 'Aplicaciones Móviles',
        desc: 'Apps nativas y cross-platform (React Native / Flutter) optimizadas para experiencia de usuario, modo offline y sincronización.',
    },
    {
        icon: Server,
        index: '03',
        title: 'Arquitectura Cloud & Backend',
        desc: 'APIs REST / GraphQL, microservicios, bases de datos distribuidas y contenedores Docker / Kubernetes altamente resilientes.',
    },
    {
        icon: Cpu,
        index: '04',
        title: 'Inteligencia Artificial & Automatización',
        desc: 'Integración de LLMs, agentes inteligentes, procesamiento de lenguaje natural y automatización de flujos críticos de negocio.',
    },
    {
        icon: LineChart,
        index: '05',
        title: 'Ingeniería de Datos & BI',
        desc: 'Pipelines ETL/ELT, data warehouses, modelos analíticos y tableros en tiempo real para la toma estratégica de decisiones.',
    },
    {
        icon: Layout,
        index: '06',
        title: 'Diseño UX/UI & Design Systems',
        desc: 'Interfaces minimalistas y sistemas de diseño escalables centrados en la usabilidad, consistencia y conversión.',
    },
    {
        icon: Network,
        index: '07',
        title: 'Integraciones & APIs de Terceros',
        desc: 'Conectividad segura entre pasarelas de pago, ERPs, CRMs, servicios bancarios e infraestructuras legadas.',
    },
    {
        icon: RefreshCw,
        index: '08',
        title: 'Modernización & Evolución Continua',
        desc: 'Refactorización de código legado, migración a la nube, monitoreo y mantenimiento proactivo con SLAs definidos.',
    },
];

export function Services() {
    return (
        <section id="capacidades" className="bg-white px-5 py-24 lg:px-8 border-b border-border">
            <div className="mx-auto max-w-6xl">
                <ScrollReveal>
                    <div className="flex flex-col gap-2">
                        <p className="tech-tag self-start">03 // CAPACIDADES TÉCNICAS</p>
                        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                            Stack completo de desarrollo para el futuro digital.
                        </h2>
                        <p className="mt-3 max-w-xl text-base text-muted-foreground">
                            Respaldamos proyectos desde la primera línea de código hasta arquitecturas capaces de sostener millones de operaciones.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {capabilities.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <ScrollReveal key={item.index} delay={(idx % 4) * 80}>
                                <div
                                    className="group relative flex flex-col justify-between rounded-xl border border-border bg-slate-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] h-full"
                                >
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200/80 text-slate-700 transition-colors group-hover:bg-sky-500 group-hover:text-white group-hover:border-transparent shadow-xs">
                                                <Icon size={18} />
                                            </div>
                                            <span className="font-mono text-xs font-semibold text-slate-400">{item.index}</span>
                                        </div>
                                        <h3 className="mt-5 text-base font-bold text-primary font-display">{item.title}</h3>
                                        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
