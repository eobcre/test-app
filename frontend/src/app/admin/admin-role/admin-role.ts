import { Component } from '@angular/core';

import { UserManagement } from '../user-management/user-management';
import { Permissions } from '../permissions/permissions';

@Component({
  selector: 'app-admin-role',
  imports: [UserManagement, Permissions],
  templateUrl: './admin-role.html',
  styleUrl: './admin-role.css',
})
export class AdminRole {
  // tabs
  adminTab: 'user-management' | 'permissions' = 'user-management';
}
