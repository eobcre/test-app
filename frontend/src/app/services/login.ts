import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export interface LoginRequestType {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);

  // login api
  loginApi(email: string, password: string) {
    const body = { email, password };

    return this.http.post<LoginRequestType>(`${environment.apiUrl}/api/login`, body);
  }
}
