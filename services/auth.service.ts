import { Injectable } from '@angular/core';

@Injectable()
export abstract class AuthService {
    public abstract getAuthToken(): string;

    public abstract login(username: string, password: string);

    public abstract logout();

    public abstract isLoggedIn(): boolean;
}
