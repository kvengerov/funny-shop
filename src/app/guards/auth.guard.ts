import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { SessionService } from '@entities/session';

export const authGuard: CanActivateFn = () => {
    const sessionService = inject(SessionService);
    const router = inject(Router);

    if (sessionService.isAuth()) {
        return true;
    }

    return router.parseUrl('/login');
};
