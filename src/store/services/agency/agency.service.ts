import { BaseApi } from 'rise-core-frontend';
import { MODELS } from '_types/index';

/**
 * AgencyService provides methods for handling agency-related operations
 * such as fetching all agency and creating a new agency through API endpoints.
 */
export class AgencyService extends BaseApi {
  agency_info(id: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().AGENCY.AGENCY_INFO,
      {},
      { params: { id } },
    );
  }

  all_agencies() {
    return this.apiService.invoke(this.applicationContext.getApiConfig().AGENCY.LIST);
  }
  update_agency(data: MODELS.IUpdateAgency, id: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().AGENCY.UPDATE_AGENCY,
      data,
      { params: { id } },
    );
  }
}
