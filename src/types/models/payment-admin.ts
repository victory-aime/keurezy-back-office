export interface IGetTransactionsParams {
  initialPage?: number;
  limitPerPage?: number;
  status?: PaymentStatus;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface IPaymentPlan {
  id: string;
  name: string;
  pricingType: string;
  pricings?: { billingCycle: string; price: number; currency?: string }[];
}

export interface IPaymentUser {
  id: string;
  name: string;
  email: string;
}

export interface IPaymentTransaction {
  id: string;
  naboo_order_id: string;
  checkout_url: string;
  amount_to_pay: number;
  status: PaymentStatus;
  confirmed_at: string | null;
  createdAt: string;
  updatedAt: string;
  plan: IPaymentPlan;
  user: IPaymentUser;
}

export interface IPaymentTransactionsResponse {
  content: IPaymentTransaction[];
  totalDataPerPages: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IPaymentStatsResponse {
  transactions: {
    total: number;
    paid: number;
    pending: number;
    failed: number;
    cancelled: number;
  };
  revenue: {
    total: number;
    currency: string;
  };
}

export interface IRefundResponse {
  message: string;
}
