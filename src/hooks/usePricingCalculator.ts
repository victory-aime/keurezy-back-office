import { useEffect } from 'react';
import { useFormikContext } from 'formik';

/**
 * Hook pour calculer automatiquement le prix annuel à partir du prix mensuel
 * et d'un taux de réduction annuel.
 *
 * Attentes sur la forme des valeurs Formik:
 * - `pricings` est un tableau d'objets { billingCycle: 'MONTHLY'|'YEARLY', price: number, currency?: string }
 */
export function usePricingCalculator({ annualDiscountRate = 0.1 } = {}) {
  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    const pricings = values?.pricings ?? [];
    const monthlyIndex = pricings.findIndex((p: any) => p?.billingCycle === 'MONTHLY');
    const yearlyIndex = pricings.findIndex((p: any) => p?.billingCycle === 'YEARLY');

    const monthly = monthlyIndex >= 0 ? Number(pricings[monthlyIndex].price ?? 0) : 0;
    const computedYearly = Math.round(monthly * 12 * (1 - annualDiscountRate));

    if (yearlyIndex >= 0) {
      const current = Number(pricings[yearlyIndex].price ?? 0);
      if (!Number.isNaN(computedYearly) && current !== computedYearly) {
        setFieldValue(`pricings[${yearlyIndex}].price`, computedYearly, false);
      }
    } else if (monthlyIndex >= 0) {
      // créer l'entrée yearly si elle n'existe pas
      const newYearly = {
        billingCycle: 'YEARLY',
        currency: pricings[monthlyIndex]?.currency ?? 'XAF',
        price: computedYearly,
      };
      setFieldValue('pricings', [...pricings, newYearly], false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values?.pricings?.length,
    values?.pricings?.map?.((p: any) => p?.price).join(','),
    annualDiscountRate,
  ]);
}

export default usePricingCalculator;
