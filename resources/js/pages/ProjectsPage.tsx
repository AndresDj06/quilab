import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { Seo } from '@/components/Seo';
import { ProjectCard } from '@/components/ProjectCard';
import { EmptyState } from '@/components/ui/skeleton';
import { Select } from '@/components/ui/select';
import type { Catalogs, ProjectCard as ProjectType } from '@/types';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [catalogs, setCatalogs] = useState<Catalogs | null>(null);
    const [filters, setFilters] = useState({ category: '', technology: '', status: '', year: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/public/catalogs').then((response) => setCatalogs(response.data));
    }, []);

    useEffect(() => {
        setLoading(true);
        api.get('/public/projects', { params: Object.fromEntries(Object.entries(filters).filter(([, value]) => value)) })
            .then((response) => setProjects(response.data.data))
            .finally(() => setLoading(false));
    }, [filters]);

    const active = useMemo(() => Object.values(filters).filter(Boolean).length, [filters]);

    return (
        <div className="bg-background px-5 py-16 lg:px-8 lg:py-24">
            <Seo title="Proyectos" description="Archivo de productos y sistemas desarrollados por QUILAB." />
            <div className="mx-auto max-w-6xl">
                <p className="section-index">Archivo</p>
                <h1 className="mt-4 font-display text-5xl leading-none lg:text-7xl">Proyectos</h1>
                <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Select value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}>
                        <option value="">Categoría</option>
                        {catalogs?.categories.map((item) => (
                            <option key={item.id} value={item.slug}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                    <Select value={filters.technology} onChange={(e) => setFilters((f) => ({ ...f, technology: e.target.value }))}>
                        <option value="">Tecnología</option>
                        {catalogs?.technologies.map((item) => (
                            <option key={item.id} value={item.slug}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                    <Select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                        <option value="">Estado</option>
                        {catalogs?.statuses.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </Select>
                    <Select value={filters.year} onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}>
                        <option value="">Año</option>
                        {catalogs?.years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                </div>
                {active ? (
                    <button type="button" className="mt-4 cursor-pointer text-xs uppercase tracking-[0.16em] text-muted-foreground" onClick={() => setFilters({ category: '', technology: '', status: '', year: '' })}>
                        Limpiar filtros
                    </button>
                ) : null}
                <div className="mt-8">
                    {!loading && projects.length === 0 ? (
                        <EmptyState title="Nada en este corte" body="Prueba otro filtro. El archivo público solo muestra proyectos publicados." />
                    ) : (
                        projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)
                    )}
                </div>
            </div>
        </div>
    );
}
