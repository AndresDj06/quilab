import { useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import { errorMessage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, Input, Textarea } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useToast } from '@/context/ToastContext';

const types = ['Plataformas web', 'Sistemas empresariales', 'Producto móvil', 'APIs y backend', 'Datos e inteligencia', 'Otro'];
const budgets = ['A definir', 'USD 20k – 40k', 'USD 40k – 80k', 'USD 80k – 120k', 'Más de USD 120k'];

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
            toast.push('Recibimos tu proyecto. Te escribiremos pronto.');
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
                <Field label="Nombre" error={errors.name}>
                    <Input name="name" required autoComplete="name" />
                </Field>
                <Field label="Email" error={errors.email}>
                    <Input name="email" type="email" required autoComplete="email" />
                </Field>
            </div>
            <Field label="Empresa / organización" error={errors.company}>
                <Input name="company" autoComplete="organization" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Tipo de proyecto" error={errors.project_type}>
                    <Select name="project_type" defaultValue="">
                        <option value="">Selecciona</option>
                        {types.map((type) => (
                            <option key={type}>{type}</option>
                        ))}
                    </Select>
                </Field>
                <Field label="Presupuesto aproximado" error={errors.budget}>
                    <Select name="budget" defaultValue="">
                        <option value="">Selecciona</option>
                        {budgets.map((budget) => (
                            <option key={budget}>{budget}</option>
                        ))}
                    </Select>
                </Field>
            </div>
            <Field label="Descripción" error={errors.message}>
                <Textarea name="message" required minLength={20} placeholder="Contexto, restricciones y lo que necesitas construir." />
            </Field>
            <Button type="submit" variant="accent" disabled={loading} className="rounded-full uppercase tracking-[0.16em]">
                {loading ? 'Enviando…' : 'Cuéntanos tu proyecto'}
            </Button>
        </form>
    );
}

export function Contact() {
    return (
        <section id="contacto" className="relative overflow-hidden bg-ink px-5 py-24 text-white lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_90%_10%,rgba(46,196,182,0.16),transparent_55%),radial-gradient(700px_400px_at_0%_80%,rgba(232,197,106,0.14),transparent_50%)]" />
            <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <p className="section-index !text-teal/80">06 / Contacto</p>
                    <h2 className="mt-4 font-display text-4xl leading-none lg:text-6xl">Si el problema es real, hablemos.</h2>
                    <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65">
                        Cuéntanos el contexto, no el eslogan. Respondemos con una lectura honesta de alcance, equipo y siguiente paso.
                    </p>
                </div>
                <div className="glass-panel rounded-[2rem] p-6 text-foreground lg:col-span-7 lg:p-10">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
