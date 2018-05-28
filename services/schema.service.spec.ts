import { TestBed, inject } from '@angular/core/testing';

import { SchemaService } from './schema.service';

describe('SchemaService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SchemaService]
        });
    });

    it('should be created', inject([SchemaService], (service: SchemaService) => {
        expect(service).toBeTruthy();
    }));

    it('should read the data package', inject([SchemaService], (service: SchemaService) => {
        const test: object = {
            'id': 8,
            'record_count': 362,
            'data_package': {
                'name': 'ki',
                'title': 'Kimberley Islands',
                'resources': [
                    {
                        'name': 'ki-bats',
                        'url': '',
                        'title': 'Kimberley Islands - Bats',
                        'schema': {
                            'foreignKeys': [
                                {
                                    'reference': {
                                        'resource': 'Site',
                                        'fields': [
                                            'code'
                                        ],
                                        'datapackage': ''
                                    },
                                    'fields': [
                                        'Island'
                                    ]
                                }
                            ],
                            'fields': [
                                {
                                    'description': '',
                                    'title': '',
                                    'name': 'Island',
                                    'type': 'string',
                                    'constraints': {
                                        'required': true
                                    },
                                    'format': 'default'
                                },
                                {
                                    'description': '',
                                    'title': '',
                                    'name': 'Date',
                                    'type': 'date',
                                    'constraints': {
                                        'required': true
                                    },
                                    'format': 'any'
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Genus',
                                    'title': ''
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Species',
                                    'title': ''
                                },
                                {
                                    'description': '',
                                    'title': '',
                                    'name': 'Species whole',
                                    'biosys': {
                                        'type': 'speciesName'
                                    },
                                    'type': 'string',
                                    'constraints': {
                                        'required': true
                                    },
                                    'format': 'default'
                                },
                                {
                                    'description': '',
                                    'title': '',
                                    'name': 'Latitude',
                                    'type': 'number',
                                    'constraints': {
                                        'required': true
                                    },
                                    'format': 'default'
                                },
                                {
                                    'description': '',
                                    'title': '',
                                    'name': 'Longitude',
                                    'type': 'number',
                                    'constraints': {
                                        'required': true
                                    },
                                    'format': 'default'
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Datum',
                                    'title': ''
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Record type',
                                    'title': ''
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Collector',
                                    'title': ''
                                },
                                {
                                    'description': '',
                                    'title': '',
                                    'name': 'Method',
                                    'type': 'string',
                                    'constraints': {
                                        'enum': [
                                            'Anabat',
                                            'Anabat-LS10',
                                            'Anabat-minidisc',
                                            'echolocation',
                                            'Mistnet',
                                            'SM2mono'
                                        ],
                                        'required': true
                                    },
                                    'format': 'default'
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Comments',
                                    'title': ''
                                },
                                {
                                    'description': '',
                                    'title': '',
                                    'name': 'Description',
                                    'type': 'string',
                                    'constraints': {
                                        'required': true
                                    },
                                    'format': 'default'
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Class',
                                    'title': ''
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Order',
                                    'title': ''
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Family',
                                    'title': ''
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Institution',
                                    'title': ''
                                },
                                {
                                    'format': 'default',
                                    'type': 'string',
                                    'description': '',
                                    'name': 'Expedition',
                                    'title': ''
                                }
                            ]
                        }
                    }
                ]
            },
            'name': 'Bats',
            'code': '',
            'type': 'species_observation',
            'description': null,
            'project': 9
        }

        service.formGroupFromDataPackage(test['data_package']);
    }));
});
