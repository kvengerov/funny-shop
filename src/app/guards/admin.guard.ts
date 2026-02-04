import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { SessionService } from '@entities/session';

export const adminGuard: CanActivateFn = () => {
    const sessionService = inject(SessionService);
    const router = inject(Router);

    if (sessionService.isAdminOrManager()) {
        return true;
    }

    // If logged in but not admin/manager, go to home
    if (sessionService.isAuth()) {
        return router.parseUrl('/');
    }

    // If not logged in, go to login
    return router.parseUrl('/login');
};
