import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/api.interfaces';


@Injectable()
export class DataEngineerGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate() {
        // TODO: implement logic for determining if user is data engineer for specific program or project

        return this.authService.getCurrentUser().pipe(
            map((user: User) => user.is_admin || user.is_data_engineer)
        )
    }
}
