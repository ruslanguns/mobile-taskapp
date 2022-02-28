import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TareaPage } from './tarea/tarea.page';

import { TareasPage } from './tareas.page';

const routes: Routes = [
  {
    path: '',
    component: TareasPage,
  },
  {
    path: 'tarea',
    component: TareaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasPageRoutingModule {}
