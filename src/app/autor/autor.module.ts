import { NgModule } from '@angular/core';
import { AutorPageRoutingModule } from './autor-routing.module';

import { AutorPage } from './autor.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, AutorPageRoutingModule],
  declarations: [AutorPage],
})
export class AutorPageModule {}
