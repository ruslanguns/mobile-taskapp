import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TareasPageRoutingModule } from './tareas-routing.module';

import { TareasPage } from './tareas.page';
import { TareaPage } from './tarea/tarea.page';

@NgModule({
  imports: [SharedModule, TareasPageRoutingModule],
  declarations: [TareasPage, TareaPage],
})
export class TareasPageModule {}
