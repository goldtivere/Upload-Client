export class AccessObject {
  private _userId: number;
  private _email: string;
  private _read: boolean;
  private _write: boolean;
  private _administration: boolean;
  private _principal: boolean;
  private _role: string;
  private _firstName: string;
  private _lastName: string;


  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get read(): boolean {
    return this._read;
  }

  set read(value: boolean) {
    this._read = value;
  }

  get write(): boolean {
    return this._write;
  }

  set write(value: boolean) {
    this._write = value;
  }

  get administration(): boolean {
    return this._administration;
  }

  set administration(value: boolean) {
    this._administration = value;
  }

  get principal(): boolean {
    return this._principal;
  }

  set principal(value: boolean) {
    this._principal = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }
}
