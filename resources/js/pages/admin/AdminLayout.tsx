import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/admin/Sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Cargando sesión…</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen bg-stone-100">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex items-center justify-between border-b border-border bg-white px-5 py-4">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            Ver sitio
                        </Link>
                        <nav className="flex gap-3 text-xs uppercase tracking-[0.12em] md:hidden">
                            <Link to="/admin">Home</Link>
                            <Link to="/admin/proyectos">Proyectos</Link>
                            <Link to="/admin/miembros">Equipo</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="hidden sm:block text-muted-foreground">
                            {user.name} · {user.role_label}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={async () => {
                                await logout();
                                navigate('/login');
                            }}
                        >
                            Salir
                        </Button>
                    </div>
                </header>
                <div className="flex-1 p-5 lg:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
