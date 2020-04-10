import {PageQueryModel} from './page-query';

export class PaymentQueryModel extends PageQueryModel {
  productName = null;
  paymentId = null;
  distributorName = null;
  merchantName = null;
  merchantId = null;
  dueDate = null;
  from = null;
  transactionId = null;
  to = null;
  status = null;
  initiator = null;
  orderBy = null;
  asc = false;
}
