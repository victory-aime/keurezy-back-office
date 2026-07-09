// hooks/usePricingCalculator.tsx

import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { ENUM, MODELS } from '@/types';

export function UsePricingCalculator() {
  const { values, setFieldValue } = useFormikContext<MODELS.ICreatePlan>();

  useEffect(() => {
    if (!values) return;
    const monthlyIndex = values.pricing?.findIndex(
      (p) => p.billingCycle === ENUM.BillingCycleType.MONTHLY,
    );

    const yearlyIndex = values.pricing?.findIndex(
      (p) => p.billingCycle === ENUM.BillingCycleType.YEARLY,
    );

    if (
      monthlyIndex === undefined ||
      yearlyIndex === undefined ||
      monthlyIndex < 0 ||
      yearlyIndex < 0
    ) {
      return;
    }

    const monthlyPrice = Number(values?.pricing?.[monthlyIndex].price) || 0;
    const discount = Number(values?.pricing?.[yearlyIndex].discountPercentage) || 0;

    const yearlyPrice = Math.round(monthlyPrice * 12 * (1 - discount / 100));

    if (values?.pricing?.[yearlyIndex].price !== yearlyPrice) {
      setFieldValue(`pricing.${yearlyIndex}.price`, yearlyPrice, false);
    }
  }, [values.pricing, setFieldValue]);

  return null;
}
