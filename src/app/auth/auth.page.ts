import { Component, OnInit } from '@angular/core';

@Component({
  template: `<ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>`,
})
export class AuthPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
