import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApprovalObject} from '../utils/model/approval-object';

@Injectable()
export class AccountService {

  constructor(private httpClient: HttpClient) {}

  getAccounts() {
    return this.httpClient.get(`${environment.apiBaseUrl}/accounts`);
  }

  getAccountById(id: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/accounts/${id}`);
  }

  fetchAccountDetails(accountNumber: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/accounts/number/${accountNumber}/api`);
  }

  createAccount(accountNumber: string) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/accounts/number/${accountNumber}`, {});
  }

  approveAccount(id: number, approval: ApprovalObject) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/accounts/${id}/approve`, approval);
  }
}
