import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import PublicLayout from '@/layouts/PublicLayout';
import { appRoot } from '@/lib/api';
import '../css/app.css';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const TeamPage = lazy(() => import('@/pages/TeamPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));
const AdminProjectsPage = lazy(() => import('@/pages/admin/AdminProjectsPage'));
const ProjectFormPage = lazy(() => import('@/pages/admin/ProjectFormPage'));
const AdminMembersPage = lazy(() => import('@/pages/admin/AdminMembersPage'));
const MemberFormPage = lazy(() => import('@/pages/admin/MemberFormPage'));
const AdminUsersPage = lazy(() => import('@/pages/admin/AdminUsersPage'));
const AdminMessagesPage = lazy(() => import('@/pages/admin/AdminMessagesPage'));

function Fallback() {
    return <div className="grid min-h-[50vh] place-items-center text-sm text-muted-foreground">Cargando…</div>;
}

createRoot(document.getElementById('app')!).render(
    <AuthProvider>
        <ToastProvider>
            <BrowserRouter basename={appRoot === '' ? undefined : appRoot}>
                <Suspense fallback={<Fallback />}>
                    <Routes>
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/proyectos" element={<ProjectsPage />} />
                            <Route path="/proyectos/:slug" element={<ProjectDetailPage />} />
                            <Route path="/nosotros" element={<AboutPage />} />
                            <Route path="/equipo" element={<TeamPage />} />
                            <Route path="/contacto" element={<ContactPage />} />
                        </Route>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<DashboardPage />} />
                            <Route path="proyectos" element={<AdminProjectsPage />} />
                            <Route path="proyectos/nuevo" element={<ProjectFormPage />} />
                            <Route path="proyectos/:id/editar" element={<ProjectFormPage />} />
                            <Route path="miembros" element={<AdminMembersPage />} />
                            <Route path="miembros/nuevo" element={<MemberFormPage />} />
                            <Route path="miembros/:id/editar" element={<MemberFormPage />} />
                            <Route path="usuarios" element={<AdminUsersPage />} />
                            <Route path="mensajes" element={<AdminMessagesPage />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </ToastProvider>
    </AuthProvider>,
);
