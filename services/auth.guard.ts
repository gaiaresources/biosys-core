import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected authService: AuthService) {

    }

    canActivate() {
        return this.authService.isLoggedIn();
    }
}
