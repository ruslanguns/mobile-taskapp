import { NgModule } from '@angular/core';

import { AjustesPageRoutingModule } from './ajustes-routing.module';

import { AjustesPage } from './ajustes.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, AjustesPageRoutingModule],
  declarations: [AjustesPage],
})
export class AjustesPageModule {}
