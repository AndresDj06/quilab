export type Category = {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
};

export type Technology = {
    id: number;
    name: string;
    slug: string;
    area?: string;
};

export type ProjectStatus = 'idea' | 'planning' | 'in_progress' | 'paused' | 'finished';

export type ResultMetric = {
    label: string;
    value: string;
};

export type MemberPivot = {
    role?: string | null;
    responsibility?: string | null;
    joined_at?: string | null;
    position?: number;
};

export type Member = {
    id: number;
    first_name: string;
    last_name: string;
    public_name: string;
    slug: string;
    initials: string;
    photo_url?: string | null;
    role_title: string;
    specialty?: string | null;
    bio?: string | null;
    email?: string | null;
    linkedin?: string | null;
    github?: string | null;
    website?: string | null;
    location?: string | null;
    status: string;
    is_featured: boolean;
    technologies?: Technology[];
    projects_count?: number;
    projects?: ProjectCard[];
    pivot?: MemberPivot;
};

export type ProjectImage = {
    id: number;
    url: string;
    caption?: string | null;
    alt?: string | null;
};

export type ProjectCard = {
    id: number;
    reference: string;
    name: string;
    slug: string;
    title: string;
    summary: string;
    status: ProjectStatus;
    status_label: string;
    year: number;
    location?: string | null;
    cover_url?: string | null;
    is_published?: boolean;
    is_featured?: boolean;
    category?: Category | null;
    technologies?: Technology[];
    members_count?: number;
};

export type Project = ProjectCard & {
    description?: string | null;
    problem?: string | null;
    solution?: string | null;
    features?: string[];
    results?: ResultMetric[];
    client?: string | null;
    cover?: string | null;
    external_url?: string | null;
    is_published: boolean;
    is_featured: boolean;
    position?: number;
    meta_title?: string | null;
    meta_description?: string | null;
    started_at?: string | null;
    finished_at?: string | null;
    category_id?: number | null;
    members?: Member[];
    images?: ProjectImage[];
};

export type User = {
    id: number;
    name: string;
    email: string;
    role: 'super_admin' | 'admin' | 'editor';
    role_label: string;
    status: string;
};

export type ContactMessage = {
    id: number;
    name: string;
    email: string;
    company?: string | null;
    project_type?: string | null;
    budget?: string | null;
    message: string;
    status: string;
    internal_note?: string | null;
    created_at: string;
};

export type Paginated<T> = {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    links: {
        next?: string | null;
        prev?: string | null;
    };
};

export type LandingPayload = {
    projects: ProjectCard[];
    members: Member[];
    stats: {
        projects: number;
        members: number;
        finished: number;
        years: number;
    };
};

export type Catalogs = {
    categories: Category[];
    technologies: Technology[];
    statuses: { value: string; label: string }[];
    years: number[];
};

export type DashboardPayload = {
    kpis: {
        projects: number;
        active: number;
        finished: number;
        members: number;
        messages: number;
        unread: number;
    };
    charts: {
        status: { value: string; label: string; total: number }[];
        messages: { label: string; value: number }[];
    };
    recent_projects: ProjectCard[];
};
