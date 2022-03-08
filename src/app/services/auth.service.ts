import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { map, tap, pluck } from 'rxjs/operators';
import { IS_LOGIN_TOKEN } from '../constants';
import { StorageService } from './store.service';

type AuthState = {
  user: {
    email: string;
  };
  isLogin: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subject = new BehaviorSubject<AuthState>({
    isLogin: false,
    user: null,
  });

  private store$ = this.subject.asObservable().pipe(
    tap((data) => {
      console.log('Ha cambiado', data);
    })
  );

  constructor(private storeService: StorageService) {
    // this.store.get<boolean>(IS_LOGIN_TOKEN).then((isLogin) => {
    //   this.state.next({
    //     ...this.state.value,
    //     isLogin: !!isLogin,
    //   });
    //   console.log(this.state.value);
    // });
    this.subject.next({
      ...this.subject.value,
      isLogin: true,
    });
  }

  get user() {
    return this.store$.pipe(pluck('user'));
  }

  get isLogin() {
    return this.store$.pipe(pluck('isLogin'));
  }

  /**
   * Fake login()
   */
  login(email: string, password: string) {
    if (email === 'demo@demo' && password === 'password') {
      this.subject.next({
        isLogin: true,
        user: {
          email,
        },
      });

      this.storeService.set(IS_LOGIN_TOKEN, true);

      return of({
        user: { email },
        message: 'Login satisfactorio',
      });
    }
    return throwError({
      user: null,
      message: 'Login incorrecto, credenciales erroneas',
    });
  }

  /**
   * Fake logout()
   */
  logout() {
    this.subject.next({
      ...this.subject.value,
      isLogin: false,
      user: null,
    });

    console.log(this.subject.value);

    this.storeService.set(IS_LOGIN_TOKEN, false);
  }
}
