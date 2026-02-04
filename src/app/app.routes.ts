import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    // Placeholder for products route
    { path: 'products', component: Home }
];
