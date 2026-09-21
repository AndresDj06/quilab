import { NavLink } from 'react-router-dom';
import { BrandLogo } from '@/components/BrandLogo';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export function Sidebar() {
    const { user } = useAuth();
    const links = [
        { to: '/admin', label: 'Dashboard', end: true },
        { to: '/admin/proyectos', label: 'Proyectos' },
        { to: '/admin/miembros', label: 'Miembros' },
        { to: '/admin/mensajes', label: 'Mensajes' },
        ...(user?.role === 'editor' ? [] : [{ to: '/admin/usuarios', label: 'Usuarios', end: false }]),
    ];
    return (
        <aside className="hidden w-60 shrink-0 border-r border-border bg-white md:flex md:flex-col">
            <div className="border-b border-border px-5 py-5">
                <BrandLogo />
                <p className="mt-3 section-index">Administración</p>
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Admin">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.end}
                        className={({ isActive }) =>
                            cn('px-3 py-2 text-sm', isActive ? 'bg-ink text-white' : 'text-muted-foreground hover:text-foreground')
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
