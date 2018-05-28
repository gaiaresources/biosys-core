export interface FormDescriptor {
    fields: FieldDescriptor[];
}

export interface FieldDescriptor {
    key: string;
    label: string;
    description?: string;
    type: string;
    format?: string;
    options?: string[];
}
