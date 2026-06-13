import * as Constants from './constants';
import { agencyServiceInstance } from './agency.service-instance';
import { MODELS } from '_types/index';
import { QUERIES } from 'rise-core-frontend';

const getAgencyInfo = (args: QUERIES.QueryPayload<{ id: string }>) => {
  const { params, queryOptions } = args;
  return QUERIES.useCustomQuery<MODELS.IAgencyDetailsResponse>({
    queryKey: [Constants.AGENCY_KEYS.AGENCY_INFO, params],
    queryFn: () => agencyServiceInstance().agency_info(params?.id),
    options: queryOptions,
  });
};

const allAgenciesListQueries = (args: QUERIES.QueryPayload<MODELS.IAgencyListResponse[]>) => {
  return QUERIES.useCustomQuery({
    queryKey: [Constants.AGENCY_KEYS.AGENCIES_LIST],
    queryFn: () => agencyServiceInstance().all_agencies(),
    options: args.queryOptions,
  });
};

const updateAgencyMutation = (
  args: QUERIES.MutationPayload<MODELS.IUpdateAgency, any, { id: string }>,
) => {
  return QUERIES.useCustomMutation({
    mutationKey: [Constants.AGENCY_KEYS.UPDATE_AGENCY],
    mutationFn: ({ payload, params }) =>
      agencyServiceInstance().update_agency(payload!, params?.id!),
    options: args.mutationOptions,
  });
};

export { getAgencyInfo, allAgenciesListQueries, updateAgencyMutation };
