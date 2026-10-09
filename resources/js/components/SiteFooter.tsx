import { Link } from 'react-router-dom';
import { BrandLogo } from '@/components/BrandLogo';
import { Mail, Terminal, ArrowUpRight } from 'lucide-react';

export function SiteFooter() {
    return (
        <footer className="border-t border-white/10 bg-ink text-white">
            <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-12 lg:px-8">
                <div className="lg:col-span-5">
                    <BrandLogo inverted />
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                        Consorcio de profesionales que diseña y construye software con rigor arquitectónico, método ágil y estándares de clase mundial.
                    </p>
                    <div className="mt-6 flex items-center gap-3 text-slate-400">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-sky-400/50 hover:text-white"
                            aria-label="GitHub"
                        >
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                            </svg>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-sky-400/50 hover:text-white"
                            aria-label="LinkedIn"
                        >
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 0 0-1.63 1.62 1.63 1.63 0 0 0 1.63 1.63 1.63 1.63 0 0 0 1.63-1.63 1.63 1.63 0 0 0-1.63-1.62Z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <p className="font-mono text-xs uppercase tracking-wider text-sky-400">Navegación</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                        <li>
                            <Link to="/proyectos" className="transition-colors hover:text-white">Proyectos & Casos</Link>
                        </li>
                        <li>
                            <Link to="/nosotros" className="transition-colors hover:text-white">Sobre el Consorcio</Link>
                        </li>
                        <li>
                            <Link to="/equipo" className="transition-colors hover:text-white">Ingeniería & Squads</Link>
                        </li>
                        <li>
                            <Link to="/contacto" className="transition-colors hover:text-white">Contacto & Cotización</Link>
                        </li>
                    </ul>
                </div>

                <div className="lg:col-span-4">
                    <p className="font-mono text-xs uppercase tracking-wider text-sky-400">Contacto Directo</p>
                    <p className="mt-4 text-sm text-slate-300">contacto@quilab.co</p>
                    <p className="mt-1 font-mono text-xs text-slate-400">Desarrollo distribuido · América Latina & Global</p>
                    
                    <div className="mt-6">
                        <Link
                            to="/contacto"
                            className="inline-flex items-center gap-2 rounded-lg bg-sky-500/10 border border-sky-500/30 px-4 py-2 font-mono text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20"
                        >
                            <Terminal size={14} />
                            <span>Abrir requerimiento</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row items-center justify-between px-5 py-6 text-xs font-mono text-slate-500 lg:px-8">
                    <span>© {new Date().getFullYear()} &lt;quilab.co&gt; · Todos los derechos reservados.</span>
                    <span className="text-sky-400/80">SOFTWARE DEVELOPMENT CONSORTIUM</span>
                </div>
            </div>
        </footer>
    );
}
