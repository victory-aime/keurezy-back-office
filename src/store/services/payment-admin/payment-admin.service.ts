import { BaseApi } from 'rise-core-frontend';
import { MODELS } from '_types/index';

export class PaymentAdminService extends BaseApi {
  get_all_transactions() {
    return this.apiService.invoke(this.applicationContext.getApiConfig().PAYMENT_ADMIN.LIST);
  }

  get_payment_stats() {
    return this.apiService.invoke(this.applicationContext.getApiConfig().PAYMENT_ADMIN.STATS);
  }

  get_transaction_by_id(id: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PAYMENT_ADMIN.DETAIL,
      {},
      { params: { id } },
    );
  }

  refund_transaction(id: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PAYMENT_ADMIN.REFUND,
      {},
      { params: { id } },
    );
  }
}
