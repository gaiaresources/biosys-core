"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var index_1 = require("../index");
var app_config_1 = require("../../config/app.config");
/**
 * This class provides the Biosys API service.
 */
var APIService = APIService_1 = (function () {
    /**
     * Creates a new APIService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    function APIService(http) {
        this.http = http;
        this.baseUrl = app_config_1.default.API;
        if (!this.baseUrl.endsWith('/'))
            this.baseUrl += '/';
    }
    /**
     * Handle HTTP error
     */
    APIService.handleError = function (res) {
        var error = {
            status: res.status,
            statusText: res.statusText,
            text: res.json(),
            msg: ''
        };
        // The error message is usually in the body as 'detail' or 'non_field_errors'
        var body = res.json();
        if ('detail' in body) {
            error.msg = body['detail'];
        }
        else if ('non_field_errors' in body) {
            error.msg = body['non_field_errors'];
        }
        else {
            error.msg = body;
        }
        return rxjs_1.Observable.throw(error);
    };
    APIService.prototype.getAuthToken = function (username, password) {
        return this.fetch('auth-token', {
            method: 'Post',
            data: {
                username: username,
                password: password
            },
            map: function (res) { return res.token; }
        });
    };
    APIService.prototype.getUser = function (id) {
        return this.fetch('users/' + id, {});
    };
    APIService.prototype.getUsers = function () {
        return this.fetch('users', {});
    };
    APIService.prototype.whoAmI = function () {
        return this.fetch('whoami', {});
    };
    APIService.prototype.getProjects = function (custodians) {
        var params = {};
        if (custodians) {
            params['urlParams'] = { custodians: custodians.toString() };
        }
        return this.fetch('projects', params);
    };
    APIService.prototype.getProjectById = function (id) {
        return this.fetch('projects/' + id, {});
    };
    APIService.prototype.createProject = function (project) {
        return this.fetch('projects', {
            method: 'Post',
            data: project
        });
    };
    APIService.prototype.updateProject = function (project) {
        return this.fetch('projects/' + project.id, {
            method: 'Patch',
            data: project
        });
    };
    APIService.prototype.deleteProject = function (id) {
        return this.fetch('projects/' + id, {
            method: 'Delete',
        });
    };
    APIService.prototype.getAllSites = function () {
        return this.fetch('sites', {});
    };
    APIService.prototype.getAllSitesForProjectID = function (id) {
        return this.fetch('projects/' + id + '/sites', {});
    };
    APIService.prototype.getSiteById = function (id) {
        return this.fetch('sites/' + id, {});
    };
    APIService.prototype.createSite = function (site) {
        return this.fetch('sites/', {
            method: 'Post',
            data: site
        });
    };
    APIService.prototype.updateSite = function (site) {
        return this.fetch('sites/' + site.id, {
            method: 'Patch',
            data: site
        });
    };
    APIService.prototype.deleteSite = function (id) {
        return this.fetch('sites/' + id, {
            method: 'Delete',
        });
    };
    APIService.prototype.deleteSites = function (projectId, siteIds) {
        return this.fetch('projects/' + projectId + '/sites/', {
            method: 'Delete',
            data: siteIds
        });
    };
    APIService.prototype.getDatasets = function (params) {
        return this.fetch('datasets', params ? { urlParams: params } : {});
    };
    APIService.prototype.getAllDatasetsForProjectID = function (id) {
        return this.fetch('datasets', { urlParams: { project: String(id) } });
    };
    APIService.prototype.getDatasetById = function (id) {
        return this.fetch('datasets/' + id, {});
    };
    APIService.prototype.createDataset = function (dataset) {
        return this.fetch('datasets', {
            method: 'Post',
            data: dataset
        });
    };
    APIService.prototype.updateDataset = function (dataset) {
        return this.fetch('datasets/' + dataset.id, {
            method: 'Patch',
            data: dataset
        });
    };
    APIService.prototype.deleteDataset = function (id) {
        return this.fetch('dataset/' + id, {
            method: 'Delete',
        });
    };
    APIService.prototype.getRecordsByDatasetId = function (id) {
        return this.fetch('datasets/' + id + '/records/', {});
    };
    APIService.prototype.createRecordsForDatasetId = function (id, data) {
        return this.fetch('datasets/' + id + '/records/', {
            method: 'Post',
            data: data
        });
    };
    APIService.prototype.getRecords = function (params) {
        return this.fetch('records', params ? { urlParams: params } : {});
    };
    APIService.prototype.getRecordById = function (id) {
        return this.fetch('records/' + id, {});
    };
    APIService.prototype.createRecord = function (record, strict) {
        if (strict === void 0) { strict = true; }
        var urlParams = strict ? { strict: 'true' } : {};
        return this.fetch('records', {
            method: 'Post',
            data: record,
            urlParams: urlParams
        });
    };
    APIService.prototype.updateRecord = function (id, record, strict) {
        if (strict === void 0) { strict = true; }
        var urlParams = strict ? { strict: 'true' } : {};
        return this.fetch('records/' + id, {
            method: 'Put',
            data: record,
            urlParams: urlParams
        });
    };
    APIService.prototype.deleteRecord = function (id) {
        return this.fetch('records/' + id, {
            method: 'Delete',
        });
    };
    APIService.prototype.deleteRecords = function (datasetId, recordIds) {
        return this.fetch('datasets/' + datasetId + '/records/', {
            method: 'Delete',
            data: recordIds
        });
    };
    APIService.prototype.getStatistics = function () {
        return this.fetch('statistics', {});
    };
    APIService.prototype.getModelChoices = function (modelName, fieldName) {
        return this.getModelMetadata(modelName)
            .map(function (metaData) { return metaData.actions['POST'][fieldName]['choices']; });
    };
    APIService.prototype.getModelMetadata = function (modelName) {
        return this.fetch(modelName, {
            'method': 'Options'
        });
    };
    APIService.prototype.getSpecies = function (search) {
        var urlParams = {};
        if (search) {
            urlParams['search'] = search;
        }
        return this.fetch('species', {
            urlParams: urlParams
        });
    };
    APIService.prototype.getRecordsUploadURL = function (datasetId) {
        return this.baseUrl + 'datasets/' + datasetId + '/upload-records/';
    };
    APIService.prototype.getProjectSiteUploadURL = function (projectId) {
        return this.baseUrl + 'projects/' + projectId + '/upload-sites/';
    };
    APIService.prototype.getRecordExportURL = function () {
        return this.baseUrl + 'records/?output=xlsx&';
    };
    /**
     * Returns an array of [header, value] of headers necessary for authentication
     * @returns {[string,string][]}
     */
    APIService.prototype.getAuthHeaders = function () {
        var headers = [];
        var authToken = index_1.AuthService.getAuthToken();
        if (authToken) {
            headers.push(['Authorization', 'Token ' + authToken]);
        }
        return headers;
    };
    APIService.prototype.logout = function () {
        return this.fetch('logout', {});
    };
    APIService.prototype.request = function (path, options) {
        if (path && !path.endsWith('/')) {
            // enforce '/' at the end
            path += '/';
        }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        for (var _i = 0, _a = this.getAuthHeaders(); _i < _a.length; _i++) {
            var header = _a[_i];
            headers.append(header[0], header[1]);
        }
        if (options.headers) {
            for (var key in options.headers) {
                headers.append(key, options.headers[key]);
            }
        }
        var searchParams = new http_1.URLSearchParams();
        if (options.urlParams) {
            for (var key in options.urlParams) {
                searchParams.append(key, options.urlParams[key]);
            }
        }
        var reqOptions = new http_1.RequestOptions({
            url: this.baseUrl + path,
            method: options.method || 'Get',
            headers: headers,
            search: searchParams,
            body: JSON.stringify(options.data),
            withCredentials: true,
            responseType: http_1.ResponseContentType.Json
        });
        var request = new http_1.Request(reqOptions);
        return this.http.request(request)
            .map(function (res) {
            return options.map ? options.map(res.json()) : res.json();
        })
            .catch(APIService_1.handleError);
    };
    return APIService;
}());
APIService = APIService_1 = __decorate([
    core_1.Injectable()
], APIService);
exports.APIService = APIService;
var APIService_1;
