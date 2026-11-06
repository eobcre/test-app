import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { Button } from '../../components/button/button';

import { LoginService } from '../../services/login';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  // signal
  errorMessage = signal<string>('');

  // api
  private loginService = inject(LoginService);
  private router = inject(Router);
  private authService = inject(AuthService);

  onLoginInputChange(value: string) {
    // console.log(value);
    this.errorMessage.set('');
  }

  onLogin() {
    // console.log('Login button clicked');

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    if (!email || !password) {
      console.error('Email and password are required...');
      return;
    }

    this.loginService.loginApi(email, password).subscribe({
      next: (res) => {
        console.log(res);
        this.authService.setAuthenticated(true);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login API call failed...', error);
        this.errorMessage.set('Invalid email or password. Please try again.');
      },
    });
  }
}
