import { Component, inject, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { HospitalService, type HospitalType, type HospitalPageType } from '../../services/hospital';

import { Search } from '../../components/search/search';
import { DbGrid } from '../../components/db-grid/db-grid';
import { DbEdit } from '../../components/db-edit/db-edit';
import { Pagination } from '../../components/pagination/pagination';

@Component({
  selector: 'app-db-search',
  imports: [Search, DbGrid, DbEdit, Pagination],
  templateUrl: './db-search.html',
  styleUrl: './db-search.css',
})
export class DbSearch {
  // signal
  hospitals = signal<HospitalType[]>([]);
  searchCompleted = signal(false);
  errorMessage = signal('');
  currentPage = signal(1);
  pageSize = signal(10);
  total = signal(0);

  // tabs
  activeTab: 'search' | 'edit' = 'search';

  // api
  private hospitalService = inject(HospitalService);

  // debouce
  private searchTerms = new Subject<string>();

  // initial exec
  constructor() {
    this.searchTerms.pipe(debounceTime(300), distinctUntilChanged()).subscribe({
      next: (value) => {
        this.onSearch(value);
      },
      error: (error) => {
        console.error('searchTerms error...', error);
      },
    });
  }

  onInputChange(value: string) {
    // console.log(value);

    this.searchTerms.next(value);
    this.errorMessage.set('');
  }

  // search
  onSearch(value: string) {
    const searchTerm = value.trim();

    if (!searchTerm) {
      this.errorMessage.set('* Please enter something');
      return;
    }

    this.errorMessage.set('');
    this.searchCompleted.set(false);

    this.hospitalService.searchApi(searchTerm, this.currentPage(), this.pageSize()).subscribe({
      next: (data) => {
        console.log(data);
        this.hospitals.set(data.items);
        this.total.set(data.total);
        this.currentPage.set(data.page);
        this.searchCompleted.set(true);
      },
      error: (error) => {
        console.error('Search API call failed...', error);
        // console.log('Status:', error.status);
        // console.log('URL:', error.url);
        // console.log('Error:', error.error);
      },
    });
  }
}
