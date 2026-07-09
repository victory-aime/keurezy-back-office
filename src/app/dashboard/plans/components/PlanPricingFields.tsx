'use client';

import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { FormTextInput, BaseText } from '_components/custom';
import { useFormikContext } from 'formik';
import usePricingCalculator from '@/hooks/usePricingCalculator';

interface Props {
  annualDiscountRate?: number; // ex: 0.1 pour 10%
}

export const PlanPricingFields: React.FC<Props> = ({ annualDiscountRate = 0.1 }) => {
  const { values } = useFormikContext<any>();
  usePricingCalculator({ annualDiscountRate });

  const pricings = values?.pricings ?? [];
  const monthlyIndex = pricings.findIndex((p: any) => p?.billingCycle === 'MONTHLY');
  const yearlyIndex = pricings.findIndex((p: any) => p?.billingCycle === 'YEARLY');

  // ensure indices for rendering
  const hasMonthly = monthlyIndex >= 0;
  const monthlyFieldName = hasMonthly ? `pricings[${monthlyIndex}].price` : 'pricings[0].price';
  const yearlyFieldName = yearlyIndex >= 0 ? `pricings[${yearlyIndex}].price` : 'pricings[1].price';

  return (
    <Box>
      <BaseText fontSize="sm" mb={2}>
        Le tarif annuel est calculé automatiquement à partir du tarif mensuel et d'un taux de
        réduction annuel.
      </BaseText>
      <Flex direction="column" gap={3}>
        <FormTextInput
          name={monthlyFieldName}
          label="Prix (mensuel)"
          type="number"
          placeholder="Entrez le prix mensuel"
          required
        />
        <FormTextInput
          name={yearlyFieldName}
          label="Prix (annuel)"
          type="number"
          placeholder="Prix annuel calculé automatiquement"
          isReadOnly
        />
      </Flex>
    </Box>
  );
};

export default PlanPricingFields;
