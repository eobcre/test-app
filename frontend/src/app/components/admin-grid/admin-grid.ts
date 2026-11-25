import { Component } from '@angular/core';
import { Button } from '../button/button';
import { Dropdown } from '../dropdown/dropdown';

@Component({
  selector: 'app-admin-grid',
  imports: [Button, Dropdown],
  templateUrl: './admin-grid.html',
  styleUrl: './admin-grid.css',
})
export class AdminGrid {
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onRemoveUser(): void {
    this.isDropdownOpen = false;
  }
}
