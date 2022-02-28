import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tareas',
        loadChildren: () =>
          import('../tareas/tareas.module').then((m) => m.TareasPageModule),
      },
      {
        path: 'autor',
        loadChildren: () =>
          import('../autor/autor.module').then((m) => m.AutorPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/tareas',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tareas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
