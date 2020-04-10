export class PageData {
  private _content: any[];
  private _totalElements: number;
  private _number: number;
  private _size: number;
  private _beginIndex: number;
  private _totalPages: number;
  private _endIndex: number;

  get content(): any[] {
    return this.content;
  }

  set content(value: any[]) {
    this.content = value;
  }

  get totalElements(): number {
    return this._totalElements;
  }

  set totalElements(value: number) {
    this._totalElements = value;
  }

  get number(): number {
    return this._number;
  }

  set number(value: number) {
    this._number = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get beginIndex(): number {
    return this._beginIndex;
  }

  set beginIndex(value: number) {
    this._beginIndex = value;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }

  get endIndex(): number {
    return this._endIndex;
  }

  set endIndex(value: number) {
    this._endIndex = value;
  }
}
