import { Seo } from '@/components/Seo';
import { Contact } from '@/features/landing/Contact';

export default function ContactPage() {
    return (
        <div className="bg-ink pt-16">
            <Seo title="Contacto" description="Cuéntanos tu proyecto. QUILAB responde con alcance, equipo y siguiente paso." />
            <Contact />
        </div>
    );
}
