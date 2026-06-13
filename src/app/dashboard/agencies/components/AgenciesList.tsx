'use client';
import { BaseContainer, BaseTag, ColumnsDataTable, DataTableContainer } from '_components/custom';
import { AgencyModule } from '_store/state-management';
import { useRouter } from 'next/navigation';
import { BO_ROUTES } from '@/app/routes';

export const AgenciesList = () => {
  const { data: allAgencies, isFetching } = AgencyModule.allAgenciesListQueries({});
  const router = useRouter();

  const agenciesColumns: ColumnsDataTable[] = [
    {
      header: '',
      accessor: 'select',
    },
    {
      header: 'Nom',
      accessor: 'name',
    },
    {
      header: 'Chef agence',
      accessor: 'owner',
      cell: (value: { user: { name: string } }) => value?.user?.name,
    },
    {
      header: 'Tel',
      accessor: 'phone',
    },
    {
      header: 'Adresse',
      accessor: 'address',
    },
    {
      header: 'Statut',
      accessor: 'status',
      cell: (status) => <BaseTag status={status} />,
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'view',
          handleClick: (value) => {
            router.push(`${BO_ROUTES.AGENCIES.DETAILS}?id=${value.id}`);
          },
        },
      ],
    },
  ];

  return (
    <BaseContainer
      title={'Liste des agences'}
      description={'Consulter et gerer toute les agences disponible dans Keurezy'}
      border={'none'}
    >
      <DataTableContainer
        data={allAgencies}
        columns={agenciesColumns}
        isLoading={isFetching}
        onOpenSelectRow={(row) => router.push(`${BO_ROUTES.AGENCIES.DETAILS}?id=${row.id}`)}
        isOpenSelect
        hidePagination
      />
    </BaseContainer>
  );
};
