/* Constantes et types partagés pour la gestion des plans */

export const PLAN_API = {
  BASE: '/api/v1/secure/admin/plans',
  LIST: '/api/v1/secure/admin/plans',
  DETAIL: '/api/v1/secure/admin/plans/detail',
  CREATE: '/api/v1/secure/admin/plans/create',
  UPDATE_PLAN: '/api/v1/secure/admin/plans/update-plan',
  TOGGLE_STATUS: '/api/v1/secure/admin/plans/toggle-status',
  DELETE: '/api/v1/secure/admin/plans/delete',
} as const;

export enum PLAN_KEYS {
  PLANS_LIST = 'PLANS_LIST',
  PLAN_INFO = 'PLAN_INFO',
  CREATE_PLAN = 'CREATE_PLAN',
  UPDATE_PLAN = 'UPDATE_PLAN',
  TOGGLE_STATUS = 'TOGGLE_STATUS',
  DELETE_PLAN = 'DELETE_PLAN',
}

export enum PlanStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const PLAN_FIELDS = {
  ID: 'id',
  NAME: 'name',
  PRICING_TYPE: 'pricingType',
  PLAN_CATEGORY: 'planCategory',
  COMMISSION_RATE: 'commissionRate',
  PRICINGS: 'pricings',
  POPULAR: 'popular',
  FEATURES: 'planFeatures',
  IS_ACTIVE: 'isActive',
  CREATED_AT: 'createdAt',
} as const;

export const PLAN_ACTIONS = {
  LOAD_LIST: 'plans/load_list',
  LOAD_DETAIL: 'plans/load_detail',
  CREATE: 'plans/create',
  UPDATE: 'plans/update',
  TOGGLE_STATUS: 'plans/toggle_status',
  DELETE: 'plans/delete',
  SET_LOADING: 'plans/set_loading',
  SET_ERROR: 'plans/set_error',
} as const;

export const DEFAULT_PLAN = {
  id: null,
  name: '',
  commissionRate: 0,
  isActive: false,
  features: [] as { featureId: string; enabled: boolean; limit?: number | null }[],
  createdAt: null,
} as const;

export const PLAN_LIMITS = {
  UNLIMITED: -1,
} as const;

export type PlanKey = (typeof PLAN_FIELDS)[keyof typeof PLAN_FIELDS];

export default {
  PLAN_API,
  PLAN_KEYS,
  PLAN_FIELDS,
  PLAN_ACTIONS,
  DEFAULT_PLAN,
  PLAN_LIMITS,
  PlanStatus,
};
