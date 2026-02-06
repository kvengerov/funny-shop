import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@pages/home').then(m => m.HomePageComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('@pages/products').then(m => m.ProductsPageComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('@pages/login').then(m => m.LoginPageComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('@pages/register').then(m => m.RegisterPageComponent)
    },
    {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('@pages/admin').then(m => m.AdminPageComponent)
            },
            {
                path: 'products',
                loadComponent: () => import('@pages/admin').then(m => m.AdminPageComponent)
            },
            {
                path: 'customers',
                loadComponent: () => import('@pages/admin').then(m => m.AdminPageComponent)
            },
            {
                path: 'stats',
                loadComponent: () => import('@pages/admin').then(m => m.AdminPageComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('@pages/admin').then(m => m.AdminPageComponent)
            }
        ]
    }
];
