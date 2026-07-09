import { BaseDrawer, FormTextInput, Icons, ModalOpenProps } from '@/components/custom';
import { MODELS } from '@/types';
import { VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ENUM } from '@/types';
import { UsePricingCalculator } from '_hooks/usePricingCalculator';

interface PlanFormProps extends ModalOpenProps {
  data: MODELS.IPlan | null;
}

export function PlanForm({
  isOpen,
  isLoading,
  data,
  callback = () => {},
  onChange,
}: PlanFormProps) {
  const [initialValues, setInitialValues] = useState<MODELS.ICreatePlan>({} as MODELS.ICreatePlan);

  useEffect(() => {
    if (data?.id) {
      setInitialValues({
        pricing: data?.pricing?.map((values) => ({
          billingCycle: values.billingCycle,
          discountPercentage: values.discountPercentage,
          price: values.price,
        })),
      });
    }
    if (!isOpen) {
      setInitialValues({
        isActive: false,
        features: [],
        pricing: [
          {
            billingCycle: ENUM.BillingCycleType.MONTHLY,
            price: 0,
            discountPercentage: 0,
          },
          {
            billingCycle: ENUM.BillingCycleType.YEARLY,
            price: 0,
            discountPercentage: 0,
          },
        ],
      });
    }
  }, [data, isOpen]);

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={callback}>
      {({ handleSubmit, values, resetForm }) => (
        <BaseDrawer
          title={data?.id ? 'Modifier un plan' : 'Ajouter un plan'}
          description={data?.id ? 'Modifier ce plan' : 'Créer un nouveau plan'}
          icon={data?.id ? <Icons.Edit /> : <Icons.PlusMinus />}
          size="md"
          isOpen={isOpen}
          data={data}
          onChange={(value) => {
            onChange(value);
            resetForm();
          }}
          isLoading={isLoading}
          callback={() => handleSubmit()}
          buttonSaveTitle={data?.id ? 'Modifier ce plan' : 'Ajouter un plan'}
        >
          <VStack gap={4}>
            {values.pricing?.map((pricing, index) => (
              <React.Fragment key={pricing.billingCycle}>
                <FormTextInput
                  name={`pricing.${index}.price`}
                  label={
                    pricing.billingCycle === 'MONTHLY'
                      ? "Prix de l'abonnement / mois"
                      : "Prix de l'abonnement / an"
                  }
                  type="amount"
                  placeholder="Entrez le prix"
                  required
                  isDisabled={pricing.billingCycle !== 'MONTHLY'}
                  infoMessage={
                    pricing.billingCycle !== 'MONTHLY'
                      ? 'En fonction du prix mensuel et de la reduction le prix annuel sera automatiquement ajoute'
                      : null
                  }
                />

                {pricing.billingCycle === 'YEARLY' && (
                  <FormTextInput
                    name={`pricing.${index}.discountPercentage`}
                    label="Taux de réduction annuelle (%)"
                    type="number"
                    placeholder="Entrez le taux de réduction"
                    required
                  />
                )}
              </React.Fragment>
            ))}
          </VStack>
          <UsePricingCalculator />
        </BaseDrawer>
      )}
    </Formik>
  );
}
