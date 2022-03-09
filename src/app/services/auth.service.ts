import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { map, tap, pluck, distinctUntilChanged } from 'rxjs/operators';
import { IS_LOGIN_TOKEN } from '../constants';
import { StorageService } from './store.service';

type AuthState = {
  user: { email: string };
  isLogin: boolean;
};

const initialState: AuthState = {
  user: null,
  isLogin: false,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subject = new BehaviorSubject<AuthState>(null);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  constructor(private storeService: StorageService) {}

  get user() {
    return this.store.pipe(pluck('user'));
  }

  get isLogin() {
    return this.store.pipe(pluck('isLogin'));
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

    this.storeService.set(IS_LOGIN_TOKEN, false);
  }

  async setup() {
    const isLogin = await this.storeService.get<boolean>(IS_LOGIN_TOKEN);
    this.subject.next({
      ...this.subject.value,
      isLogin,
    });
  }
}
