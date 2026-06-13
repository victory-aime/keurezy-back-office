'use client';

import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { AgencyModule } from '_store/state-management';
import { DocumentPreviewModal } from '../components/DocumentPreviewModal';
import { ENUM } from '_types/';
import { AgencyInfoTab } from '../components/AgencyInfoTab';
import { AgencyStatsTab } from '../components/AgencyStatsTab';
import { AgencySubscriptionsTab } from '../components/AgencySubscriptionsTab';
import { AgencyDocumentsTab } from '../components/AgencyDocumentsTab';
import { BaseButton, BaseContainer, BaseTabs, BaseTag, BaseText } from '_components/custom';
import { Avatar } from '@/components/ui/avatar';
import { Status } from '@/types/enum/common';
import { IsDetailsDataLoad } from '@/app/components/DetailsLoad';

export const AgencyDetails = ({ id }: { id: string }) => {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: agencyInfo,
    isFetching,
    refetch,
  } = AgencyModule.getAgencyInfo({
    params: { id },
    queryOptions: { enabled: !!id },
  });

  const { mutateAsync: updateAgencyStatus, isPending } = AgencyModule.updateAgencyMutation({
    mutationOptions: {
      onSuccess: async () => {
        await refetch();
        AgencyModule.AgencyCache.invalidateAllAgencyCache();
      },
    },
  });

  const handleOpenDoc = (url: string) => {
    setSelectedDoc(url);
    setIsOpen(true);
  };

  const isActive = agencyInfo?.status === ENUM.COMMON.Status.OPEN;

  return (
    <BaseContainer border={'none'}>
      {isFetching ? (
        <IsDetailsDataLoad />
      ) : (
        <>
          <Flex align={{ base: 'flex-start', sm: 'center' }} justify="space-between" width="100%">
            <Flex align="center" gap={4}>
              <Avatar size="lg" colorPalette="blue" name={agencyInfo?.name} />
              <Box>
                <Flex align="center" gap={2} mb={1} flexWrap="wrap">
                  <BaseText fontSize="xl" fontWeight="600" textTransform={'uppercase'}>
                    {agencyInfo?.name}
                  </BaseText>
                  <BaseTag status={agencyInfo?.status} />
                  <BaseTag
                    color={agencyInfo?.isVerified ? 'green' : 'red'}
                    label={agencyInfo?.isVerified ? 'Verifiée' : 'En attente de validation'}
                  />
                </Flex>
                <BaseText fontSize="sm" color="gray.500">
                  {[agencyInfo?.address, agencyInfo?.email, agencyInfo?.phone]
                    .filter(Boolean)
                    .join(' · ')}
                </BaseText>
              </Box>
            </Flex>
            <BaseButton
              variant={'outline'}
              colorType={!isActive ? 'success' : 'danger'}
              isLoading={isPending}
              onClick={async () => {
                await updateAgencyStatus({
                  payload: { status: isActive ? Status.PENDING : Status.OPEN },
                  params: { id: agencyInfo?.id! },
                });
              }}
            >
              {isActive ? 'Désactiver' : 'Activer'}
            </BaseButton>
          </Flex>
          <BaseTabs
            variant={'line'}
            width={'full'}
            items={[
              {
                label: 'Informations',
                content: <AgencyInfoTab data={agencyInfo} />,
              },
              {
                label: 'Statistiques',
                content: <AgencyStatsTab stats={agencyInfo?.stats} />,
              },
              {
                label: 'Abonnements',
                content: <AgencySubscriptionsTab subscriptions={agencyInfo?.subscriptions ?? []} />,
              },
              {
                label: `Documents`,
                totalItems: agencyInfo?.documents?.length,
                content: (
                  <AgencyDocumentsTab
                    documents={agencyInfo?.documents ?? []}
                    onOpenDoc={handleOpenDoc}
                    file={selectedDoc!}
                  />
                ),
              },
            ]}
          />
        </>
      )}
      <DocumentPreviewModal isOpen={isOpen} onChange={setIsOpen} data={selectedDoc} />
    </BaseContainer>
  );
};
