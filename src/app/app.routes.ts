import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/convite/convite.component').then(m => m.ConviteComponent),
  },
  {
    path: 'cha-casa',
    loadComponent: () =>
      import('./pages/cha-casa/cha-casa.component').then(m => m.ChaCasaComponent),
  },
  {
    path: 'lista-de-presentes',
    loadComponent: () =>
      import('./pages/lista-presentes/lista-presentes.component').then(
        m => m.ListaPresentesComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
