import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export interface LoginType {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);

  // login api
  loginApi(email: string) {
    return this.http.get<LoginType>(`${environment.apiUrl}/api/login`, {
      params: { email },
    });
  }
}
