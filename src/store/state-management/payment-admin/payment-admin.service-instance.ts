import { applicationInstance } from 'rise-core-frontend';
import { PaymentAdminService } from '_store/services';

export const paymentAdminServiceInstance = () => {
  const context = applicationInstance.getContext();
  if (!context) {
    throw new Error('[PaymentAdminService] No context found.');
  }

  return new PaymentAdminService(context);
};
