import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private logger: LoggerService) {}

  public init() {
    localStorage.getItem('isAuth') && this.isLoggedIn.next(true);
    this.logger.debug('init AuthService');
  }

  public login() {
    this.logger.info('login');
    this.isLoggedIn.next(true);
    localStorage.setItem('isAuth', 'true');
  }

  public logout() {
    this.logger.info('logout');
    this.isLoggedIn.next(false);
    localStorage.removeItem('isAuth');
  }
}
