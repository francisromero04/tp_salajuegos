import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'ahorcado',
        loadComponent: () => import("./ahorcado/ahorcado.component")
    },
    {
        path: 'mayormenor',
        loadComponent: () => import("./mayormenor/mayormenor.component")
    },
    {
      path: 'preguntados',
      loadComponent: () => import("./preguntados/preguntados.component")
  },
];

export default routes; //tiene dentro rutas de mis juegos
