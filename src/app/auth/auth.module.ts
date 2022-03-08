import { NgModule } from '@angular/core';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [SharedModule, AuthPageRoutingModule],
  declarations: [AuthPage, LoginComponent],
})
export class AuthPageModule {}
