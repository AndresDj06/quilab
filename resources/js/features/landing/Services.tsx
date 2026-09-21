const services = [
    ['01', 'Desarrollo web', 'Productos y plataformas con arquitectura sólida y una interfaz contenida.'],
    ['02', 'Desarrollo móvil', 'Aplicaciones de campo y de cliente, incluyendo operación offline.'],
    ['03', 'Sistemas empresariales', 'Software interno que ordena procesos, no que los duplica.'],
    ['04', 'APIs y backend', 'Contratos claros, dominio modelado e integraciones que no se rompen en silencio.'],
    ['05', 'Automatización', 'Flujos que quitan trabajo repetitivo sin esconder la decisión.'],
    ['06', 'Inteligencia artificial', 'Modelos aplicados a un problema concreto, con datos y límites visibles.'],
    ['07', 'Análisis de datos', 'Señales, tableros y evidencia para dirigir operación.'],
    ['08', 'UI/UX', 'Sistemas de interfaz, no decoración. Lectura, jerarquía y consistencia.'],
    ['09', 'Integraciones', 'Puentes entre sistemas heredados, nubes y operación diaria.'],
    ['10', 'Mantenimiento y evolución', 'El software no termina en el go-live. Lo sostenemos y lo hacemos crecer.'],
];

export function Services() {
    return (
        <section className="bg-background px-5 py-24 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <p className="section-index">04 / Capacidades</p>
                <h2 className="mt-4 max-w-xl font-display text-4xl leading-none lg:text-6xl">Lo que sabemos construir.</h2>
                <ul className="glass-panel mt-12 overflow-hidden rounded-[2rem]">
                    {services.map(([index, title, body]) => (
                        <li key={index} className="service-row group grid gap-2 px-6 py-6 lg:grid-cols-12 lg:items-baseline lg:px-8">
                            <span className="font-mono text-xs text-accent lg:col-span-1">{index}</span>
                            <h3 className="text-lg lg:col-span-4">{title}</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-7">{body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
