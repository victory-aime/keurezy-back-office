'use client';

import { Formik, FormikHelpers } from 'formik';
import { Box, Flex, Switch } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { BaseButton, BaseContainer, BaseText, FormTextInput } from '_components/custom';
import { PlanModule } from '_store/state-management';
import { useRouter } from 'next/navigation';
import { BO_ROUTES } from '@/app/routes';

interface PlanFormValues {
  commissionRate: number;
  isActive: boolean;
}

const initialValues: PlanFormValues = {
  commissionRate: 0,
  isActive: false,
};

export const PlansUpdateForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: planInfo, isFetching } = PlanModule.getPlanInfo({
    params: { id },
    queryOptions: { enabled: !!id },
  });

  const { mutateAsync: updatePlan, isPending } = PlanModule.updatePlanMutation({
    mutationOptions: {
      onSuccess: () => {
        PlanModule.PlansCache.invalidateAllPlansCache();
        router.push(`${BO_ROUTES.PLANS.DETAILS}?id=${id}`);
      },
      onError: (error: any) => {
        setSubmitError(error?.message ?? 'Une erreur est survenue lors de la mise à jour du plan');
      },
    },
  });

  const memoizedInitialValues = useMemo<PlanFormValues>(() => {
    if (!planInfo) return initialValues;
    return {
      commissionRate: Number(planInfo?.commissionRate ?? 0),
      isActive: planInfo?.isActive ?? true,
    };
  }, [planInfo]);

  const handleSubmit = async (values: PlanFormValues, actions: FormikHelpers<PlanFormValues>) => {
    setSubmitError(null);
    try {
      // Les planFeatures ne sont pas gérées ici : il manque la liste des Feature
      // disponibles (endpoint séparé) pour construire un sélecteur fiable.
      await updatePlan({ payload: values, params: { id } });
    } catch (error: any) {
      actions.setSubmitting(false);
      setSubmitError(error?.message ?? 'Une erreur est survenue lors de la mise à jour du plan');
    }
  };

  if (isFetching) {
    return (
      <BaseContainer
        title="Modifier un plan"
        description="Chargement des informations du plan"
        border="none"
      >
        <BaseText>Chargement...</BaseText>
      </BaseContainer>
    );
  }

  if (!planInfo) {
    return (
      <BaseContainer title="Modifier un plan" description="Aucun plan trouvé" border="none">
        <BaseText>Le plan demandé est introuvable.</BaseText>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer
      title="Modifier un plan"
      description="Mettre à jour les informations du plan"
      border="none"
    >
      <Formik initialValues={memoizedInitialValues} enableReinitialize onSubmit={handleSubmit}>
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
            {planInfo.pricingType === 'COMMISSION' ? (
              <FormTextInput
                name="commissionRate"
                label="Taux de commission (%)"
                type="number"
                placeholder="Entrez le taux de commission"
                required
              />
            ) : (
              <BaseText fontSize="sm" color="gray.500">
                Plan de type abonnement — les tarifs (PlanPricing) ne sont pas encore éditables
                depuis ce formulaire.
              </BaseText>
            )}

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
                Enregistrer
              </BaseButton>
              <BaseButton
                type="button"
                variant="outline"
                colorType="secondary"
                onClick={() => router.push(BO_ROUTES.PLANS.LIST)}
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
