import { Component } from '@angular/core';
import { AdminGrid } from '../../components/admin-grid/admin-grid';

@Component({
  selector: 'app-user-management',
  imports: [AdminGrid],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {}
