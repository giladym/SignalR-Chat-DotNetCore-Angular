import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private hubConnection: HubConnection;
  title = 'app';
  nick = '';
  message = '';
  messages: string[] = [];

  ngOnInit() {
    this.setUserName();

    // Stream functionality
    this.hubConnection = this.configureStream();
    this.hubConnection.start()
    .then(() => {
      console.log('Connection Started');
    })
    .catch( err => console.error('Error while esteblishing connection : ', err));

    this.hubConnection.on('SendToAll', this.updateStream.bind(this));

    this.hubConnection.onclose(this.closeConnection.bind(this));
  }
  private setUserName(): void {
    this.nick = window.prompt('Your name: ' , 'Spiderman');
  }
  private configureStream(): HubConnection {
    const hubBuilder = new HubConnectionBuilder();
    return hubBuilder
            .withUrl(environment.api.chat) // 'http://localHost:5000/chat'
            .build();
  }
  private closeConnection(error): void {
    console.log('Connection Ended' , error);
  }

  private updateStream(nick:  string , receivedMessage: string): void {
    const text = `${nick}: ${receivedMessage}`;
    this.messages.push(text);
  }
  /**
     * sendMessage
     */
    public sendMessage(): void {
      this.hubConnection
      .send('SendToAll', this.nick , this.message)
      .catch( err => console.error('Send message failed :', err));
    }
}
