import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '@entities/user-profile';

/**
 * Service for managing user profile data retrieval.
 * Provides access to the current authenticated user's detailed information.
 */
@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    /** Reactive HTTP client for API communication */
    private http = inject(HttpClient);

    /** Base API endpoint for user profile operations */
    private readonly API_URL = '/api/user-profile';

    /**
     * Fetches the profile data for the currently authenticated user.
     * @returns An Observable of the UserProfile
     */
    getProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(this.API_URL);
    }
}
