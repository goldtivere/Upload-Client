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
  getTrxnReport(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/acct/reports/download?${queryString}`);
  }
  getCompanyTransactions(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/acct/companytransaction?${queryString}`);
  }
}
