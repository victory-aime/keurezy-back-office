import { applicationInstance } from 'rise-core-frontend';
import { PlansService } from '_store/services';

export const planServiceInstance = () => {
  const context = applicationInstance.getContext();
  if (!context) {
    throw new Error('[PlansService] No context found.');
  }
  return new PlansService(context);
};
