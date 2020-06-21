import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Serializable} from "../utils/serializable";

@Injectable()
export class AccountManagementService {
  constructor(private httpClient: HttpClient) {}
  getAccountBalance() {
    return this.httpClient.get(`${environment.apiBaseUrl}/acct/balance`);
  }

  getCompanyUsers() {
    return this.httpClient.get(`${environment.apiBaseUrl}/acct/companyusers`);
  }
  getCorporateCharge() {
    return this.httpClient.get(`${environment.apiBaseUrl}/acct/chargeCorporate`);
  }

  withdraw(data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/acct/withdraw`,data);
  }

  getTrxnReport(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/acct/reports/download?${queryString}`);
  }

  getTrxnReportDebit(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/acct/reports/downloadDebit?${queryString}`);
  }
  getCompanyTransactions(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/acct/companytransaction?${queryString}`);
  }
  getCompanyTransactionsDebit(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/acct/companytransactionDebit?${queryString}`);
  }
}
