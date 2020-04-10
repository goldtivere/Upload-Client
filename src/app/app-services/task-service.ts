import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) {}

  getTasks() {
    return this.httpClient.get(`${environment.apiBaseUrl}/tasks`);
  }

  getTaskById(id: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/tasks/${id}`);
  }

  getTasksByScheduleId(scheduleId: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/tasks/schedules/${scheduleId}`);
  }

  createTask(scheduleId: number, connectionId: number, tableId: number, accountId: number,  data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/tasks/schedules/${scheduleId}/connections/${connectionId}/tables/${tableId}/accounts/${accountId}`, data);
  }

  editTask(id: number, scheduleId: number, connectionId: number, tableId: number, accountId: number, data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/tasks/${id}/schedules/${scheduleId}/connections/${connectionId}/tables/${tableId}/accounts/${accountId}`, data);
  }

  processTask(taskId: number) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/tasks/${taskId}/process`, {});
  }
}
