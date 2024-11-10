import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  hubConnection: signalR.HubConnection;
  constructor() { 
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7219/saleHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }) // SignalR hub URL
      .build();
  }
  startConnection = () => {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection established with SignalR hub');
        })
        .catch((error) => {
          console.error('Error connecting to SignalR hub:', error);
        });
  }

  subscribeMessage(key: string): Observable<string> {
    console.log('Started subscribing for key' + key);
    return new Observable<string>((observer) => {
      this.hubConnection.on(key, (message: string) => {
        observer.next(message);
      });
    });
  }
  
}
