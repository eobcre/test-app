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

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private http = inject(HttpClient);

  // search api
  searchApi(searchTerm: string) {
    return this.http.get<HospitalType[]>(`${environment.apiUrl}/api/hospitals`, {
      params: { search: searchTerm },
    });
  }

  // save api
  saveApi(id: number, changes: Partial<Omit<HospitalType, 'id'>>) {
    return this.http.patch<HospitalType>(`${environment.apiUrl}/api/hospitals/${id}`, changes);
  }
}
