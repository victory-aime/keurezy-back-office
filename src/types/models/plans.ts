export interface IPlan {
  id: string;
  name: string;
  commissionRate: number | string;
  isActive: boolean;
  planCategory?: 'COMMISSION_BASED' | 'SUBSCRIPTION_BASED';
  popular?: boolean;
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
  };
}

export interface IPlanPricing {
  id: string;
  planId: string;
  currency: string;
  price: number;
  billingCycle: string;
}

export interface ICreatePlan {
  name: string;
  commissionRate: number;
  planCategory?: 'COMMISSION_BASED' | 'SUBSCRIPTION_BASED';
  popular?: boolean;
  isActive?: boolean;
  features: {
    featureId: string;
    enabled: boolean;
    limit?: number | null;
  }[];
}

export interface IUpdatePlan {
  commissionRate?: number;
  isActive?: boolean;
  features?: {
    featureId: string;
    enabled: boolean;
    limit?: number | null;
  }[];
}

export interface IPlanDetailsResponse extends IPlan {
  planFeatures: IPlanFeature[];
  pricings: IPlanPricing[];
  _count?: {
    subscriptions: number;
  };
  pricingType?: 'COMMISSION' | 'SUBSCRIPTION';
}

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
