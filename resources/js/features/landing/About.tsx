const pillars = [
    {
        index: '01',
        title: 'Quiénes somos',
        body: 'QUILAB no es una agencia de turnos. Es un consorcio: profesionales que se organizan alrededor de un problema, una arquitectura y una entrega.',
    },
    {
        index: '02',
        title: 'Qué hacemos',
        body: 'Diseñamos y construimos productos digitales —web, móvil, sistemas internos, APIs e inteligencia aplicada— con criterio técnico y responsabilidad de operación.',
    },
    {
        index: '03',
        title: 'Cómo trabajamos',
        body: 'Un núcleo estable, un responsable de producto y un equipo que entra y sale según la fase. Documentamos decisiones. Medimos lo que importa.',
    },
];

export function About() {
    return (
        <section id="nosotros" className="relative overflow-hidden border-y border-border/70 bg-background px-5 py-24 lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_80%_0%,rgba(46,196,182,0.1),transparent)]" />
            <div className="relative mx-auto max-w-6xl">
                <p className="section-index">03 / Nosotros</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-none lg:text-6xl">
                    Una red de profesionales, no una fábrica de tickets.
                </h2>
                <div className="mt-16 grid gap-6 lg:grid-cols-3">
                    {pillars.map((item) => (
                        <article key={item.index} className="glass-card rounded-3xl p-7">
                            <p className="font-mono text-xs text-accent">{item.index}</p>
                            <h3 className="mt-4 font-display text-3xl">{item.title}</h3>
                            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                        </article>
                    ))}
                </div>
                <div className="glass-panel mt-20 grid gap-8 rounded-[2rem] p-8 lg:grid-cols-2 lg:p-12">
                    <div>
                        <p className="section-index">Enfoque</p>
                        <p className="mt-4 max-w-md font-display text-3xl leading-tight">
                            Arquitectura clara, interfaces precisas, operación que sobrevive al lanzamiento.
                        </p>
                    </div>
                    <div>
                        <p className="section-index">Metodología</p>
                        <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                            <li>01 — Entender el dominio y las restricciones reales.</li>
                            <li>02 — Diseñar el modelo, no solo la pantalla.</li>
                            <li>03 — Construir por incrementos verificables.</li>
                            <li>04 — Dejar el sistema listo para evolucionar.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
