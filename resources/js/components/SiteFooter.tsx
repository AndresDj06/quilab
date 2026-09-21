import { Link } from 'react-router-dom';
import { BrandLogo } from '@/components/BrandLogo';

export function SiteFooter() {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_360px_at_10%_0%,rgba(232,197,106,0.12),transparent),radial-gradient(700px_400px_at_100%_100%,rgba(46,196,182,0.12),transparent)]" />
            <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-12 lg:px-8">
                <div className="lg:col-span-5">
                    <BrandLogo inverted />
                    <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
                        Consorcio de profesionales que construye software con criterio, método y una estética precisa.
                    </p>
                </div>
                <div className="lg:col-span-3">
                    <p className="section-index !text-white/50">Estudio</p>
                    <ul className="mt-4 space-y-2 text-sm text-white/80">
                        <li>
                            <Link to="/proyectos" className="hover:text-gold">
                                Proyectos
                            </Link>
                        </li>
                        <li>
                            <Link to="/nosotros" className="hover:text-gold">
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link to="/equipo" className="hover:text-gold">
                                Equipo
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="lg:col-span-4">
                    <p className="section-index !text-white/50">Contacto</p>
                    <p className="mt-4 text-sm text-white/80">hola@quilab.dev</p>
                    <Link to="/contacto" className="btn-gold mt-6 inline-flex h-10 items-center rounded-full px-5 text-xs tracking-[0.14em] uppercase">
                        Trabajemos juntos
                    </Link>
                </div>
            </div>
            <div className="relative border-t border-white/10">
                <div className="mx-auto flex max-w-6xl justify-between px-5 py-5 text-[11px] tracking-[0.16em] uppercase text-white/40 lg:px-8">
                    <span>© {new Date().getFullYear()} QUILAB</span>
                    <span>Software consortium</span>
                </div>
            </div>
        </footer>
    );
}
