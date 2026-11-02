import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  type = input<'button' | 'submit'>('button');
  buttonClass = input<string>('');
  clicked = output<void>();
  disabled = input(false);
}
