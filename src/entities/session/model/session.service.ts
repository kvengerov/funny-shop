import { Injectable, signal, computed } from '@angular/core';
import { UserProfile } from '@entities/user-profile';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private readonly _currentUser = signal<UserProfile | null>(this.loadUser());

    readonly currentUser = this._currentUser.asReadonly();
    readonly isAuth = computed(() => !!this._currentUser());
    readonly isAdmin = computed(() => this._currentUser()?.role === 'admin');
    readonly isManager = computed(() => this._currentUser()?.role === 'manager');
    readonly isAdminOrManager = computed(() => this.isAdmin() || this.isManager());

    setUser(user: UserProfile) {
        this._currentUser.set(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        this._currentUser.set(null);
        localStorage.removeItem('user');
    }

    private loadUser(): UserProfile | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}
