'use client';

import { BaseButton } from '_components/custom';
import { PlanModule } from '_store/state-management';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BO_ROUTES } from '@/app/routes';

export const PlansDeleteButton = ({ id }: { id: string }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { mutateAsync: deletePlan, isPending } = PlanModule.deletePlanMutation({
    mutationOptions: {
      onSuccess: () => {
        router.push(BO_ROUTES.PLANS.LIST);
      },
      onError: (error: any) => {
        setError(error?.message ?? 'Erreur lors de la suppression du plan');
      },
    },
  });

  return (
    <BaseButton
      variant="outline"
      colorType="danger"
      isLoading={isPending}
      onClick={async () => {
        setError(null);
        try {
          await deletePlan({ params: { id } });
        } catch (e) {
          setError((e as any)?.message ?? 'Erreur lors de la suppression du plan');
        }
      }}
    >
      Supprimer
    </BaseButton>
  );
};
