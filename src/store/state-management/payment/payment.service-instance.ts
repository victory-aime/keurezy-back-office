import { applicationInstance } from 'rise-core-frontend';
import { PaymentService } from '_store/services';

export const paymentServiceInstance = () => {
  const context = applicationInstance.getContext();
  if (!context) {
    throw new Error('[PaymentAdminService] No context found.');
  }

  return new PaymentService(context);
};
