import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../button/button';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, Button],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
