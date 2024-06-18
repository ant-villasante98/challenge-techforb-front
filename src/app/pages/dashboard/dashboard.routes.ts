import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: "monitoring",
        loadComponent: () => import("./pages/monitoring/monitoring.component").then(c => c.MonitoringComponent),
        data: {
            title: "Monitoreo global"
        }
    },
    {
        path: "plant",
        loadComponent: () => import("./pages/m-plant/m-plant.component").then(c => c.MPlantComponent),
        data: {
            title: "Monitoreo de planta"
        }
    },
    {
        path: "sensor",
        loadComponent: () => import("./pages/m-sensor/m-sensor.component").then(c => c.MSensorComponent),
        data: {
            title: "Sensores"
        }
    },
    {
        path: "plant-history",
        loadComponent: () => import("./pages/plant-history/plant-history.component").then(c => c.PlantHistoryComponent),
        data: {
            title: "Historial de plantas"
        }
    },
    {
        path: "",
        redirectTo: "monitoring",
        pathMatch: "full"
    }
]