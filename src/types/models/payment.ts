import { ENUM } from '..';

export type PaymentMethod = ['wave', 'orange_money'];

interface IGetTransactionsParams {
  page?: number;
  limit?: number;
  status?: ENUM.COMMON.Status;
  paymentMethod?: PaymentMethod;
  min_amount?: number;
  max_amount?: number;
  start_date?: string;
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

interface ITransactionsResponse {
  transactions: IPaymentTransactionsResponse[];
  pagination: {
    page: number;
    limit: number;
    total_count: number;
    total_pages: number;
  };
}

interface IPaymentStatsResponse {
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
