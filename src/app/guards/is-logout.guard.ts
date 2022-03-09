import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLogoutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLogin.pipe(
      take(1),
      tap((isLogin) => isLogin && this.router.navigate(['/'])),
      map((isLogin) => !isLogin),
      tap((isLogin) => console.log('IsLogoutGuard', isLogin))
    );
  }
}
