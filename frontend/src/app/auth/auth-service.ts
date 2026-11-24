import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
}

interface Response {
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private loggedIn = signal(false);
  private currentUser = signal<User | null>(null);

  isAuthenticated() {
    return this.loggedIn();
  }

  // get user info
  readonly user = this.currentUser.asReadonly();

  // check auth
  async checkAuth(): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.http.get<Response>(`${environment.apiUrl}/api/login/me`, { withCredentials: true }),
      );

      console.log('res', res);

      this.loggedIn.set(true);
      this.currentUser.set(res.user);
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
