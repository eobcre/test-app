import { Component, computed, input, output } from '@angular/core';

import { Button } from '../button/button';

@Component({
  selector: 'app-pagination',
  imports: [Button],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  currentPage = input<number>(1);
  totalPages = input<number>(1);
  onChangePage = output<number>();
}
