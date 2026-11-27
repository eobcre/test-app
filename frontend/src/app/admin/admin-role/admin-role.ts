import { Component, inject, OnInit, signal } from '@angular/core';

import { UserManagement } from '../user-management/user-management';
import { Permissions } from '../permissions/permissions';

import { UserService, User } from '../../services/users';

@Component({
  selector: 'app-admin-role',
  imports: [UserManagement, Permissions],
  templateUrl: './admin-role.html',
  styleUrl: './admin-role.css',
})
export class AdminRole implements OnInit {
  // signal
  users = signal<User[]>([]);

  // tabs
  adminTab: 'user-management' | 'permissions' = 'user-management';

  private userService = inject(UserService);

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users.set(res.users);
        // console.log('res', res);
      },
      error: (error) => {
        console.error('Users API error...', error);
      },
    });
  }
}
