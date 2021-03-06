import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Serializable} from "../utils/serializable";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  confirmPaccount(paccount: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/pay/confirmaccount/${paccount}`);
  }

  qrGenerate(paccount: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/pay/${paccount}`,{responseType: "arraybuffer"});
  }

  initiateDebit(data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/transaction/inititateDebit`,data);
  }
  getDebitList(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/transaction/getdebit?${queryString}`);
  }
  transactionSummary() {
    return this.httpClient.get(`${environment.apiBaseUrl}/transaction/transactionsummary`);
  }
}
