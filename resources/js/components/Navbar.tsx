import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import SpecularButton from '@/components/SpecularButton';
import { cn } from '@/lib/utils';

const links = [
    { to: '/', label: 'Inicio' },
    { to: '/proyectos', label: 'Proyectos & Casos' },
    { to: '/nosotros', label: 'Consorcio' },
    { to: '/equipo', label: 'Ingeniería' },
    { to: '/contacto', label: 'Contacto' },
];

export function Navbar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isHome = location.pathname === '/';
    const dark = isHome && !scrolled && !open;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-all duration-300',
                dark
                    ? 'bg-ink/75 border-b border-white/10 text-white backdrop-blur-md'
                    : 'border-b border-border bg-background/90 text-foreground backdrop-blur-md shadow-xs',
            )}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
                <BrandLogo inverted={dark} />
                
                <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                cn(
                                    'group relative py-1 text-sm font-medium tracking-wide transition-all duration-300',
                                    dark
                                        ? 'text-slate-300/85 hover:text-sky-200 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]'
                                        : 'text-slate-600 hover:text-slate-900 hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.45)]',
                                    isActive &&
                                        (dark
                                            ? 'text-white font-semibold drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]'
                                            : 'text-slate-950 font-semibold'),
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Soft ambient illumination on hover */}
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-x-[-6px] -inset-y-1 rounded-md bg-sky-400/0 opacity-0 blur-md transition-all duration-300 group-hover:bg-sky-400/15 group-hover:opacity-100"
                                    />
                                    <span className="relative z-10">{link.label}</span>
                                    {isActive && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <SpecularButton
                        to="/contacto"
                        variant={dark ? 'primary' : 'secondary'}
                        size="sm"
                        radius={10}
                        className="text-xs font-semibold tracking-wide"
                    >
                        <span>Iniciar Proyecto</span>
                        <ArrowUpRight size={14} />
                    </SpecularButton>
                </div>

                <button
                    type="button"
                    className={cn(
                        'grid h-9 w-9 cursor-pointer place-items-center rounded-lg border lg:hidden transition-colors',
                        dark ? 'border-white/20 text-white hover:bg-white/10' : 'border-border text-foreground hover:bg-slate-100'
                    )}
                    aria-expanded={open}
                    aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {open ? (
                <div className="border-t border-white/10 bg-ink px-5 py-6 text-white lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
                    <nav className="flex flex-col gap-3" aria-label="Móvil">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    cn(
                                        'py-2.5 text-base font-medium tracking-wide transition-all duration-300',
                                        isActive
                                            ? 'text-sky-300 font-semibold drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]'
                                            : 'text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                                    )
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <div className="pt-3 mt-2 border-t border-white/10">
                            <SpecularButton
                                to="/contacto"
                                variant="primary"
                                size="sm"
                                radius={10}
                                className="w-full text-xs font-semibold uppercase tracking-wider"
                            >
                                <span>Iniciar Proyecto</span>
                                <ArrowUpRight size={15} />
                            </SpecularButton>
                        </div>
                    </nav>
                </div>
            ) : null}
        </header>
    );
}
