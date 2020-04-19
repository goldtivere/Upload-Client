import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class AccountManagementService {
  constructor(private httpClient: HttpClient) {}
  getAccountBalance() {
    return this.httpClient.get(`${environment.apiBaseUrl}/acct/balance`);
  }
}
