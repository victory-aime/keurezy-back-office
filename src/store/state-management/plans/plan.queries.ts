import * as Constants from './constants';
import { planServiceInstance } from './plan.service-instance';
import { MODELS } from '_types/index';
import { QUERIES } from 'rise-core-frontend';

const allPlansListQueries = (
  args: QUERIES.QueryPayload<MODELS.IPlan[], undefined, { id?: string }>,
) => {
  const { queryOptions, params } = args;
  return QUERIES.useCustomQuery<{ id?: string }, undefined, MODELS.IPlan[]>({
    queryKey: [Constants.PLAN_KEYS.PLANS_LIST, params],
    queryFn: () => planServiceInstance().all_plans(params?.id),
    options: queryOptions,
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
  allPlansListQueries,
  createPlanMutation,
  updatePlanMutation,
  togglePlanMutation,
  deletePlanMutation,
};
