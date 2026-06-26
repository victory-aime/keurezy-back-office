import * as Constants from './constants';
import { planServiceInstance } from './plan.service-instance';
import { MODELS } from '_types/index';
import { QUERIES } from 'rise-core-frontend';

const getPlanInfo = (args: QUERIES.QueryPayload<{ id: string }>) => {
  const { params, queryOptions } = args;
  return QUERIES.useCustomQuery<MODELS.IPlanDetailsResponse>({
    queryKey: [Constants.PLAN_KEYS.PLAN_INFO, params],
    queryFn: () => planServiceInstance().plan_info(params?.id!),
    options: queryOptions,
  });
};

const allPlansListQueries = (args: QUERIES.QueryPayload<any>) => {
  return QUERIES.useCustomQuery<MODELS.IPlanListResponse[]>({
    queryKey: [Constants.PLAN_KEYS.PLANS_LIST],
    queryFn: () => planServiceInstance().all_plans(),
    options: args.queryOptions,
  });
};

const createPlanMutation = (args: QUERIES.MutationPayload<MODELS.ICreatePlan, any>) => {
  return QUERIES.useCustomMutation({
    mutationKey: [Constants.PLAN_KEYS.CREATE_PLAN],
    mutationFn: ({ payload }) => planServiceInstance().create_plan(payload!),
    options: args.mutationOptions,
  });
};

const updatePlanMutation = (
  args: QUERIES.MutationPayload<MODELS.IUpdatePlan, any, { id: string }>,
) => {
  return QUERIES.useCustomMutation({
    mutationKey: [Constants.PLAN_KEYS.UPDATE_PLAN],
    mutationFn: ({ payload, params }) => planServiceInstance().update_plan(payload!, params?.id!),
    options: args.mutationOptions,
  });
};

const togglePlanMutation = (args: QUERIES.MutationPayload<any, any, { id: string }>) => {
  return QUERIES.useCustomMutation({
    mutationKey: [Constants.PLAN_KEYS.TOGGLE_STATUS],
    mutationFn: ({ payload, params }) => planServiceInstance().toggle_status(payload!, params?.id!),
    options: args.mutationOptions,
  });
};

const deletePlanMutation = (args: QUERIES.MutationPayload<any, any, { id: string }>) => {
  return QUERIES.useCustomMutation({
    mutationKey: [Constants.PLAN_KEYS.DELETE_PLAN],
    mutationFn: ({ params }) => planServiceInstance().delete_plan(params!.id!),
    options: args.mutationOptions,
  });
};

export {
  getPlanInfo,
  allPlansListQueries,
  createPlanMutation,
  updatePlanMutation,
  togglePlanMutation,
  deletePlanMutation,
};
