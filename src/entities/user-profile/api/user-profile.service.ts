import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../model/user-profile.model';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private http = inject(HttpClient);
    private readonly API_URL = '/api/user-profile';

    getProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(this.API_URL);
    }
}
