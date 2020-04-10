import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class ConnectionService {

  constructor(private httpClient: HttpClient) {}

  getConnections() {
    return this.httpClient.get(`${environment.apiBaseUrl}/connections`);
  }

  getConnectionById(id: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/connections/${id}`);
  }

  createConnection(data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/connections`, data);
  }

  editConnection(id: number, data) {
    return this.httpClient.put<any>(`${environment.apiBaseUrl}/connections/${id}`, data);
  }
}
