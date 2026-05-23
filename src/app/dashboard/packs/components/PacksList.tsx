'use client';

import {
  BaseContainer,
  BaseFormatNumber,
  BaseTag,
  BaseText,
  ColumnsDataTable,
  DataTableContainer,
} from '_components/custom';
import { PacksModule } from '_store/state-management';
import { MODELS } from '@/types';
import { useState } from 'react';
import { formatDisplayDate } from 'rise-core-frontend';
import { PackDetails } from './PackDetails';

export const PackList = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedPack, setSelectedPack] = useState<MODELS.IPacksResponse | null>(null);
  const { data: packsData, isLoading, refetch } = PacksModule.getAllPacksQueries({});

  const packsColumns: ColumnsDataTable[] = [
    {
      header: 'Nom du pack',
      accessor: 'name',
    },
    {
      header: 'Prix du pack',
      accessor: 'fullObject',
      cell: (row) => <BaseFormatNumber value={row?.commissionRate} style="percent" />,
    },
    {
      header: 'Status',
      accessor: 'isActive',
      cell: (isActive) => (
        <BaseTag color={isActive ? 'green' : 'red'} label={isActive ? 'Actif' : 'Inactif'} />
      ),
    },
    {
      header: 'Total souscription',
      accessor: 'subscriptions',
      cell: (subscriptions: string[]) => <BaseText>{subscriptions?.length}</BaseText>,
    },
    {
      header: 'Date de création',
      accessor: 'createdAt',
      cell: (createdAt) => <BaseText>{formatDisplayDate(createdAt)}</BaseText>,
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'edit',
          handleClick: (row) => {
            setSelectedPack(row);
          },
        },
        {
          name: 'view',
          handleClick: (row) => {
            setOpenDetails(true);
            setSelectedPack(row);
          },
        },
        {
          name: 'delete',
          handleClick: (row) => {
            setSelectedPack(row);
          },
        },
      ],
    },
  ];

  return (
    <BaseContainer
      title="Liste des packs"
      border={'none'}
      withActionButtons
      actionsButtonProps={{
        onReload: async () => {
          await refetch();
        },
      }}
    >
      <DataTableContainer
        data={packsData ?? []}
        columns={packsColumns}
        isLoading={isLoading}
        hidePagination
      />
      <PackDetails onChange={setOpenDetails} isOpen={openDetails} data={selectedPack} />
    </BaseContainer>
  );
};
