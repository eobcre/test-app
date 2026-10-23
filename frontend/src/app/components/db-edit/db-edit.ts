import { Component, input, inject, signal } from '@angular/core';

import { Button } from '../button/button';

import { HospitalService, type HospitalType } from '../../services/hospital';

@Component({
  selector: 'app-db-edit',
  imports: [Button],
  templateUrl: './db-edit.html',
  styleUrl: './db-edit.css',
})
export class DbEdit {
  hospitals = input<HospitalType[]>([]);
  searchCompleted = input(false);
  editable = input(false);

  editingId = signal<number | null>(null);
  draftName = signal('');
  draftAddress = signal('');
  draftCity = signal('');
  draftState = signal('');
  draftPostcode = signal('');
  draftPhone = signal('');

  // api
  private hospitalService = inject(HospitalService);

  // edit
  onEdit(hospital: HospitalType) {
    this.draftName.set(hospital.name);
    this.draftAddress.set(hospital.address);
    this.draftCity.set(hospital.city);
    this.draftState.set(hospital.state);
    this.draftPostcode.set(hospital.postcode);
    this.draftPhone.set(hospital.phone);

    this.editingId.set(hospital.id);
    // console.log('Clicked ID:', hospital.id);
    // console.log('onEdit is clicked!');
    // console.log('hospital', hospital);
  }

  // save
  onSave(id: number) {
    const changes = {
      name: this.draftName(),
      address: this.draftAddress(),
      city: this.draftCity(),
      state: this.draftState(),
      postcode: this.draftPostcode(),
      phone: this.draftPhone(),
    };

    this.hospitalService.saveApi(id, changes).subscribe({
      next: (hospital) => {
        console.log(hospital);
      },
      error: (error) => {
        console.error('Save API call failed...', error);
      },
    });
  }
}
