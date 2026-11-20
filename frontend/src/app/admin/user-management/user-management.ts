import { Component } from '@angular/core';

import { AdminGrid } from '../../components/admin-grid/admin-grid';

import { Button } from '../../components/button/button';

@Component({
  selector: 'app-user-management',
  imports: [AdminGrid, Button],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {}
