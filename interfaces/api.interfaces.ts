export interface APIError {
    status: number;
    statusText: string;
    msg: object | string[] | string;
}

export interface User {
    id?: number;
    last_login?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    is_admin?: boolean;
    is_data_engineer?: boolean;
    date_joined?: string;
    groups?: any[] | null;
    user_permissions?: any[] | null;
}

export interface Program {
    id?: number;
    name?: string;
    code?: string;
    description?: string;
    data_engineers?: number[] | null;
}

export interface Project {
    id?: number;
    name?: string;
    code?: string;
    program?: number;
    timezone?: string;
    datum?: number | string | null;
    attributes?: { [key: string]: string } | null;
    description?: string;
    geometry?: GeoJSON.Point | GeoJSON.LineString | GeoJSON.MultiLineString | GeoJSON.Polygon | GeoJSON.MultiPolygon | null;
    centroid?: GeoJSON.Point | null;
    site_data_package?: {} | null;
    custodians?: number[];
    dataset_count?: number;
    site_count?: number;
    record_count?: number;
}

export interface Site {
    id?: number;
    code?: string;
    name?: string;
    parent_site?: number | null;
    project?: number;
    geometry?: GeoJSON.Point | GeoJSON.LineString | GeoJSON.MultiLineString | GeoJSON.Polygon | GeoJSON.MultiPolygon | null;
    centroid?: GeoJSON.Point | null;
    description?: string;
    attributes?: { [key: string]: string } | null;
}

export interface Dataset {
    id?: number;
    name?: string;
    code?: string;
    type?: string;
    project?: number;
    data_package?: any;
    record_count?: number;
    description?: string;
}

export interface Record {
    id?: number;
    client_id?: string;
    dataset?: number;
    site?: number | null;
    source_info?: { [key: string]: string | number };
    last_modified?: string;
    created?: string;
    data?: { [key: string]: any } | null;
    validated?: boolean;
    locked?: boolean;
    datetime?: string;
    geometry?: GeoJSON.Point | GeoJSON.LineString | GeoJSON.MultiLineString | GeoJSON.Polygon | GeoJSON.MultiPolygon | null;
    species_name?: string;
    name_id?: number;
    parent?: number;
    children?: number[];
}

export interface RecordResponse {
    count: number;
    results?: Record[];
}

export interface Media {
    id?: number;
    record?: number;
    file?: string;
    created?: string;
    last_modified?: string;
}

export interface Statistic {
    projects: { total: number; };
    datasets: {
        total: number;
        generic: { total: number; };
        observation: { total: number; };
        speciesObservation: { total: number; };
    };
    records: {
        total: number;
        generic: { total: number; };
        observation: { total: number; };
        speciesObservation: { total: number; };
    };
    sites: { total: number; };
}

export interface ModelChoice {
    display_name: string;
    value: string | number;
}
