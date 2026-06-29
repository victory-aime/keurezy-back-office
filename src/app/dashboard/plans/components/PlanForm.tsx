import { BaseDrawer, FormTextInput, Icons, ModalOpenProps } from '@/components/custom';
import { MODELS } from '@/types';
import { VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';

interface PlanFormProps extends ModalOpenProps {
  data: MODELS.IPlan;
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
    if (data) {
      setInitialValues({
        pricing: data.pricing.map((values) => ({
          billingCycle: values.billingCycle,
          discountPercentage: values.discountPercentage,
          price: values.price,
        })),
      });
    } else {
      setInitialValues({});
    }
  }, [data, isOpen]);

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={callback}>
      {({ handleSubmit, values }) => (
        <BaseDrawer
          title={data?.id ? 'Modifier un plan' : 'Ajouter un plan'}
          description={data?.id ? 'Modifier ce plan' : 'Créer un nouveau plan'}
          icon={data?.id ? <Icons.Edit /> : <Icons.PlusMinus />}
          size="md"
          isOpen={isOpen}
          data={data}
          onChange={onChange}
          isLoading={isLoading}
          callback={() => handleSubmit()}
        >
          {JSON.stringify(values, null, 5)}
          <VStack gap={4}>
            <FormTextInput
              name="abonnementPrice"
              label="Prix de l'abonnement / mois"
              type="amount"
              placeholder="Entrez le prix de l'abonnement"
              required
            />
            <FormTextInput
              name="abonnementPrice"
              label="Prix de l'abonnement / an"
              type="amount"
              placeholder="Entrez le prix de l'abonnement"
              required
            />
            <FormTextInput
              name="discountPercentage"
              label="Taux de réduction annuelle en (%)"
              type="number"
              placeholder="Entrez le prix de l'abonnement"
              required
            />
          </VStack>
        </BaseDrawer>
      )}
    </Formik>
  );
}
