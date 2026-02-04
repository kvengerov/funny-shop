import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@pages/home').then(m => m.HomePageComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('@pages/products').then(m => m.ProductsPageComponent)
    }
];
