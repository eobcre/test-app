import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private loggedIn = signal(false);

  isAuthenticated() {
    return this.loggedIn();
  }

  async checkAuth(): Promise<boolean> {
    try {
      await firstValueFrom(
        this.http.get(`${environment.apiUrl}/api/login/me`, { withCredentials: true }),
      );

      this.loggedIn.set(true);
      return true;
    } catch {
      this.loggedIn.set(false);
      return false;
    }
  }

  // log out
  async logout(): Promise<void> {
    await firstValueFrom(
      this.http.post(`${environment.apiUrl}/api/login/logout`, {}, { withCredentials: true }),
    );
    this.loggedIn.set(false);
  }
}
