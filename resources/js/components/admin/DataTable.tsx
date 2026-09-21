import type { ReactNode } from 'react';

export function DataTable({
    headers,
    children,
    empty,
}: {
    headers: string[];
    children: ReactNode;
    empty?: boolean;
}) {
    return (
        <div className="overflow-x-auto border border-border bg-white">
            <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border bg-stone-50 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-4 py-3 font-medium">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{empty ? (
                    <tr>
                        <td className="px-4 py-12 text-center text-muted-foreground" colSpan={headers.length}>
                            No hay registros todavía.
                        </td>
                    </tr>
                ) : (
                    children
                )}</tbody>
            </table>
        </div>
    );
}
