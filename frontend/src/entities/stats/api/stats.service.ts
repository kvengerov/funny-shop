import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStat } from '@entities/stats';

/**
 * Service for fetching administrative dashboard statistics.
 * Provides data about revenue, users, and overall shop performance.
 */
@Injectable({
    providedIn: 'root'
})
export class StatsApiService {
    /** Reactive HTTP client for API requests */
    private http = inject(HttpClient);

    /** Base URL for statistics endpoints */
    private baseUrl = '/api/admin/stats';

    /**
     * Retrieves the current dashboard metrics from the server.
     * @returns An Observable of DashboardStat items
     */
    getStats(): Observable<DashboardStat[]> {
        return this.http.get<DashboardStat[]>(this.baseUrl);
    }
}
