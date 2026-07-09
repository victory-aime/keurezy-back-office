'use client';

import { Formik, FormikHelpers } from 'formik';
import { Box, Flex, Switch, createListCollection } from '@chakra-ui/react';
import { useState } from 'react';
import { BaseButton, BaseContainer, BaseText, FormTextInput, FormSelect } from '_components/custom';
import { PlanModule } from '_store/state-management';
import { useRouter } from 'next/navigation';

const planCollection = createListCollection({
  items: [
    { value: 'BASIC_COMMISSION', label: 'Basique (Commission)' },
    { value: 'STANDARD_COMMISSION', label: 'Standard (Commission)' },
    { value: 'PREMIUM_COMMISSION', label: 'Premium (Commission)' },
    { value: 'BASIC_SUB', label: 'Basique (Abonnement)' },
    { value: 'STANDARD_SUB', label: 'Standard (Abonnement)' },
    { value: 'PREMIUM_SUB', label: 'Premium (Abonnement)' },
  ],
});

interface PlanFormValues {
  name: string;
  commissionRate: number;
  isActive: boolean;
}

const initialValues: PlanFormValues = {
  name: '',
  commissionRate: 0,
  isActive: false,
};

// FormSelect (Ark UI) peut renvoyer la valeur sous forme de tableau (ex: ["BASIC_SUB"])
// même en mode sélection simple. Prisma attend une valeur scalaire pour un enum,
// donc on normalise systématiquement avant l'envoi à l'API.
const normalizeSelectValue = (value: unknown): string => {
  if (Array.isArray(value)) return value[0] ?? '';
  return (value as string) ?? '';
};

export const PlansCreateForm = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { mutateAsync: createPlan, isPending } = PlanModule.createPlanMutation({
    mutationOptions: {
      onSuccess: () => {
        PlanModule.PlansCache.invalidateAllPlansCache();
        router.push('/dashboard/plans');
      },
      onError: (error: any) => {
        setSubmitError(error?.message ?? 'Une erreur est survenue');
      },
    },
  });

  const handleSubmit = async (values: PlanFormValues, actions: FormikHelpers<PlanFormValues>) => {
    setSubmitError(null);
    try {
      const payload = {
        ...values,
        name: normalizeSelectValue(values.name), // sécurité : garantit une string, jamais un tableau
        commissionRate: Number(values.commissionRate),
        features: [],
      };
      await createPlan({ payload });
    } catch (error: any) {
      actions.setSubmitting(false);
      setSubmitError(error?.message ?? 'Une erreur est survenue');
    }
  };

  return (
    <BaseContainer
      title="Créer un plan"
      description="Créer un nouveau plan pour la plateforme Keurezy"
      border="none"
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
            }}
            width="100%"
            gap={6}
            display="flex"
            flexDirection="column"
          >
            <FormSelect
              name="name"
              label="Nom du plan"
              placeholder="Sélectionnez un type de plan"
              listItems={planCollection}
              setFieldValue={(field, value, shouldValidate) =>
                setFieldValue(field, normalizeSelectValue(value), shouldValidate)
              }
              required
            />
            <FormTextInput
              name="commissionRate"
              label="Taux de commission (%)"
              type="number"
              placeholder="Entrez le taux de commission"
              required
            />
            <FormTextInput
              name="abonnementPrice"
              label="Prix de l'abonnement"
              type="number"
              placeholder="Entrez le prix de l'abonnement"
              required
            />
            <Flex align="center" gap={3}>
              <Switch.Root
                checked={values.isActive}
                onCheckedChange={(details) => setFieldValue('isActive', details.checked)}
              >
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>
              <BaseText fontSize="sm">{values.isActive ? 'Actif' : 'Inactif'}</BaseText>
            </Flex>
            {submitError && <BaseText color="danger.500">{submitError}</BaseText>}
            <Flex gap={4} flexWrap="wrap">
              <BaseButton type="submit" isLoading={isSubmitting || isPending} colorType="success">
                Créer
              </BaseButton>
              <BaseButton
                type="button"
                variant="outline"
                colorType="secondary"
                onClick={() => router.push('/dashboard/plans')}
              >
                Annuler
              </BaseButton>
            </Flex>
          </Box>
        )}
      </Formik>
    </BaseContainer>
  );
};
