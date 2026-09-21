import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/context/ToastContext';
import { errorMessage } from '@/lib/utils';
import type { Paginated, ProjectCard } from '@/types';

export default function AdminProjectsPage() {
    const toast = useToast();
    const [page, setPage] = useState<Paginated<ProjectCard> | null>(null);
    const [q, setQ] = useState('');
    const [removeId, setRemoveId] = useState<number | null>(null);

    function load(current = 1) {
        api.get('/admin/projects', { params: { q, page: current } }).then((response) => setPage(response.data));
    }

    useEffect(() => {
        load();
    }, [q]);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="section-index">Gestión</p>
                    <h1 className="mt-2 font-display text-4xl">Proyectos</h1>
                </div>
                <Link to="/admin/proyectos/nuevo" className="inline-flex h-11 items-center bg-ink px-5 text-xs uppercase tracking-[0.16em] text-white">
                    Crear proyecto
                </Link>
            </div>
            <Input placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
            <DataTable headers={['Nombre', 'Estado', 'Publicado', 'Año', 'Acciones']} empty={!page?.data.length}>
                {page?.data.map((project) => (
                    <tr key={project.id} className="border-t border-border">
                        <td className="px-4 py-3">{project.name}</td>
                        <td className="px-4 py-3">{project.status_label}</td>
                        <td className="px-4 py-3">{project.is_published ? 'Sí' : 'No'}</td>
                        <td className="px-4 py-3">{project.year}</td>
                        <td className="space-x-3 px-4 py-3 text-xs uppercase tracking-[0.12em]">
                            <Link to={`/admin/proyectos/${project.id}/editar`}>Editar</Link>
                            <button type="button" className="cursor-pointer text-destructive" onClick={() => setRemoveId(project.id)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </DataTable>
            {page && page.meta.last_page > 1 ? (
                <div className="flex gap-2">
                    {Array.from({ length: page.meta.last_page }, (_, i) => (
                        <Button key={i} size="sm" variant={page.meta.current_page === i + 1 ? 'default' : 'outline'} onClick={() => load(i + 1)}>
                            {i + 1}
                        </Button>
                    ))}
                </div>
            ) : null}
            <Modal
                open={removeId !== null}
                title="Eliminar proyecto"
                destructive
                confirmLabel="Eliminar"
                onClose={() => setRemoveId(null)}
                onConfirm={async () => {
                    if (!removeId) return;
                    try {
                        await api.delete(`/admin/projects/${removeId}`);
                        toast.push('Proyecto eliminado');
                        setRemoveId(null);
                        load(page?.meta.current_page);
                    } catch (error) {
                        toast.push(errorMessage(error), 'error');
                    }
                }}
            >
                Esta acción no se puede deshacer. El proyecto y su galería se eliminarán.
            </Modal>
        </div>
    );
}
