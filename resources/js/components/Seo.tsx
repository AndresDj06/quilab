import { useEffect } from 'react';
import { setSeo } from '@/lib/seo';

export function Seo({ title, description }: { title?: string; description?: string }) {
    useEffect(() => {
        setSeo({ title, description, path: window.location.pathname });
    }, [title, description]);

    return null;
}
