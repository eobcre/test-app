import { Component, output } from '@angular/core';

import { Button } from '../button/button';

@Component({
  selector: 'app-dropdown',
  imports: [Button],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  clicked = output<void>();
}
