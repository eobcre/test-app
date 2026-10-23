import { Component, signal } from '@angular/core';
import { USERS } from '../../../data/data.js';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  users = signal(USERS);
}
