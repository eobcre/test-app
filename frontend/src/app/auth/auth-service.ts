import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = signal(false);

  isAuthenticated() {
    return this.loggedIn();
  }

  setAuthenticated(value: boolean) {
    this.loggedIn.set(value);
  }

  logout() {
    this.loggedIn.set(false);
  }
}
