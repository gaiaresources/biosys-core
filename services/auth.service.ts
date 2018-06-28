import { Injectable } from '@angular/core';
import { User } from '../interfaces/api.interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class AuthService {
    public abstract getAuthToken(): string;

    public abstract getCurrentUser(): Observable<User>;

    public abstract login(username: string, password: string);

    public abstract logout();

    public abstract isLoggedIn(): boolean;
}
