import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Message {
  id: number;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);

  getMessages() {
    return this.http.get<Message[]>('http://localhost:3000/api/message');
  }
}
