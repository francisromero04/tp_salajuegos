import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: "login",
        loadComponent: () => import("./componentes/login/login.component"), 
    },
    {
        path: "home",
        loadComponent: () => import("./componentes/home/home.component"), //al momento de cargar el componente/ruta, se importa
    },
    {
        path: "quiensoy", 
        loadComponent: () => import("./componentes/quien-soy/quien-soy.component"),
    },
    {
        path: "error",
        loadComponent: () => import("./componentes/error/error.component"),
    },
    {
        path: "registro",
        loadComponent: () => import("./componentes/registro/registro.component"),
    },
    {
        path: "chat",
        loadComponent: () => import("./componentes/chat/chat.component"),
    },
    {
        path: "**", //¿estoy en cualquier ruta?
        redirectTo: 'error',    
    }
];
