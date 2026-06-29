import { BaseApi } from 'rise-core-frontend';
import { MODELS } from '_types/index';

/**
 * PlansService fournit les méthodes pour gérer les opérations liées aux plans
 * (récupération, création, mise à jour, activation/désactivation, suppression).
 */
export class PlansService extends BaseApi {
  all_plans(id?: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PLANS.LIST,
      {},
      { params: { id } },
    );
  }

  create_plan(data: MODELS.ICreatePlan) {
    return this.apiService.invoke(this.applicationContext.getApiConfig().PLANS.CREATE, data);
  }

  update_plan(data: MODELS.IUpdatePlan, id: string) {
    return this.apiService.invoke(this.applicationContext.getApiConfig().PLANS.UPDATE_PLAN, data, {
      params: { id },
    });
  }

  toggle_status(data: any, id: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PLANS.TOGGLE_STATUS,
      data,
      { params: { id } },
    );
  }

  delete_plan(id: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().PLANS.DELETE,
      {},
      { params: { id } },
    );
  }
}
