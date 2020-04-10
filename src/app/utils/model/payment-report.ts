import {AmountReport} from './amount-report';
export class PaymentReport {
  private _amountReport: AmountReport;
  private _countReport: AmountReport;


  get amountReport(): AmountReport {
    return this._amountReport;
  }

  set amountReport(value: AmountReport) {
    this._amountReport = value;
  }

  get countReport(): AmountReport {
    return this._countReport;
  }

  set countReport(value: AmountReport) {
    this._countReport = value;
  }
}
