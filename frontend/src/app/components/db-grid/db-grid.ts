import { Component } from '@angular/core';
import { input } from '@angular/core';

import type { HospitalType } from '../../services/hospital';

@Component({
  selector: 'app-db-grid',
  imports: [],
  templateUrl: './db-grid.html',
  styleUrl: './db-grid.css',
})
export class DbGrid {
  hospitals = input<HospitalType[]>([]);
  searchCompleted = input(false);
}
