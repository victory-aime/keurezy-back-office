import { ENUM } from '..';

<<<<<<< refs/remotes/origin/refactor/payments
export type PaymentMethod = ['wave', 'orange_money'];

interface IGetTransactionsParams {
=======
type PaymentMethod = ['wave', 'orange_money'];

export interface IGetTransactionsParams {
>>>>>>> * refactor(payments): update design and improve types
  page?: number;
  limit?: number;
  status?: ENUM.COMMON.Status;
  paymentMethod?: PaymentMethod;
  min_amount?: number;
  max_amount?: number;
  start_date?: string;
<<<<<<< refs/remotes/origin/refactor/payments
  end_date?: string;
  date?: string;
  customer_phone?: string;
}

interface IGetPayoutParams {
  page?: number;
  limit?: number;
  status?: ENUM.COMMON.Status;
  payment_method?: PaymentMethod;
  min_amount?: number;
  max_amount?: number;
  start_date?: string;
  end_date?: string;
  date?: string;
  recipient_phone?: string;
}

interface IPaymentTransactionsResponse {
=======
  customer_phone?: string;
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

export interface IPaymentTransactionsResponse {
>>>>>>> * refactor(payments): update design and improve types
  order_id: string;
  amount: number;
  fees: number;
  method_of_payment: ['wave', 'orange_money'];
  selected_payment_method: string;
  currency: string;
  transaction_status: ENUM.COMMON.Status;
  customer: {
    first_name: string;
    last_name: string;
    phone: string;
  };
  products: [
    {
      name: string;
      price: number;
      quantity: number;
    },
  ];
  is_escrow: false;
  is_merchant: false;
  fees_customer_side: false;
  created_at: string;
  updated_at: string;
  paid_at: string;
}

<<<<<<< refs/remotes/origin/refactor/payments
interface ITransactionsResponse {
=======
export interface ITransactionsResponse {
>>>>>>> * refactor(payments): update design and improve types
  transactions: IPaymentTransactionsResponse[];
  pagination: {
    page: number;
    limit: number;
    total_count: number;
    total_pages: number;
  };
}

<<<<<<< refs/remotes/origin/refactor/payments
interface IPaymentStatsResponse {
=======
export interface IPaymentStatsResponse {
>>>>>>> * refactor(payments): update design and improve types
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

<<<<<<< refs/remotes/origin/refactor/payments
interface IPaymentPayoutResponseList {
  payouts: {
    _id: string;
    organization_id: string;
    order_id: string;
    selected_payment_method: PaymentMethod;
    amount: number;
    fees: number;
    currency: string;
    payout_status: ENUM.COMMON.Status;
    reason: string;
    created_at: string;
    is_deleted: boolean;
  }[];
  pagination: {
    page: number;
    limit: number;
    total_count: number;
    total_pages: number;
  };
}

interface IPaymentPayoutByIdResponse {
  order_id: string;
  amount: number;
  fees: number;
  selected_payment_method: PaymentMethod;
  currency: string;
  payout_status: ENUM.COMMON.Status;
  recipient: {
    first_name: string;
    last_name: string;
    phone: string;
  };
  reason: string;
  provider_reference: string;
  ip_address: string;
  browser: string;
  created_at: string;
  updated_at: string;
  paid_at: string;
  is_deleted: boolean;
}

interface IPaymentPayoutPayload {
  selected_payment_method: PaymentMethod;
  amount: number;
  recipient: {
    first_name: string;
    last_name: string;
    phone: string;
  };
  reason: string;
}

export type {
  ITransactionsResponse,
  IPaymentTransactionsResponse,
  IPaymentStatsResponse,
  IGetTransactionsParams,
  IPaymentPayoutResponseList,
  IGetPayoutParams,
  IPaymentPayoutPayload,
  IPaymentPayoutByIdResponse,
};
=======
export interface IRefundResponse {
  message: string;
}
>>>>>>> * refactor(payments): update design and improve types
