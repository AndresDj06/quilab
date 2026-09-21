import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { DashboardCard } from '@/components/admin/DashboardCard';
import { DataTable } from '@/components/admin/DataTable';
import type { DashboardPayload } from '@/types';

export default function DashboardPage() {
    const [data, setData] = useState<DashboardPayload | null>(null);

    useEffect(() => {
        api.get('/admin/dashboard').then((response) => setData(response.data));
    }, []);

    if (!data) {
        return <p className="text-sm text-muted-foreground">Cargando tablero…</p>;
    }

    const maxStatus = Math.max(1, ...data.charts.status.map((item) => item.total));
    const maxMessages = Math.max(1, ...data.charts.messages.map((item) => item.value));

    return (
        <div className="space-y-8">
            <div>
                <p className="section-index">Resumen</p>
                <h1 className="mt-2 font-display text-4xl">Dashboard</h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <DashboardCard label="Proyectos" value={data.kpis.projects} />
                <DashboardCard label="En desarrollo" value={data.kpis.active} />
                <DashboardCard label="Finalizados" value={data.kpis.finished} />
                <DashboardCard label="Miembros" value={data.kpis.members} />
                <DashboardCard label="Mensajes" value={data.kpis.messages} hint={`${data.kpis.unread} sin leer`} />
                <DashboardCard label="No leídos" value={data.kpis.unread} />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <section className="border border-border bg-white p-5">
                    <p className="section-index">Proyectos por estado</p>
                    <ul className="mt-6 space-y-3">
                        {data.charts.status.map((item) => (
                            <li key={item.value}>
                                <div className="mb-1 flex justify-between text-xs">
                                    <span>{item.label}</span>
                                    <span>{item.total}</span>
                                </div>
                                <div className="h-1.5 bg-muted">
                                    <div className="h-full bg-ink" style={{ width: `${(item.total / maxStatus) * 100}%` }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="border border-border bg-white p-5">
                    <p className="section-index">Mensajes · 6 meses</p>
                    <div className="mt-6 flex h-40 items-end gap-3">
                        {data.charts.messages.map((item) => (
                            <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                                <div className="w-full bg-ink" style={{ height: `${Math.max(8, (item.value / maxMessages) * 100)}%` }} />
                                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <section>
                <p className="section-index mb-3">Proyectos recientes</p>
                <DataTable headers={['Proyecto', 'Estado', 'Año', '']} empty={data.recent_projects.length === 0}>
                    {data.recent_projects.map((project) => (
                        <tr key={project.id} className="border-t border-border">
                            <td className="px-4 py-3">{project.name}</td>
                            <td className="px-4 py-3">{project.status_label}</td>
                            <td className="px-4 py-3">{project.year}</td>
                            <td className="px-4 py-3 text-right">
                                <Link to={`/admin/proyectos/${project.id}/editar`} className="text-xs uppercase tracking-[0.14em]">
                                    Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </section>
        </div>
    );
}
