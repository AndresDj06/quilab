export function setSeo(options: { title?: string; description?: string; path?: string }) {
    const title = options.title ? `${options.title} — QUILAB` : 'QUILAB — Consorcio de software';
    const description =
        options.description ??
        'Consorcio de profesionales que construye productos digitales de alto nivel.';

    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
        let node = document.head.querySelector(selector);
        if (!node) {
            node = document.createElement('meta');
            if (selector.includes('property')) {
                node.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] ?? '');
            } else {
                node.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] ?? '');
            }
            document.head.appendChild(node);
        }
        node.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);

    const canonicalHref = `${window.location.origin}${options.path ?? window.location.pathname}`;
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;
}
