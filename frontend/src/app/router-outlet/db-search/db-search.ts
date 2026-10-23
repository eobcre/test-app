import { Component, inject, signal } from '@angular/core';
import { HospitalService, type HospitalType } from '../../services/hospital';

import { Search } from '../../components/search/search';
import { DbGrid } from '../../components/db-grid/db-grid';
import { DbEdit } from '../../components/db-edit/db-edit';

@Component({
  selector: 'app-db-search',
  imports: [Search, DbGrid, DbEdit],
  templateUrl: './db-search.html',
  styleUrl: './db-search.css',
})
export class DbSearch {
  // hospitals = [
  //   {
  //     id: 1,
  //     name: 'UPMC Rochester',
  //     address: 'N/A',
  //     city: 'N/A',
  //     state: 'PA',
  //     postcode: '15009',
  //     phone: 'N/A',
  //   },
  //   {
  //     id: 2,
  //     name: 'UPMC Pittsburgh',
  //     address: 'N/A',
  //     city: 'N/A',
  //     postcode: 'N/A',
  //     state: 'PA',
  //     phone: 'N/A',
  //   },
  // ];

  // signal
  hospitals = signal<HospitalType[]>([]);
  searchCompleted = signal(false);
  errorMessage = signal('');

  // tabs
  activeTab: 'search' | 'edit' = 'search';

  // api
  private hospitalService = inject(HospitalService);

  // onInputChange(value: string) {
  //   console.log(value);
  // }

  onSearch(value: string) {
    const searchTerm = value.trim();

    if (!searchTerm) {
      this.errorMessage.set('* Please enter something');
      return;
    }

    this.errorMessage.set('');
    this.searchCompleted.set(false);

    this.hospitalService.searchApi(searchTerm).subscribe({
      next: (data) => {
        console.log(data);
        this.hospitals.set(data);
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
