import { useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SpecularButton from '@/components/SpecularButton';
import { Field, Input, Textarea } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useToast } from '@/context/ToastContext';
import { Mail, MessageSquare, Send, ShieldCheck, Zap } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const types = ['Plataforma Web / SaaS', 'Aplicación Móvil', 'Arquitectura Cloud & Backend', 'Integración de IA & Automatización', 'Sistemas Empresariales / ERP', 'Consultoría & Auditoría'];
const budgets = ['A definir con el equipo', 'USD 10k – 25k', 'USD 25k – 50k', 'USD 50k – 100k', 'Más de USD 100k'];

export function ContactForm() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        setLoading(true);
        setErrors({});
        try {
            await api.post('/public/contact', data);
            form.reset();
            toast.push('Recibimos tu solicitud. Un líder de ingeniería te contactará en menos de 24h.');
        } catch (error) {
            const payload = (error as { response?: { data?: { errors?: Record<string, string[]> } } }).response?.data?.errors;
            if (payload) {
                setErrors(Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, value[0]])));
            }
            toast.push(errorMessage(error, 'No pudimos enviar el mensaje.'), 'error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-5" noValidate>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nombre completo" error={errors.name}>
                    <Input name="name" required autoComplete="name" placeholder="Ej. Carlos Mendoza" />
                </Field>
                <Field label="Correo corporativo" error={errors.email}>
                    <Input name="email" type="email" required autoComplete="email" placeholder="carlos@empresa.com" />
                </Field>
            </div>
            <Field label="Empresa u organización" error={errors.company}>
                <Input name="company" autoComplete="organization" placeholder="Ej. Acme Corp / Startup" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Tipo de proyecto" error={errors.project_type}>
                    <Select name="project_type" defaultValue="">
                        <option value="">Selecciona una opción</option>
                        {types.map((type) => (
                            <option key={type}>{type}</option>
                        ))}
                    </Select>
                </Field>
                <Field label="Rango de inversión" error={errors.budget}>
                    <Select name="budget" defaultValue="">
                        <option value="">Selecciona un rango</option>
                        {budgets.map((budget) => (
                            <option key={budget}>{budget}</option>
                        ))}
                    </Select>
                </Field>
            </div>
            <Field label="Descripción de la solución o desafío" error={errors.message}>
                <Textarea name="message" required minLength={20} placeholder="Detalles técnicos, objetivos, usuarios esperados o requerimientos de entrega." />
            </Field>
            <SpecularButton
                type="submit"
                disabled={loading}
                variant="primary"
                size="md"
                radius={10}
                className="w-full text-xs font-bold uppercase tracking-wider py-3.5"
            >
                <Send size={15} />
                <span>{loading ? 'Transmitiendo solicitud…' : 'Enviar Requerimiento al Consorcio'}</span>
            </SpecularButton>
        </form>
    );
}

export function Contact() {
    return (
        <section id="contacto" className="bg-ink px-5 py-24 text-white lg:px-8 relative overflow-hidden">
            <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5">
                    <ScrollReveal direction="right">
                        <span className="tech-tag-dark">05 // CONVERSEMOS</span>
                        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Inicia tu próximo salto tecnológico.
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-slate-300">
                            Evaluamos tu arquitectura, estimamos tiempos y configuramos el equipo ideal para tu proyecto. Sin rodeos ni compromisos.
                        </p>

                        <div className="mt-10 space-y-4 font-mono text-xs text-slate-300">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                                    <Zap size={16} />
                                </div>
                                <span>Respuesta y análisis preliminar en 24 horas</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                                    <ShieldCheck size={16} />
                                </div>
                                <span>Acuerdo de confidencialidad (NDA) disponible</span>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white p-7 text-foreground shadow-2xl lg:col-span-7 lg:p-10">
                    <ScrollReveal direction="left" delay={120}>
                        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                            <div>
                                <h3 className="font-display text-lg font-bold text-primary">Formulario de Requerimiento</h3>
                                <p className="text-xs text-muted-foreground">Comparte tus especificaciones con el equipo de ingeniería</p>
                            </div>
                            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <ContactForm />
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
