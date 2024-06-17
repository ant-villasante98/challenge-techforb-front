import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: "monitoring",
        loadComponent: () => import("./pages/monitoring/monitoring.component").then(c => c.MonitoringComponent)
    },
    {
        path: "plant",
        loadComponent: () => import("./pages/m-plant/m-plant.component").then(c => c.MPlantComponent)
    },
    {
        path: "sensor",
        loadComponent: () => import("./pages/m-sensor/m-sensor.component").then(c => c.MSensorComponent)
    },
    {
        path: "plant-history",
        loadComponent: () => import("./pages/plant-history/plant-history.component").then(c => c.PlantHistoryComponent)
    },
    {
        path: "",
        redirectTo: "monitoring",
        pathMatch: "full"
    }
]