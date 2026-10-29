import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export interface HospitalType {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
}

export interface HospitalPageType {
  items: HospitalType[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private http = inject(HttpClient);

  // search api
  searchApi(searchTerm: string, page: number, pageSize: number) {
    return this.http.get<HospitalPageType>(`${environment.apiUrl}/api/hospitals`, {
      params: { search: searchTerm, page, pageSize },
    });
  }

  // save api
  saveApi(id: number, changes: Partial<Omit<HospitalType, 'id'>>) {
    return this.http.patch<HospitalType>(`${environment.apiUrl}/api/hospitals/${id}`, changes);
  }
}
