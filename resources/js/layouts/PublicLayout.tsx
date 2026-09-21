import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { SiteFooter } from '@/components/SiteFooter';

export default function PublicLayout() {
    const { pathname } = useLocation();
    const home = pathname === '/';

    return (
        <div className={home ? 'bg-ink' : 'relative min-h-screen bg-background'}>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <SiteFooter />
        </div>
    );
}
