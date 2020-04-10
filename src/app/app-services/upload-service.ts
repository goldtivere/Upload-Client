import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Serializable} from '../utils/serializable';
import {ApprovalObject} from '../utils/model/approval-object';

@Injectable()
export class UploadService {

  constructor(private httpClient: HttpClient) {}

  getUploads(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/uploads?${queryString}`);
  }

  getUploadById(id: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/uploads/${id}`);
  }

  uploadFiles(taskId: number, files: File[]) {
    const formData = new FormData();
    formData.append('file', files[0]);
    if (files.length > 1) {
      formData.append('file', files[1]);
    }
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/uploads/tasks/${taskId}/files`, formData);
  }

  downloadFile(id: number, upload: boolean) {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return this.httpClient.get(`${environment.apiBaseUrl}/uploads/${id}/download/${upload}`,
      {['responseType']: 'arraybuffer'});
  }

  downloadFileName(name: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return this.httpClient.get(`${environment.apiBaseUrl}/uploads/download/${name}`,
      {['responseType']: 'arraybuffer'});
  }

  approveUpload(id: number, approval: ApprovalObject) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/uploads/${id}/approve`, approval);
  }
}
