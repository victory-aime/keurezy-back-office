import { BillingCycle, PlanCategory, PlanType, COMMON } from '@/types/enum';
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

interface ISubscription extends ISubscriptionPlan {
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

interface IPlan {
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

interface IPlanFeature {
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

interface IPlanPricing {
  id: string;
  createdAt: Date;
  planId: string;
  billingCycle: BillingCycle;
  price: number;
  currency: string;
  discountPercentage: number | null;
}

interface ICreatePlan {
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

interface IUpdatePlan extends ICreatePlan {
  id?: string;
}

export type { IUpdatePlan, ICreatePlan, IPlanPricing, IPlanFeature, IPlan, ISubscription };
