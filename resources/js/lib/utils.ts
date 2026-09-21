import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function mediaUrl(path?: string | null, fallback = '') {
    return path || fallback;
}

export function formatIndex(value: number, size = 2) {
    return String(value).padStart(size, '0');
}

export function errorMessage(error: unknown, fallback = 'No fue posible completar la acción.') {
    if (typeof error === 'object' && error && 'response' in error) {
        const data = (error as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }).response?.data;
        const first = data?.errors ? Object.values(data.errors)[0]?.[0] : null;
        return first || data?.message || fallback;
    }
    return fallback;
}
