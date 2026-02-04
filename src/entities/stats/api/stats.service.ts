import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStat } from '../model/types';

@Injectable({
    providedIn: 'root'
})
export class StatsApiService {
    private http = inject(HttpClient);
    private baseUrl = '/api/admin/stats';

    getStats(): Observable<DashboardStat[]> {
        return this.http.get<DashboardStat[]>(this.baseUrl);
    }
}
