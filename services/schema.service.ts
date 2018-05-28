import { Injectable } from '@angular/core';
import { Dataset } from '../interfaces/api.interfaces';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { Schema, Field } from 'tableschema';
import { Package, DataPackage } from 'datapackage';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { zip } from 'rxjs/observable/zip';
import { map } from 'rxjs/operators';

import { FormDescriptor } from '../interfaces/form.interfaces';

@Injectable()
export class SchemaService {
    private static readonly NON_VALIDATED_SCHEMA_CONSTRAINTS = ['unique', 'enum'];

    private static constraintsToValidators(constraints: object): ValidatorFn[] {
        return Object.keys(constraints).
        filter((constraintName: string) =>
            SchemaService.NON_VALIDATED_SCHEMA_CONSTRAINTS.indexOf(constraintName) === -1).
        filter(
            (constraintName: string) => !(constraintName === 'required' && !constraints[constraintName])).
        map((constraintName: string) => {
            switch (constraintName) {
                case 'required':
                    return Validators.required;
                case 'minimum':
                    return Validators.min(constraints[constraintName]);
                case 'maximum':
                    return Validators.max(constraints[constraintName]);
                default:
                    // for minLength, maxLength and pattern the schema constraint name is the same as the validator name
                    return Validators[constraintName](constraints[constraintName]);
            }
        });
    }

    private static schemaFieldTypeToFormFieldType(field: Field): string {
        if (field.type === 'string') {
            if (field.hasOwnProperty('constraints') && field.constraints.hasOwnProperty('enum')) {
                return 'select';
            } else {
                return 'text';
            }
        } else {
            return field.type;
        }
    }

    constructor(private formBuilder: FormBuilder) {
    }

    public formGroupFromDataPackage(dataset: Dataset, resourceIndex: number = 0): Observable<FormGroup> {
        return fromPromise(Schema.load(dataset.data_package.resources[resourceIndex].schema)).pipe(
            map((schema: Schema) => {
                const group = {};

                schema.fields.forEach((field: Field) =>
                    group[field.name] = ['', SchemaService.constraintsToValidators(field.constraints)]);

                return this.formBuilder.group(group);
            })
        );
    }

    public formDescriptorFromDataPackage(dataset: Dataset, resourceIndex: number = 0): Observable<FormDescriptor> {
        return fromPromise(Schema.load(dataset.data_package.resources[resourceIndex].schema)).pipe(
            map((schema: Schema) => {
                return {
                    fields: schema.fields.map((field: Field) => {
                            const type: string = SchemaService.schemaFieldTypeToFormFieldType(field);

                            return {
                                key: field.name,
                                label: field.title ? field.title : field.name,
                                description: field.description,
                                format: field.format,
                                type: type,
                                options: type === 'select' ? field.constraints.enum : null
                            };
                        }
                    )
                };
            })
        );
    }

    public formDescriptorAndGroupFromDataPackage(dataset: Dataset, resourceIndex: number = 0):
            Observable<[FormDescriptor, FormGroup]> {
        return zip(this.formDescriptorFromDataPackage(dataset, resourceIndex),
            this.formGroupFromDataPackage(dataset, resourceIndex));
    }
}
