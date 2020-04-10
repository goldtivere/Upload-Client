export class Payment {
  public id: number;
  public merchantId: number;
  public distributorId: number;
  public productId: number;
  public dueDateVal = new Date();
  public comment: string;
  public dueDate: string;
  public numberOfUnits: number;
  public amount: number;
  public error: string;
}
