import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { APIError, User, Project, Dataset, Site, Record, Statistic, ModelChoice }
    from '../interfaces/api.interfaces';
import { environment } from '../../../environments/environment';

/**
 * This class provides the Biosys API service.
 */
@Injectable()
export class APIService {
    private baseUrl: string;
    private _receivedUnauthenticatedError = false;

    public get receivedUnauthenticatedError() {
        if (this._receivedUnauthenticatedError) {
            this._receivedUnauthenticatedError = false;
            return true;
        }

        return false;
    }

    private handleError (error: any, caught: Observable<any>) {
        let apiError: APIError = {
            status: error.status,
            statusText: error.statusText,
            msg: ''
        };
        let body = error.error;
        // the error message is either the body itself or in a 'detail' property
        if ('detail' in body) {
            apiError.msg = body['detail'];
        } else {
            apiError.msg = body;
        }

        this._receivedUnauthenticatedError = error.status === 401;

        return Observable.throw(apiError);
    }

    private buildAbsoluteUrl(path: string, appendEndSlash: boolean = true) {
        return this.baseUrl + ((path && !path.endsWith('/')) && appendEndSlash ? path + '/' : path);
    }

    /**
     * Creates a new APIService with the injected Http.
     * @param {Http} httpClient - The injected Http.
     * @constructor
     */
    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.server + environment.apiExtension;
    }

    public getAuthToken(username: string, password: string): Observable<any> {
        return this.httpClient.post(this.buildAbsoluteUrl('auth-token'), {
                username: username,
                password: password
            }
        )
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getUser(id: number): Observable<User> {
        return this.httpClient.get(this.buildAbsoluteUrl('users/' + id))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getUsers(): Observable<User[]> {
        return this.httpClient.get(this.buildAbsoluteUrl('users'))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public whoAmI(): Observable<User> {
        return this.httpClient.get(this.buildAbsoluteUrl('whoami'))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getProjects(custodians?: number[]): Observable<Project[]> {
        let params: any = {};
        if (custodians) {
            params['custodians'] = custodians.toString();
        }

        return this.httpClient.get(this.buildAbsoluteUrl('projects'), {
            params: params
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getProjectById(id: number): Observable<Project> {
        return this.httpClient.get(this.buildAbsoluteUrl('projects/' + id))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public createProject(project: Project): Observable<Project> {
        return this.httpClient.post(this.buildAbsoluteUrl('projects'), project)
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public updateProject(project: Project): Observable<Project> {
        return this.httpClient.patch(this.buildAbsoluteUrl('projects/' + project.id), project)
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteProject(id: number): Observable<Project> {
        return this.httpClient.delete(this.buildAbsoluteUrl('projects/' + id))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getAllSites(): Observable<Site[]> {
        return this.httpClient.get(this.buildAbsoluteUrl('sites'))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getAllSitesForProjectID(id: number): Observable<Site[]> {
        return this.httpClient.get(this.buildAbsoluteUrl('projects/' + id + '/sites'))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getSiteById(id: number): Observable<Site> {
        return this.httpClient.get(this.buildAbsoluteUrl('sites/' + id))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public createSite(site: Site): Observable<Site> {
        return this.httpClient.post(this.buildAbsoluteUrl('sites/'), site)
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public updateSite(site: Site): Observable<Site> {
        return this.httpClient.patch(this.buildAbsoluteUrl('sites/' + site.id), site)
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteSite(id: number): Observable<Site> {
        return this.httpClient.delete(this.buildAbsoluteUrl('sites/' + id))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteSites(projectId: number, siteIds: number[]): Observable<void> {
        // httpClient.delete method doesn't accept a body argument, so use request as a work-around
        return this.httpClient.request('DELETE', this.buildAbsoluteUrl('projects/' + projectId + '/sites/'), {
            body: siteIds
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getDatasets(params = {}): Observable<Dataset[]> {
        return this.httpClient.get(this.buildAbsoluteUrl('datasets'), {
            params: params
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getAllDatasetsForProjectID(id: number): Observable<Dataset[]> {
        return this.httpClient.get(this.buildAbsoluteUrl('datasets'), {
            params: {project: String(id)}
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getDatasetById(id: number): Observable<Dataset> {
        return this.httpClient.get(this.buildAbsoluteUrl('datasets/' + id))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public createDataset(dataset: Dataset): Observable<Dataset> {
        return this.httpClient.post(this.buildAbsoluteUrl('datasets'), dataset)
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public updateDataset(dataset: Dataset): Observable<Dataset> {
        return this.httpClient.patch(this.buildAbsoluteUrl('datasets/' + dataset.id), dataset)
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteDataset(id: number): Observable<Dataset> {
        return this.httpClient.delete(this.buildAbsoluteUrl('dataset/' + id))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getRecordsByDatasetId(id: number, params = {}): Observable<any> {
        params['dataset__id'] = id;
        return this.getRecords(params);
    }

    public getRecords(params = {}): Observable<Record[]> {
        return this.httpClient.get(this.buildAbsoluteUrl('records'), {
            params: params
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getRecordById(id: number): Observable<Record> {
        return this.httpClient.get(this.buildAbsoluteUrl('records/' + id))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public createRecord(record: Record, strict = true): Observable<Record> {
        // strict is evaluated to true on the server if the parameter is passed with any value
        const params = strict ? {strict: 'true'} : {};

        return this.httpClient.post(this.buildAbsoluteUrl('records'), record, {
            params: params
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public updateRecord(id: number, record: Record, strict = true): Observable<Record> {
        // strict is evaluated to true on the server if the parameter is passed with any value
        const params = strict ? {strict: 'true'} : {};

        return this.httpClient.put(this.buildAbsoluteUrl('records/' + id), record, {
            params: params
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public updateRecordDataField(id: number, data: any, strict = false): Observable<Record> {
        // strict is evaluated to true on the server if the parameter is passed with any value
        const params = strict ? {strict: 'true'} : {};

        return this.httpClient.patch(this.buildAbsoluteUrl('records/' + id), {data: data}, {
            params: params
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteRecord(id: number): Observable<Record> {
        return this.httpClient.delete(this.buildAbsoluteUrl('records/' + id))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteRecords(datasetId: number, recordIds: number[]): Observable<void> {
        // httpClient.delete method doesn't accept a body argument, so use request as a work-around
        return this.httpClient.request('DELETE', this.buildAbsoluteUrl('datasets/' + datasetId + '/records/'), {
            body: recordIds
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public deleteAllRecords(datasetId: number): Observable<void> {
        // httpClient.delete method doesn't accept a body argument, so use request as a work-around
        return this.httpClient.request('DELETE', this.buildAbsoluteUrl('datasets/' + datasetId + '/records/'), {
            body: JSON.stringify('all')
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getStatistics(): Observable<Statistic> {
        return this.httpClient.get(this.buildAbsoluteUrl('statistics'), {})
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getModelChoices(modelName: string, fieldName: string): Observable<ModelChoice[]> {
        return this.getModelMetadata(modelName).pipe(
            map((metaData) => metaData.actions['POST'][fieldName]['choices'])
        )
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getModelMetadata(modelName: string): Observable<any> {
        return this.httpClient.options(this.buildAbsoluteUrl(modelName))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getSpecies(search?: string): Observable<any> {
        let params: any = {};
        if (search) {
            params['search'] = search;
        }
        return this.httpClient.get(this.buildAbsoluteUrl('species'), {
            params: params
        })
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public getRecordsUploadURL(datasetId: number): string {
        return this.buildAbsoluteUrl('datasets/' + datasetId + '/upload-records/');
    }

    public getProjectSiteUploadURL(projectId: number): string {
        return this.buildAbsoluteUrl('projects/' + projectId + '/upload-sites/');
    }

    public getRecordExportURL(): string {
        return this.buildAbsoluteUrl('records/?output=xlsx&', false);
    }

    public getInferDatasetURL(): string {
        return this.buildAbsoluteUrl('utils/infer-dataset/');
    }

    public recordDataToGeometry(datasetId: number, geometry: GeoJSON.GeometryObject, data: any) {
        return this.httpClient.post(this.buildAbsoluteUrl('utils/data-to-geometry/dataset/' + datasetId), {
                geometry: geometry,
                data: data
            }
        )
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public recordGeometryToData(datasetId: number, geometry: GeoJSON.GeometryObject, data: any) {
        return this.httpClient.post(this.buildAbsoluteUrl('utils/geometry-to-data/dataset/' + datasetId), {
                geometry: geometry,
                data: data
            }
        )
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }

    public logout(): Observable<any> {
        return this.httpClient.get(this.buildAbsoluteUrl('logout'))
        .pipe(
            catchError((err, caught) => this.handleError(err, caught))
        );
    }
}
