import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Field, Input, Textarea } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useToast } from '@/context/ToastContext';
import { errorMessage } from '@/lib/utils';
import type { Category, Member, Project, ProjectImage, Technology } from '@/types';

type Meta = {
    categories: Category[];
    technologies: Technology[];
    members: Member[];
    statuses: { value: string; label: string }[];
};

type TeamRow = { member_id: string; role: string; responsibility: string };

const emptyTeam = (): TeamRow => ({ member_id: '', role: '', responsibility: '' });

export default function ProjectFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [meta, setMeta] = useState<Meta | null>(null);
    const [project, setProject] = useState<Project | null>(null);
    const [images, setImages] = useState<ProjectImage[]>([]);
    const [techIds, setTechIds] = useState<number[]>([]);
    const [team, setTeam] = useState<TeamRow[]>([emptyTeam()]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/admin/meta').then((response) => setMeta(response.data));
    }, []);

    useEffect(() => {
        if (!id) return;
        api.get(`/admin/projects/${id}`).then((response) => {
            const item: Project = response.data.project;
            setProject(item);
            setImages(item.images ?? []);
            setTechIds(item.technologies?.map((tech) => tech.id) ?? []);
            setTeam(
                item.members?.length
                    ? item.members.map((member) => ({
                          member_id: String(member.id),
                          role: member.pivot?.role ?? '',
                          responsibility: member.pivot?.responsibility ?? '',
                      }))
                    : [emptyTeam()],
            );
        });
    }, [id]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const payload = new FormData(form);
        payload.set('technologies', JSON.stringify(techIds));
        payload.set(
            'members',
            JSON.stringify(
                team
                    .filter((row) => row.member_id)
                    .map((row) => ({ member_id: Number(row.member_id), role: row.role, responsibility: row.responsibility })),
            ),
        );
        payload.set('features', JSON.stringify(String(payload.get('features') || '').split('\n').map((line) => line.trim()).filter(Boolean)));
        const results = String(payload.get('results') || '')
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
                const [label, value] = line.split('|').map((part) => part.trim());
                return { label, value: value || '' };
            });
        payload.set('results', JSON.stringify(results));
        payload.set('is_published', (form.elements.namedItem('is_published') as HTMLInputElement).checked ? '1' : '0');
        payload.set('is_featured', (form.elements.namedItem('is_featured') as HTMLInputElement).checked ? '1' : '0');

        setSaving(true);
        try {
            const url = id ? `/admin/projects/${id}` : '/admin/projects';
            const response = await api.post(url, payload);
            toast.push(id ? 'Proyecto actualizado' : 'Proyecto creado');
            navigate(`/admin/proyectos/${response.data.project.id}/editar`);
        } catch (error) {
            toast.push(errorMessage(error), 'error');
        } finally {
            setSaving(false);
        }
    }

    async function uploadImage(file: File) {
        if (!id) {
            toast.push('Guarda el proyecto antes de subir la galería.', 'error');
            return;
        }
        const data = new FormData();
        data.append('image', file);
        const response = await api.post(`/admin/projects/${id}/images`, data);
        setImages((current) => [...current, response.data.image]);
    }

    if (!meta || (id && !project)) {
        return <p className="text-sm text-muted-foreground">Cargando formulario…</p>;
    }

    return (
        <form onSubmit={onSubmit} className="mx-auto max-w-4xl space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <p className="section-index">{id ? 'Editar' : 'Nuevo'}</p>
                    <h1 className="mt-2 font-display text-4xl">{id ? project?.name ?? 'Proyecto' : 'Crear proyecto'}</h1>
                </div>
                <Link to="/admin/proyectos" className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Volver
                </Link>
            </div>

            <section className="space-y-4 border border-border bg-white p-6">
                <p className="section-index">Información</p>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nombre">
                        <Input name="name" required defaultValue={project?.name} />
                    </Field>
                    <Field label="Título">
                        <Input name="title" required defaultValue={project?.title} />
                    </Field>
                </div>
                <Field label="Descripción corta">
                    <Input name="summary" required defaultValue={project?.summary} maxLength={320} />
                </Field>
                <Field label="Descripción completa">
                    <Textarea name="description" defaultValue={project?.description ?? ''} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Problema">
                        <Textarea name="problem" defaultValue={project?.problem ?? ''} />
                    </Field>
                    <Field label="Solución">
                        <Textarea name="solution" defaultValue={project?.solution ?? ''} />
                    </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Categoría">
                        <Select name="category_id" defaultValue={project?.category_id ? String(project.category_id) : ''}>
                            <option value="">Sin categoría</option>
                            {meta?.categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </Field>
                    <Field label="Estado">
                        <Select name="status" defaultValue={project?.status ?? 'idea'} required>
                            {meta?.statuses.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </Select>
                    </Field>
                    <Field label="Año">
                        <Input name="year" type="number" required defaultValue={project?.year ?? new Date().getFullYear()} />
                    </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Ubicación">
                        <Input name="location" defaultValue={project?.location ?? ''} />
                    </Field>
                    <Field label="Cliente">
                        <Input name="client" defaultValue={project?.client ?? ''} />
                    </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Inicio">
                        <Input name="started_at" type="date" defaultValue={project?.started_at ?? ''} />
                    </Field>
                    <Field label="Finalización">
                        <Input name="finished_at" type="date" defaultValue={project?.finished_at ?? ''} />
                    </Field>
                </div>
                <Field label="Características (una por línea)">
                    <Textarea name="features" defaultValue={project?.features?.join('\n') ?? ''} />
                </Field>
                <Field label="Resultados (etiqueta | valor)">
                    <Textarea name="results" defaultValue={project?.results?.map((item) => `${item.label} | ${item.value}`).join('\n') ?? ''} />
                </Field>
                <Field label="Portada">
                    <Input name="cover" type="file" accept="image/*" />
                </Field>
            </section>

            <section className="space-y-4 border border-border bg-white p-6">
                <p className="section-index">Tecnologías</p>
                <div className="flex flex-wrap gap-2">
                    {meta?.technologies.map((tech) => {
                        const active = techIds.includes(tech.id);
                        return (
                            <button
                                key={tech.id}
                                type="button"
                                className={`cursor-pointer border px-3 py-1 text-xs uppercase tracking-[0.12em] ${active ? 'border-ink bg-ink text-white' : 'border-border'}`}
                                onClick={() => setTechIds((current) => (active ? current.filter((id) => id !== tech.id) : [...current, tech.id]))}
                            >
                                {tech.name}
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="space-y-4 border border-border bg-white p-6">
                <p className="section-index">Miembros</p>
                {team.map((row, index) => (
                    <div key={index} className="grid gap-3 sm:grid-cols-3">
                        <Select value={row.member_id} onChange={(e) => setTeam((current) => current.map((item, i) => (i === index ? { ...item, member_id: e.target.value } : item)))}>
                            <option value="">Integrante</option>
                            {meta?.members.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.public_name}
                                </option>
                            ))}
                        </Select>
                        <Input placeholder="Rol en el proyecto" value={row.role} onChange={(e) => setTeam((current) => current.map((item, i) => (i === index ? { ...item, role: e.target.value } : item)))} />
                        <Input placeholder="Responsabilidad" value={row.responsibility} onChange={(e) => setTeam((current) => current.map((item, i) => (i === index ? { ...item, responsibility: e.target.value } : item)))} />
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setTeam((current) => [...current, emptyTeam()])}>
                    Agregar miembro
                </Button>
            </section>

            <section className="space-y-4 border border-border bg-white p-6">
                <p className="section-index">Galería</p>
                <div className="grid gap-3 sm:grid-cols-3">
                    {images.map((image) => (
                        <div key={image.id} className="relative">
                            <img src={image.url} alt="" className="aspect-video w-full object-cover" />
                            {id ? (
                                <button
                                    type="button"
                                    className="absolute right-2 top-2 cursor-pointer bg-white px-2 py-1 text-[10px] uppercase"
                                    onClick={async () => {
                                        await api.delete(`/admin/projects/${id}/images/${image.id}`);
                                        setImages((current) => current.filter((item) => item.id !== image.id));
                                    }}
                                >
                                    Quitar
                                </button>
                            ) : null}
                        </div>
                    ))}
                </div>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadImage(file);
                        e.target.value = '';
                    }}
                />
            </section>

            <section className="flex flex-wrap items-center gap-6 border border-border bg-white p-6">
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="is_published" defaultChecked={project?.is_published} />
                    Publicar
                </label>
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="is_featured" defaultChecked={project?.is_featured} />
                    Destacar
                </label>
                <Button type="submit" disabled={saving} className="ml-auto uppercase tracking-[0.16em]">
                    {saving ? 'Guardando…' : 'Guardar'}
                </Button>
            </section>
        </form>
    );
}
