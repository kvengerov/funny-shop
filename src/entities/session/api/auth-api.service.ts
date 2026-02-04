import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserProfile } from '@entities/user-profile';
import { SessionService } from '../model/session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private http = inject(HttpClient);
    private sessionService = inject(SessionService);
    private readonly API_URL = '/api/auth';

    login(credentials: { username: string; password?: string }): Observable<UserProfile> {
        return this.http.post<UserProfile>(`${this.API_URL}/login`, credentials).pipe(
            tap(user => this.sessionService.setUser(user))
        );
    }

    register(userData: Partial<UserProfile>): Observable<UserProfile> {
        return this.http.post<UserProfile>(`${this.API_URL}/register`, userData).pipe(
            tap(user => this.sessionService.setUser(user))
        );
    }
}
