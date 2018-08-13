import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/api.interfaces';


@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate() {
        return this.authService.getCurrentUser().pipe(
            map((user: User) => user.is_admin)
        )
    }
}
