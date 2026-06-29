import { BillingCycle, FeatureCategory, PlanCategory, PlanType, COMMON } from '@/types/enum';
import { IAgencySubscription } from './agency';

type ISubscriptionPlan = Pick<
  IAgencySubscription,
  | 'id'
  | 'planId'
  | 'agencyId'
  | 'status'
  | 'pricingType'
  | 'billingCycle'
  | 'price'
  | 'currency'
  | 'commissionRate'
  | 'currentPeriodStart'
  | 'currentPeriodEnd'
  | 'cancelAtPeriodEnd'
  | 'canceledAt'
  | 'createdAt'
  | 'updatedAt'
>;

export interface ISubscription extends ISubscriptionPlan {
  agency: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    agencyLogo: string | null;
    description: string | null;
    documents: string[];
    acceptTerms: boolean;
    isVerified: boolean;
    status: COMMON.Status;
    ownerId: string;
    owner: {
      id: string;
      user: { id: string; email: string; name: string };
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface IPlan {
  id: string;
  name: PlanType;
  planCategory: PlanCategory;
  popular: boolean;
  planFeatures: IPlanFeature[];
  pricing: {
    id: string;
    createdAt: Date;
    planId: string;
    billingCycle: BillingCycle;
    price: number;
    currency: string;
    discountPercentage: number;
  }[];
  status: boolean;
  subscriptionCount: number;
  subscriptions?: ISubscription[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IPlanFeature {
  id: string;
  planId: string;
  featureId: string;
  enabled: boolean;
  limit: number | null;
  feature: {
    id: string;
    name: string;
    description?: string;
    category?: string;
    isCommercial: boolean;
  };
}

export interface IPlanPricing {
  id: string;
  createdAt: Date;
  planId: string;
  billingCycle: BillingCycle;
  price: number;
  currency: string;
  discountPercentage: number | null;
}

export interface ICreatePlan {
  name?: string;
  isActive?: boolean;
  pricing?: {
    billingCycle: BillingCycle;
    price: number;
    discountPercentage: number;
  }[];
  features?: {
    featureId: string;
    enabled: boolean;
    limit?: number | null;
  }[];
}

export interface IUpdatePlan extends ICreatePlan {
  id: string;
}

export interface IPlanDetailsResponse extends IPlan {}

export interface IPlanListResponse {
  id: string;
  name: string;
  commissionRate: number | string;
  isActive: boolean;
  planFeatures: IPlanFeature[];
  pricings: IPlanPricing[];
  _count?: {
    subscriptions: number;
  };
  createdAt?: string;
  updatedAt?: string;
}
