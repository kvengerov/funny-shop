import { Injectable, signal, computed } from '@angular/core';
import { UserProfile } from '@entities/user-profile';

/**
 * Service responsible for managing the user's authentication state and profile.
 * Persists session data to localStorage for persistence across page reloads.
 */
@Injectable({
    providedIn: 'root'
})
export class SessionService {
    /** Internal signal holding the current user profile or null if not authenticated */
    private readonly _currentUser = signal<UserProfile | null>(this.loadUser());

    /** Read-only view of the current user profile */
    readonly currentUser = this._currentUser.asReadonly();

    /** Computed state indicating if any user is currently authenticated */
    readonly isAuth = computed(() => !!this._currentUser());

    /** Computed state indicating if the current user has the 'admin' role */
    readonly isAdmin = computed(() => this._currentUser()?.role === 'admin');

    /** Computed state indicating if the current user has the 'manager' role */
    readonly isManager = computed(() => this._currentUser()?.role === 'manager');

    /** Computed state indicating if the current user has either 'admin' or 'manager' role */
    readonly isAdminOrManager = computed(() => this.isAdmin() || this.isManager());

    /**
     * Updates the current session with a new user profile.
     * Persists the profile to localStorage.
     * @param user The user profile to set as active session
     */
    setUser(user: UserProfile) {
        this._currentUser.set(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Terminates the current session and clears persisted data from localStorage.
     */
    logout() {
        this._currentUser.set(null);
        localStorage.removeItem('user');
    }

    /**
     * Attempts to retrieve and parse the user profile from localStorage.
     * Why: Provides session persistence across browser restarts.
     * @returns The parsed UserProfile or null if none exists or parsing fails
     */
    private loadUser(): UserProfile | null {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (e) {
            // Why: Handles cases where localStorage might contain invalid JSON
            console.error('Failed to load user session from localStorage', e);
            return null;
        }
    }
}
