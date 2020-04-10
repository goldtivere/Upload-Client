import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  confirmPaccount(paccount: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/payer/confirmaccount/${paccount}`);
  }

}
