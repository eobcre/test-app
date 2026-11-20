import { Component } from '@angular/core';

import { AdminPermissonsGrid } from '../../components/admin-permissons-grid/admin-permissons-grid';

@Component({
  selector: 'app-permissions',
  imports: [AdminPermissonsGrid],
  templateUrl: './permissions.html',
  styleUrl: './permissions.css',
})
export class Permissions {}
