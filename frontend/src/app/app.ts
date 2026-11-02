import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Login } from './router-outlet/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Login],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('test-app');
}
