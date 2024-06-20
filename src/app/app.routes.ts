import { Routes } from '@angular/router';
import { authRoutes } from './pages/auth/auth.routes';
import { dashboardRoutes } from './pages/dashboard/dashboard.routes';
import { authGuard } from './shared/guards/auth.guard';
import { verifyTokenGuard } from './shared/guards/verify-token.guard';

export const routes: Routes = [
    {
        path: "auth",
        loadComponent: () => import("./pages/auth/auth.component").then(c => c.AuthComponent),
        children: authRoutes,
        canActivate: [verifyTokenGuard]
    },
    {
        path: "dashboard",
        loadComponent: () => import("./pages/dashboard/dashboard.component").then(c => c.DashboardComponent),
        children: dashboardRoutes,
        canActivate: [authGuard]

    },
    {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full"
    }
    // TODO: Implementar un pagina not-found
];
