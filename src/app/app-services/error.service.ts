import {Injectable} from '@angular/core';

@Injectable()
export class ErrorService {
  constructor() {}
  errorMap = {
    400: 'Ensure all required fields are captured and in correct format e.g email, phone number',
    403: 'Access forbidden',
    404: 'Data not found',
    409: 'Duplicate record found',
    422: 'Unable to process data, ensure all required data are created and in active state'
  };
  getErrorMessage(res: any) {
    return this.errorMap[res.status];
  }
}
