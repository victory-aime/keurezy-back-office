import { BaseApi } from 'rise-core-frontend';
import { MODELS } from '_types/index';

export class PaymentService extends BaseApi {
  get_all_transactions(params?: MODELS.IGetTransactionsParams) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PAYMENT.LIST,
      {},
      { params },
    );
  }

  get_payment_stats() {
    return this.apiService.invoke(this.applicationContext.getApiConfig().PAYMENT.STATS);
  }

  get_transaction_by_id(id: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PAYMENT.DETAIL,
      {},
      { params: { id } },
    );
  }

  refund_transaction(id: string, data: MODELS.IPaymentPayoutPayload) {
    return this.apiService.invoke(this.applicationContext.getApiConfig().PAYMENT.REFUND, data, {
      params: { id },
    });
  }
  all_refunds(params?: MODELS.IGetPayoutParams) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PAYMENT.ALL_REFUNDS,
      {},
      { params },
    );
  }

  refund_by_id(order_id: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PAYMENT.REFUND_BY_ID,
      {},
      { params: { order_id } },
    );
  }
}
