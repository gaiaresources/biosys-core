export interface FormDescriptor {
    fields: FieldDescriptor[];
}

export interface ObservationFormDescriptor extends FormDescriptor {
    dateFields: FieldDescriptor[];
    locationFields: FieldDescriptor[];
    requiredFields?: FieldDescriptor[];
    hiddenFields?: FieldDescriptor[];
}

export interface FieldDescriptor {
    key: string;
    label: string;
    description?: string;
    type: string;
    format?: string;
    options?: FieldOption[];
    defaultValue?: string;
}

export interface FieldOption {
    name: string;
    value: string;
}
