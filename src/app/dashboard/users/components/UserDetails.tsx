'use client';
import { BO_ROUTES } from '@/app/routes';
import { BaseButton, BaseContainer, BaseTabs, BaseTag, BaseText, Icons } from '_components/custom';
import { UserModule } from '_store/state-management';
import { ProfileSection } from './ProfileSection';
import { SessionSection } from './SessionSection';
import { Box, Flex } from '@chakra-ui/react';
import { Avatar } from '_components/ui/avatar';
import { IsDetailsDataLoad } from '@/app/components/DetailsLoad';
import { useRouter } from 'next/navigation';
import { ENUM } from '@/types';
import { Status } from '@/types/enum/common';

export const UserDetails = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const {
    data: userData,
    isFetching: isLoading,
    refetch,
  } = UserModule.getUserQueries({
    params: { userId },
    queryOptions: { enabled: !!userId },
  });

  const { mutateAsync: updateUser, isPending } = UserModule.updateUserMutation({
    mutationOptions: {
      onSuccess: async () => {
        await refetch();
      },
    },
  });

  const isActive = userData?.status === ENUM.COMMON.Status.ACTIVE;

  const userDetailsAccordions = [
    {
      label: 'Informations',
      icon: <Icons.User />,
      content: <ProfileSection data={userData} />,
    },
    {
      label: 'Sessions',
      icon: <Icons.Desktop />,
      content: <SessionSection data={userData} />,
      totalItems: userData?.sessions?.length,
    },
  ];

  return (
    <BaseContainer border={'none'}>
      {isLoading ? (
        <IsDetailsDataLoad />
      ) : (
        <>
          <Flex align={{ base: 'flex-start', sm: 'center' }} justify="space-between" width="100%">
            <Flex align="center" gap={4}>
              <Avatar size="lg" colorPalette="blue" name={userData?.name} />
              <Box>
                <Flex align="center" gap={2} mb={1} flexWrap="wrap">
                  <BaseText fontSize="xl" fontWeight="600" textTransform={'uppercase'}>
                    {userData?.name}
                  </BaseText>
                  <BaseTag status={userData?.status} />
                  <BaseTag
                    status={userData?.status}
                    colorPalette={'blue'}
                    color={userData?.role === ENUM.AppRole.OWNER ? 'blue' : 'orange'}
                    label={userData?.role === ENUM.AppRole.OWNER ? "Chef d'agence" : 'Utilisateur'}
                  />
                </Flex>
                <BaseText fontSize="sm" color="gray.500">
                  {[userData?.address, userData?.email, userData?.phone]
                    .filter(Boolean)
                    .join(' · ')}
                </BaseText>
              </Box>
            </Flex>
            <Flex gap={3}>
              <BaseButton
                variant={'outline'}
                colorType={!isActive ? 'success' : 'danger'}
                isLoading={isPending}
                onClick={async () =>
                  await updateUser({
                    payload: { status: isActive ? Status.INACTIVE : Status.ACTIVE },
                    params: { id: userData?.id! },
                  })
                }
              >
                {isActive ? 'Désactiver' : 'Activer'}
              </BaseButton>
              {userData?.owner?.agency?.id && (
                <BaseButton
                  variant={'outline'}
                  colorType={'info'}
                  onClick={async () => {
                    router.push(`${BO_ROUTES.AGENCIES.DETAILS}?id=${userData?.owner?.agency?.id}`);
                  }}
                >
                  Voir l'agence
                </BaseButton>
              )}
            </Flex>
          </Flex>
          <BaseTabs width={'full'} variant={'line'} items={userDetailsAccordions} />
        </>
      )}
    </BaseContainer>
  );
};
