import { Routes } from '@angular/router';
import {canActivate,redirectUnauthorizedTo,redirectLoggedInTo } from "@angular/fire/auth-guard"

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: "login",
        loadComponent: () => import("./componentes/login/login.component"),
        ...canActivate(()=> redirectLoggedInTo(['/home'])), 
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
        ...canActivate(()=> redirectLoggedInTo(['/home'])),
    },
    {
        path: 'ahorcado', 
        loadComponent: () => import("./componentes/juegos/ahorcado/ahorcado.component")
    },
    {
        path: 'mayormenor', 
        loadComponent: () => import("./componentes/juegos/mayormenor/mayormenor.component")
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