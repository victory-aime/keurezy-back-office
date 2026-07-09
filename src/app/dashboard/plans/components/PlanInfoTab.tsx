'use client';

import { DisplayInfoRow } from '@/app/components/DisplayInfoRow';
import {
  BaseTag,
  BaseFormatNumber,
  DataTableContainer,
  BaseText,
  ColumnsDataTable,
} from '@/components/custom';
import { Flex, Icon, HStack } from '@chakra-ui/react';
import { LuBuilding, LuUser, LuFileText, LuHeadphones, LuMegaphone, LuUsers } from 'react-icons/lu';
import { ENUM, MODELS } from '@/types';
import { IconType } from 'react-icons';
import { DetailsContainer } from '@/app/components/DetailsContainer';
import { useTranslation } from 'react-i18next';

export const PlanInfoTab = ({ planInfo }: { planInfo: MODELS.IPlan | undefined }) => {
  const { t } = useTranslation();
  const commercialFeatures = planInfo?.planFeatures?.filter((pf) => pf.feature.isCommercial) ?? [];

  const CATEGORY_ICONS: Record<string, IconType> = {
    PROPERTIES: LuBuilding,
    ANNONCES: LuMegaphone,
    USERS: LuUsers,
    SUPPORT: LuHeadphones,
  };

  const CATEGORY_LABELS: Record<string, string> = {
    PROPERTIES: 'Biens',
    ANNONCES: 'Annonces',
    USERS: 'Utilisateurs',
    SUPPORT: 'Support',
  };

  const featureColumns: ColumnsDataTable[] = [
    {
      header: 'Nom',
      accessor: 'fullObject',
      cell: (row) => {
        const feature = row.feature;
        const IconComponent = CATEGORY_ICONS[feature.category] || LuFileText;

        return (
          <Flex align="center" gap={2}>
            <Icon as={IconComponent} boxSize={4} color="gray.400" />
            <BaseText fontSize="sm" fontWeight="500">
              {t(`PERMISSIONS.FEATURE_LIST.${feature.name.toUpperCase()}`)}
            </BaseText>
          </Flex>
        );
      },
    },
    {
      header: 'Catégorie',
      accessor: 'fullObject',
      cell: (row) => {
        const feature = row.feature;
        const categoryLabel = CATEGORY_LABELS[feature.category] || feature.category;

        return (
          <BaseText fontSize="sm" fontWeight="500">
            {CATEGORY_LABELS[categoryLabel] || feature.category}
          </BaseText>
        );
      },
    },

    {
      header: 'Limite',
      accessor: 'limit',
      cell: (limit) => (
        <BaseText color={limit === null ? 'tertiary.500' : 'primary.500'}>
          {limit === null ? 'Illimité' : limit}
        </BaseText>
      ),
    },
    {
      header: 'Statut',
      accessor: 'enabled',
      cell: (enabled) =>
        enabled ? (
          <BaseTag status={ENUM.COMMON.Status.ACTIVE} />
        ) : (
          <BaseTag status={ENUM.COMMON.Status.INACTIVE} />
        ),
    },
  ];

  return (
    <DetailsContainer>
      <Flex align="center" gap={2} mb={4}>
        <Icon as={LuBuilding} boxSize={4} color="gray.400" />
        <BaseText
          fontSize="xs"
          fontWeight="600"
          color="gray.400"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Informations générales
        </BaseText>
      </Flex>

      <DisplayInfoRow icon={LuUser} label="Nom du plan">
        <Flex align="center" gap={2}>
          <BaseText fontSize="sm" fontWeight="500" textTransform="uppercase">
            {t(`SUBSCRIPTION.PLANS.${planInfo?.name}`)}
          </BaseText>
          <BaseTag
            status={planInfo?.status ? ENUM.COMMON.Status.ACTIVE : ENUM.COMMON.Status.INACTIVE}
          />
        </Flex>
      </DisplayInfoRow>
      <DisplayInfoRow icon={LuFileText} label="Tarifications">
        <HStack gap={2} alignItems={'center'}>
          {planInfo?.pricing?.map((price) => (
            <BaseText>
              <BaseFormatNumber value={price.price} />
              <BaseText as="span" fontSize="sm" color="gray.500">
                {' '}
                / {t(`SUBSCRIPTION.BILLING_CYCLE.${price.billingCycle}`)}
              </BaseText>
            </BaseText>
          ))}
        </HStack>
      </DisplayInfoRow>
      <DisplayInfoRow icon={LuFileText} label="Réduction Annuelle">
        <HStack gap={2} alignItems={'center'}>
          {planInfo?.pricing?.map((price) => (
            <BaseText fontSize="xs" color="gray.500" textTransform="uppercase">
              {price.discountPercentage && (
                <BaseTag colorScheme="green" label={` -${price.discountPercentage}%`} />
              )}
            </BaseText>
          ))}
        </HStack>
      </DisplayInfoRow>

      <DataTableContainer data={commercialFeatures ?? []} columns={featureColumns} hidePagination />
    </DetailsContainer>
  );
};
