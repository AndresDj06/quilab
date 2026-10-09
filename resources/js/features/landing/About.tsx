import { ShieldCheck, GitBranch, Cpu, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const pillars = [
    {
        icon: ShieldCheck,
        index: '01',
        title: 'Consorcio de Ingeniería',
        body: 'QUILAB no es una agencia genérica. Es un consorcio de profesionales senior organizados por squads especializados, alineados a la arquitectura, calidad y objetivos de negocio de cada proyecto.',
    },
    {
        icon: Cpu,
        index: '02',
        title: 'Desarrollo de Alto Nivel',
        body: 'Diseñamos y desarrollamos ecosistemas digitales: plataformas web escalables, arquitecturas cloud, microservicios, aplicaciones móviles, APIs robustas y soluciones de datos e IA.',
    },
    {
        icon: GitBranch,
        index: '03',
        title: 'Metodología & Rigor',
        body: 'Cada sprint cuenta con estándares de código estrictos, pruebas automatizadas, CI/CD continuo y documentación técnica transparente para garantizar la continuidad operativa.',
    },
];

const methodologySteps = [
    { num: '01', title: 'Descubrimiento & Arquitectura', desc: 'Análisis profundo de requerimientos, modelado de dominio y diseño del stack tecnológico óptimo.' },
    { num: '02', title: 'Diseño de Producto & UX/UI', desc: 'Sistemas de diseño modulares, flujos intuitivos y prototipado enfocado en alta conversión.' },
    { num: '03', title: 'Desarrollo Ágil & QA', desc: 'Sprints por incrementos verificables con pipelines de testing automatizado y code reviews continuos.' },
    { num: '04', title: 'Despliegue Cloud & Soporte', desc: 'Infraestructura resiliente, monitoreo de rendimiento 24/7 y evolución del producto en producción.' },
];

export function About() {
    return (
        <section id="nosotros" className="border-b border-border bg-white px-5 py-24 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <ScrollReveal>
                    <div className="flex flex-col gap-2">
                        <p className="tech-tag self-start">02 // EL CONSORCIO</p>
                        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                            Un consorcio estructurado para resolver desafíos de software complejos.
                        </h2>
                        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
                            Combinamos talento multidisciplinario de élite para acelerar la entrega de productos digitales seguros, rápidos y escalables.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Pillars Cards */}
                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {pillars.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <ScrollReveal key={item.index} delay={idx * 120}>
                                <article
                                    className="group relative h-full rounded-xl border border-border bg-background p-8 transition-all duration-300 hover:border-sky-500/40 hover:shadow-[0_4px_20px_-4px_rgba(2,132,199,0.1)]"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                                            <Icon size={20} />
                                        </div>
                                        <span className="font-mono text-xs font-semibold text-slate-400">{item.index}</span>
                                    </div>
                                    <h3 className="mt-6 font-display text-xl font-bold text-primary">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                                </article>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* Methodology Blueprint */}
                <div className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-slate-900 to-ink p-8 text-white lg:p-12 shadow-md">
                    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-5">
                            <span className="tech-tag-dark">FRAMEWORK DE TRABAJO</span>
                            <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                                Ciclo de vida de ingeniería garantizado.
                            </h3>
                            <p className="mt-4 text-sm leading-relaxed text-slate-300">
                                Sin fricciones ni incertidumbre. Nuestro proceso asegura visibilidad total sobre cada avance, decisión arquitectónica y despliegue.
                            </p>
                            <div className="mt-6 flex items-center gap-3 text-xs font-mono text-sky-300">
                                <CheckCircle2 size={16} className="text-sky-400" />
                                <span>Entregas continuas cada 2 semanas</span>
                            </div>
                        </div>

                        <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
                            {methodologySteps.map((step) => (
                                <div key={step.num} className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-sky-400/30">
                                    <span className="font-mono text-xs font-bold text-sky-400">{step.num}</span>
                                    <h4 className="mt-2 text-sm font-semibold text-white">{step.title}</h4>
                                    <p className="mt-2 text-xs leading-relaxed text-slate-300">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
