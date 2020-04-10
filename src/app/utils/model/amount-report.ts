export class AmountReport {
  private _all: number;
  private _processed: number;
  private _failed: number;
  private _approved: number;
  private _canceled: number;
  private _initiated: number;
  private _invalid: number;
  private _rejected: number;
  private _dueToday: number;

  get all(): number {
    return this._all;
  }

  set all(value: number) {
    this._all = value;
  }

  get processed(): number {
    return this._processed;
  }

  set processed(value: number) {
    this._processed = value;
  }

  get failed(): number {
    return this._failed;
  }

  set failed(value: number) {
    this._failed = value;
  }

  get approved(): number {
    return this._approved;
  }

  set approved(value: number) {
    this._approved = value;
  }

  get canceled(): number {
    return this._canceled;
  }

  set canceled(value: number) {
    this._canceled = value;
  }

  get initiated(): number {
    return this._initiated;
  }

  set initiated(value: number) {
    this._initiated = value;
  }

  get invalid(): number {
    return this._invalid;
  }

  set invalid(value: number) {
    this._invalid = value;
  }

  get rejected(): number {
    return this._rejected;
  }

  set rejected(value: number) {
    this._rejected = value;
  }

  get dueToday(): number {
    return this._dueToday;
  }

  set dueToday(value: number) {
    this._dueToday = value;
  }
}
