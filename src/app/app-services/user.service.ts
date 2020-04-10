import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Serializable} from '../utils/serializable';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getUsers(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/users?${queryString}`);
  }

  getByParam(q: any) {
    if (!q) { q = ''; } else if (typeof q === 'object') {q = q['email']; }
    return this.httpClient.get(`${environment.apiBaseUrl}/users/params?q=${q}`);
  }

  createUser(data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/users/roles/${data['roleName']}`, data);
  }
  createPassword(data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/users/password/new`, data);
  }
  editUser(id: number, data) {
    return this.httpClient.put<any>(`${environment.apiBaseUrl}/users/${id}`, data);
  }

  approveUser(id: number, data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/users/${id}/approve`, data);
  }

  resetPassword(email: String) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/users/password/reset/${email}`, {});
  }

  forgotPassword(email: String) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/users/password/forgot/${email}`, {});
  }

  changePassword(data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/users/password`, data);
  }

  getAllHomeData() {
    return this.httpClient.get(`${environment.apiBaseUrl}/home`);
  }

  getMerchantHomeData(id: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/home/merchants/${id}`);
  }

  getOrganizationHomeData(id: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/home/organizations/${id}`);
  }

  getDistributorHomeData(id: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/home/distributors/${id}`);
  }

  getUsersByRole(role: any) {
    return this.httpClient.get(`${environment.apiBaseUrl}/users/roles/${role}`);
  }
}
