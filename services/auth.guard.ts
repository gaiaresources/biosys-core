import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected router: Router, protected authService: AuthService) {

    }

    canActivate() {
        return this.authService.isLoggedIn();
    }
}
