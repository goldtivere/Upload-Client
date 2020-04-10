export class HomeData {
  private _organization: number;
  private _merchant: number;
  private _product: number;
  private _payment: number;
  private _distributor: number;
  private _user: number;


  get organization(): number {
    return this._organization;
  }

  set organization(value: number) {
    this._organization = value;
  }

  get merchant(): number {
    return this._merchant;
  }

  set merchant(value: number) {
    this._merchant = value;
  }

  get product(): number {
    return this._product;
  }

  set product(value: number) {
    this._product = value;
  }

  get payment(): number {
    return this._payment;
  }

  set payment(value: number) {
    this._payment = value;
  }

  get distributor(): number {
    return this._distributor;
  }

  set distributor(value: number) {
    this._distributor = value;
  }

  get user(): number {
    return this._user;
  }

  set user(value: number) {
    this._user = value;
  }
}
