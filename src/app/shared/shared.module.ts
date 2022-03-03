import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GetLocationComponent } from './components/get-location/get-location.component';

@NgModule({
  declarations: [GetLocationComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    GetLocationComponent,
  ],
})
export class SharedModule {}
