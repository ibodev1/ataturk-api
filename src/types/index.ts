export interface Quote {
    id: number;
    quote: string;
    source_ids: string[] | undefined;
    detail: string | undefined;
}

export interface Source {
    id: number | undefined;
    source: string;
    url: string | undefined;
}