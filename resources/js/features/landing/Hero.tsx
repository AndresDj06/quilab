import { Link } from 'react-router-dom';
import { AmbientField } from '@/components/AmbientField';
import { HeroGrid } from '@/components/HeroGrid';

export function Hero() {
    return (
        <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
            <HeroGrid />
            <AmbientField />
            <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 lg:px-8 lg:pb-24">
                <div className="glass-nav-dark mb-8 inline-flex w-fit items-center gap-3 rounded-full px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                    <p className="section-index !text-white/70">Consorcio de software · 001</p>
                </div>
                <h1 className="mt-2 max-w-4xl font-display text-[2.4rem] leading-[0.95] sm:text-5xl lg:text-[4.6rem]">
                    Construimos soluciones digitales que convierten ideas en{' '}
                    <span className="text-gradient-gold">productos</span>.
                </h1>
                <p className="mt-8 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                    Somos una red organizada de profesionales —ingeniería, diseño, datos y producto— que se reúne para desarrollar
                    software de alto nivel, con método y una estética precisa.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link
                        to="/proyectos"
                        className="btn-gold inline-flex h-12 items-center justify-center rounded-full px-7 text-xs tracking-[0.16em] uppercase transition-[filter,box-shadow] duration-200"
                    >
                        Ver proyectos
                    </Link>
                    <Link
                        to="/equipo"
                        className="btn-glass inline-flex h-12 items-center justify-center rounded-full px-7 text-xs tracking-[0.16em] uppercase text-white transition-colors duration-200"
                    >
                        Conocer el equipo
                    </Link>
                </div>
            </div>
        </section>
    );
}
