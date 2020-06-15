import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Serializable} from "../utils/serializable";
import {environment} from "../../environments/environment";
import Pusher from "pusher-js";

@Injectable()
export class CompanyService {
  pusher: any;
  channel: any;
  constructor(private httpClient: HttpClient) {
  }

  getCompanies(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/company?${queryString}`);
  }

  getAllBanks() {
    return this.httpClient.get(`${environment.apiBaseUrl}/company/bank`);
  }

  createCompany(data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/company/create`, data);
  }

  createCompanyUser(id:number,data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/company/createCompanyuser/${id}`, data);
  }
  createCorporateCompanyUser(data) {
    return this.httpClient.post<any>(`${environment.apiBaseUrl}/company/createCorporateCompanyUser`, data);
  }
  editCompany(id: number, data) {
    return this.httpClient.put<any>(`${environment.apiBaseUrl}/company/edit/${id}`, data);
  }

  editCompanyUser(id:number,data) {
    return this.httpClient.put<any>(`${environment.apiBaseUrl}/company/editcompanyuser/${id}`, data);
  }

  editCorporateCompanyUser(data) {
    return this.httpClient.put<any>(`${environment.apiBaseUrl}/company/editcorporatecompanyuser`, data);
  }

  setUserStatus(id:number)
  {
    return this.httpClient.put<any>(`${environment.apiBaseUrl}/company/setStatus/${id}`, {});
  }
  getCompanyName(id: number) {
    return this.httpClient.get(`${environment.apiBaseUrl}/company/companyname/${id}`);
  }

  getCompanyUsers(id: number, param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/company/getCompanyuser/${id}?${queryString}`);
  }

  getCorporateCompanyUsers(param: Serializable) {
    const queryString = param.serialize();
    return this.httpClient.get(`${environment.apiBaseUrl}/company/getCorporateCompanyuser?${queryString}`);
  }

  getCorporateCmpanyName()
  {
    return this.httpClient.get(`${environment.apiBaseUrl}/company/corporatename`);
  }

}
