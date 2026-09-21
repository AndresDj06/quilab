export function DashboardCard({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
    return (
        <div className="border border-border bg-white p-5">
            <p className="section-index">{label}</p>
            <p className="mt-3 font-display text-4xl">{value}</p>
            {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
        </div>
    );
}
