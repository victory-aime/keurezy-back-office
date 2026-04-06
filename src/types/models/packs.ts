import { FeatureCategory, SubscriptionPlan, COMMON } from "../enum";

interface IFeature {
  id: string;
  name: string; // ex: "manage_properties", "view_reports"
  description: string;
  category: FeatureCategory;
}
interface IPacksResponse {
  id: string;
  name: SubscriptionPlan;
  commissionRate: number;
  isActive: boolean;
  createdAt: string;
  planFeatures: [
    {
      id: string;
      enabled: boolean;
      limit: number;
      planId: string;
      featureId: string;
      feature: IFeature;
    },
  ];
  subscriptions: {
    id: string;
    agencyId: string;
    planId: string;
    status: COMMON.Status;
    commissionRate: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

interface CreatePack {
  name: SubscriptionPlan;
  price: number;
  currency: string;
  isActive: boolean;
  planFeatures: {
    featureId: string;
    enabled: boolean;
    limit: number | null; // null for unlimited
  }[];
}

export type { IFeature, IPacksResponse, CreatePack };
