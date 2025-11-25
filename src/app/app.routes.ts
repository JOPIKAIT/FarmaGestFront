import { Routes } from '@angular/router';
import { LoginComponent } from './system/feature/security/login/login.component';
import { MainComponent } from './system/shared/components/main/main.component';
import { DashboardComponent } from './system/feature/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'farmagest/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: LoginComponent,
    },
    {
        path: 'farmagest',
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                //canActivate: [authGuard],
            },
        ]
    }
];
