import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected authService: AuthService, protected router: Router) {
    }

    canActivate() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);

            return false;
        }

        return true;
    }
}
