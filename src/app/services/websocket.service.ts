import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private URL = 'http://localhost:3000';
  private socket: any;
  constructor() { 
  }

  connect() {
    this.socket = io(this.URL);
  }
  
  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

}
