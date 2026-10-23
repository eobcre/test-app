import { Component, signal, inject, OnInit } from '@angular/core';
import { MessageService, type Message } from '../../services/message';

@Component({
  selector: 'app-api-page',
  imports: [],
  templateUrl: './api-page.html',
  styleUrl: './api-page.css',
})
export class ApiPage {
  private messageService = inject(MessageService);

  messages = signal<Message[]>([]);
  isLoading = signal(true);
  error = signal('');

  ngOnInit() {
    this.messageService.getMessages().subscribe({
      next: (data) => {
        console.log('API:', data);

        this.messages.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Message delivery failed...');
        this.isLoading.set(false);
      },
    });
  }
}
