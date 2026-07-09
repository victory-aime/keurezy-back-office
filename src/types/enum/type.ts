export enum PlanType {
  BASIC_COMMISSION = 'BASIC_COMMISSION',
  STANDARD_COMMISSION = 'STANDARD_COMMISSION',
  PREMIUM_COMMISSION = 'PREMIUM_COMMISSION',
  BASIC_SUB = 'BASIC_SUB',
  STANDARD_SUB = 'STANDARD_SUB',
  PREMIUM_SUB = 'PREMIUM_SUB',
}

export enum BillingCycleType {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export type PlanCategory = 'COMMISSION_BASED' | 'SUBSCRIPTION_BASED';
export type PricingType = 'COMMISSION' | 'SUBSCRIPTION';
export type BillingCycle = 'MONTHLY' | 'YEARLY';
export type PlanTier = 'BASIC' | 'STANDARD' | 'PREMIUM';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum AppRole {
  OWNER = 'OWNER',
  STAFF = 'STAFF',
}

export enum AgencyRole {
  AGENCY_ADMIN = 'AGENCY_ADMIN',
  AGENT = 'AGENT',
  ACCOUNTANT = 'ACCOUNTANT',
  MEMBER = 'MEMBER',
}

export enum NotificationType {
  MESSAGE = 'MESSAGE',
  PAYMENT = 'PAYMENT',
  MAINTENANCE = 'MAINTENANCE',
  SYSTEM = 'SYSTEM',
  LEAD = 'LEAD',
  VISIT = 'VISIT',
  TICKET = 'TICKET',
}
