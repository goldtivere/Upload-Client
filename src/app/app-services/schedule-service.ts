import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Serializable} from '../utils/serializable';
import {ApprovalObject} from '../utils/model/approval-object';

@Injectable()
export class ScheduleService {

  constructor(private httpClient: HttpClient) {}

  getSchedules() {
    return this.httpClient.get(`${environment.apiBaseUrl}/schedules`);
  }

  getScheduleById(id: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/schedules/${id}`);
  }

  createSchedule(data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/schedules`, data);
  }

  editSchedule(id: number, data) {
    return this.httpClient.put<any>(`${environment.apiBaseUrl}/schedules/${id}`, data);
  }
}
