import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { cn } from '@/lib/utils';

const links = [
    { to: '/', label: 'Inicio' },
    { to: '/proyectos', label: 'Proyectos' },
    { to: '/nosotros', label: 'Nosotros' },
    { to: '/equipo', label: 'Equipo' },
    { to: '/contacto', label: 'Contacto' },
];

export function Navbar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isHome = location.pathname === '/';
    const dark = isHome && !scrolled && !open;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.68);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <header className="sticky top-0 z-50">
            <div
                className={cn(
                    'pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent',
                    dark ? 'from-ink/80' : 'from-background/90',
                )}
            />
            <div className="relative px-3 pt-3 lg:px-6">
            <div
                className={cn(
                    'mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between rounded-full px-5 transition-colors duration-300 lg:px-6',
                    dark ? 'glass-nav-dark text-white' : 'glass-nav text-foreground',
                )}
            >
                <BrandLogo inverted={dark} />
                <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                cn(
                                    'relative text-[13px] tracking-wide transition-colors',
                                    dark ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground',
                                    isActive && (dark ? 'text-white' : 'text-foreground'),
                                    isActive && 'after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-gold after:to-teal',
                                )
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                <Link
                    to="/contacto"
                    className={cn(
                        'hidden h-10 items-center rounded-full px-5 text-xs tracking-[0.14em] uppercase lg:inline-flex btn-gold',
                    )}
                >
                    Trabajemos juntos
                </Link>
                <button
                    type="button"
                    className="grid h-10 w-10 cursor-pointer place-items-center rounded-full lg:hidden"
                    aria-expanded={open}
                    aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>
            {open ? (
                <div className="glass-nav-dark mx-auto mt-2 max-w-6xl rounded-[1.75rem] px-5 py-8 text-white lg:hidden">
                    <nav className="flex flex-col gap-5" aria-label="Móvil">
                        {links.map((link) => (
                            <NavLink key={link.to} to={link.to} className="text-lg">
                                {link.label}
                            </NavLink>
                        ))}
                        <Link to="/contacto" className="mt-2 text-sm tracking-[0.16em] uppercase text-gold">
                            Trabajemos juntos
                        </Link>
                    </nav>
                </div>
            ) : null}
            </div>
        </header>
    );
}
