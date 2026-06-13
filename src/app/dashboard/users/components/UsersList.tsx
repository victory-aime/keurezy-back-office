'use client';
import { BO_ROUTES } from '@/app/routes';
import {
  BaseContainer,
  BaseTag,
  BaseText,
  ColumnsDataTable,
  DataTableContainer,
  Icons,
} from '_components/custom';
import { Avatar } from '_components/ui/avatar';
import { UserModule } from '_store/state-management';
import { VariablesColors } from '_theme/variables';
import { CONSTANTS } from '@/types';
import { Flex, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatCreatedAt } from 'rise-core-frontend';

export const UsersList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allUsers,
    isLoading,
    refetch: refetchAllUsers,
  } = UserModule.getAllUserQueries({
    params: {
      initialPage: currentPage,
      limitPerPage: CONSTANTS.PAGINATION.TEN_ITEMS_PER_PAGE,
    },
  });

  const usersColumns: ColumnsDataTable[] = [
    {
      header: '',
      accessor: 'select',
    },
    {
      header: 'Utilisateur',
      accessor: 'fullObject',
      cell: (value: { name: string; image: string; email: string }) => {
        return (
          <Flex alignItems={'center'} gap={2} width={'fit-content'}>
            <Avatar name={value.name} src={value.image} />
            <Stack gap={0}>
              <BaseText>{value?.name}</BaseText>
              <BaseText fontSize={'xs'} color={'gray.400'}>
                {value?.email}
              </BaseText>
            </Stack>
          </Flex>
        );
      },
    },
    {
      header: 'Role',
      accessor: 'role',
      cell: (role: 'OWNER' | 'CLIENT') => (
        <BaseTag
          color={role === 'OWNER' ? 'blue' : 'orange'}
          label={role === 'OWNER' ? "Chef d'agence" : 'Utilisateur'}
        />
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (status) => <BaseTag status={status} />,
    },

    {
      header: 'Créé le',
      accessor: 'createdAt',
      cell: (value: string) => formatCreatedAt(value),
    },

    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'view',
          handleClick: (value: { id: string }) =>
            router.push(`${BO_ROUTES.USERS.DETAILS}?userId=${value?.id}`),
        },
      ],
    },
  ];

  const paginationAction = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <BaseContainer
      title="Liste des utilisateurs"
      border={'none'}
      withActionButtons
      actionsButtonProps={{
        onReload() {
          refetchAllUsers();
        },
      }}
    >
      <DataTableContainer
        data={allUsers?.content ?? []}
        isOpenSelect
        columns={usersColumns}
        isLoading={isLoading}
        initialPage={currentPage}
        onOpenSelectRow={(row) => router.push(`${BO_ROUTES.USERS.DETAILS}?userId=${row?.id}`)}
        paginationData={{
          lazy: true,
          currentPage,
          onLazyLoad: (index) => paginationAction(index),
          totalDataPerPage: allUsers?.totalDataPerPages || 5,
          totalItems: allUsers?.totalItems,
          totalPages: allUsers?.totalPages,
        }}
        hidePagination={allUsers?.totalPages === 1}
      />
    </BaseContainer>
  );
};
