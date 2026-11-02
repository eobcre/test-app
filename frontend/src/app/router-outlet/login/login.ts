import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../../components/button/button';

import { LoginService, type LoginType } from '../../services/login';

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl(''),
  });

  // api
  private loginService = inject(LoginService);

  onLogin() {
    console.log('Login button clicked');

    const email = this.loginForm.controls.email.value;

    if (!email) {
      console.error('Email is required...');
      return;
    }

    this.loginService.loginApi(email).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.error('Login API call failed...', error);
      },
    });
  }
}
