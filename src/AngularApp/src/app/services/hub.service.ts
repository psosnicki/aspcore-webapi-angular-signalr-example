import { Subject, interval, take, finalize } from 'rxjs';
import * as signalR from '@microsoft/signalr';

export interface HubConfig {
  hubUrl: string,
  reconnect: {
    retryIntervalInSeconds: number
  }
}

export class HubService {

  updates$: Subject<any> = new Subject<any>();
  status$: Subject<ConnectionInfo> = new Subject<ConnectionInfo>();

  private connection: signalR.HubConnection;

  constructor(private config: HubConfig) {
    this.connection = new signalR.HubConnectionBuilder().withUrl(config.hubUrl).build();
    this.connection.on('update', (data) => {
      this.updates$.next(data);
    });

    this.connection.onclose(async () => {
      this.status$.next({ status: ConnectionStatus.Closed, message: 'Connection closed' });
      await this.connect();
    });

    this.connection.onreconnected(() => {
      this.status$.next({ status: ConnectionStatus.Connected, message: this.connection.baseUrl });

    });
  }

  async connect() {

    try {
      this.status$.next({ status: ConnectionStatus.Pending, message: `Trying to connect to hub ${this.connection.baseUrl}...` });
      await this.connection.start();
      this.status$.next({ status: ConnectionStatus.Connected, message: `Connected to hub ${this.connection.baseUrl}` });
    }
    catch (error) {
      console.log(error);
      this.status$.next({ status: ConnectionStatus.Error, message: `Unable to connect to hub ${this.connection.baseUrl} singalr hub. Make sure that backend api is running` });
      interval(1000).pipe(take(this.config.reconnect.retryIntervalInSeconds), finalize(async () => {
        await this.connect();
      })).pipe().subscribe(x => {
        this.status$.next({ status: ConnectionStatus.Pending, message: `Reconnecting in ${this.config.reconnect.retryIntervalInSeconds - x} seconds....` });
      });

    }
  }
}

export interface ConnectionInfo {
  message: string;
  status: ConnectionStatus;
}

export enum ConnectionStatus {
  Connected = "Connected",
  Pending = "Connecting",
  Disconnected = "Disconnected",
  Error = "Error",
  Closed = "Closed"
}