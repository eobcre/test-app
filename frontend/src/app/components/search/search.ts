import { Component } from '@angular/core';
import { input, output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  onSearch = output<string>();

  errorMessage = input('');

  // onChange = output<void>();
  onChange = output<string>();

  // onInputChange(value: string) {
  //   console.log(value);
  // }
}
