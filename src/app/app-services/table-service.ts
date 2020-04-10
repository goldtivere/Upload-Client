import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class TableService {

  constructor(private httpClient: HttpClient) {}

  create(data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/tables`, data);
  }

  getTables() {
    return this.httpClient.get(`${environment.apiBaseUrl}/tables`);
  }

  getById(id: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/tables/${id}`);
  }
}
