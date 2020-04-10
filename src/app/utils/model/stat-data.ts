export class Stat {
  private _today: number;
  private _week: number;
  private _month: number;


  get today(): number {
    return this._today;
  }

  set today(value: number) {
    this._today = value;
  }

  get week(): number {
    return this._week;
  }

  set week(value: number) {
    this._week = value;
  }

  get month(): number {
    return this._month;
  }

  set month(value: number) {
    this._month = value;
  }
}
