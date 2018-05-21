import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '..//services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({headers: req.headers.set('content-type', 'application/json')});

        let authToken = this.authService.getAuthToken();
        if (authToken) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Token ' + authToken),
                withCredentials: true
            });
        }

        return next.handle(req);
    }
}
