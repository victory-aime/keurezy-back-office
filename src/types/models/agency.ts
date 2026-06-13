import { COMMON, PricingType, PlanType, PlanCategory, BillingCycle } from '../enum';

interface IUpdateAgency {
  agencyId?: string;
  status: COMMON.Status;
}

interface IAgency {
  id: string;
  name: string;
  ownerId: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  status: COMMON.Status;
  acceptTerms: true;
  isVerified: false;
  createdAt: string;
  updatedAt: string;
  agencyLogo?: string;
  documents: string[];
}

interface IAgencySubscription {
  id: string;
  agencyId: string;
  planId: string;
  status: COMMON.Status;
  pricingType: PricingType;
  billingCycle: BillingCycle;
  price?: string;
  currency: COMMON.Currency;
  commissionRate: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  canceledAt?: string;
  createdAt: string;
  updatedAt: string;
  plan: {
    id: string;
    name: PlanType;
    pricingType: PricingType;
    popular: false;
    commissionRate: string;
    planCategory: PlanCategory;
    isActive: true;
    createdAt: string;
  };
}

interface IAgencyListResponse extends IAgency {
  owner: {
    id: string;
    userId: string;
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
    };
  };
  subscriptions: IAgencySubscription[];
}

interface IAgencyDetailsResponse extends IAgency, IAgencyListResponse {
  staff: { id: string }[];
  stats: {
    staff: number;
    properties: number;
    batiments: number;
    villas: number;
    lands: number;
    leads: number;
    visits: number;
    tenants: number;
    contracts: number;
    transactions: number;
    transactionCommissions: number;
    tickets: number;
    reports: number;
    invitations: number;
  };
}

export type {
  IUpdateAgency,
  IAgency,
  IAgencyListResponse,
  IAgencyDetailsResponse,
  IAgencySubscription,
};
