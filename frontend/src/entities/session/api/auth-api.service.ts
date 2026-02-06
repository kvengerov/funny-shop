import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserProfile } from '@entities/user-profile';
import { SessionService } from '@entities/session';

/**
 * Service for authentication operations (login, register).
 * Interacts with the backend auth endpoints and synchronizes the session state.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    /** Reactive HTTP client for making API requests */
    private http = inject(HttpClient);

    /** Local session management service */
    private sessionService = inject(SessionService);

    /** Base API endpoint for authentication */
    private readonly API_URL = '/api/auth';

    /**
     * Authenticates a user with the provided credentials.
     * On success, updates the local session state.
     * @param credentials User login data (username and optional password)
     * @returns An Observable of the authenticated UserProfile
     */
    login(credentials: { username: string; password?: string }): Observable<UserProfile> {
        return this.http.post<UserProfile>(`${this.API_URL}/login`, credentials).pipe(
            tap(user => this.sessionService.setUser(user))
        );
    }

    /**
     * Registers a new user with the provided data.
     * On success, automatically logs the user in and updates the session.
     * @param userData Data for creating the new user account
     * @returns An Observable of the newly created UserProfile
     */
    register(userData: Partial<UserProfile>): Observable<UserProfile> {
        return this.http.post<UserProfile>(`${this.API_URL}/register`, userData).pipe(
            tap(user => this.sessionService.setUser(user))
        );
    }
}
