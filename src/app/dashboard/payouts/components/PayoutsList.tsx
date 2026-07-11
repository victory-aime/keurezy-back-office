'use client';
import {
  BaseContainer,
  BaseFormatNumber,
  BaseTag,
  BaseText,
  ColumnsDataTable,
  DataTableContainer,
} from '_components/custom';
import { PaymentModule } from '_store/state-management';
import { useRouter } from 'next/navigation';
import { BO_ROUTES } from '@/app/routes';
import { CONSTANTS, ENUM } from '_types/';
import { convertDateFormat } from 'rise-core-frontend';
import { VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { MODELS } from '_types/';
import { FormikValues } from 'formik';
import { PayoutFilters } from './PayoutFilters';

export const PayoutsList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [filterValues, setFilterValues] = useState<MODELS.IGetPayoutParams | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const queryPayload = useMemo(
    () => ({
      params: {
        ...filterValues,
        page: currentPage,
        limit: CONSTANTS.PAGINATION.TEN_ITEMS_PER_PAGE,
      },
    }),
    [currentPage, filterValues],
  );

  const {
    data: allRefunds,
    isFetching,
    refetch,
  } = PaymentModule.getAllRefundsQueries(queryPayload);

  const handleFilter = async (values: FormikValues) => {
    const [startDate, endDate] = values.date ?? [];
    const { date, ...rest } = values;

    setFilterValues({
      ...rest,
      payment_method: values?.payment_method && values?.payment_method[0],
      status: values?.status && values?.status[0],
      start_date: startDate?.toDate('UTC').toISOString(),
      end_date: endDate?.toDate('UTC').toISOString(),
    });
    setCurrentPage(currentPage);
  };

  const handleResetFilter = async () => {
    setFilterValues(null);
    setCurrentPage(currentPage);
    await refetch();
  };

  const columns: ColumnsDataTable[] = [
    {
      header: 'Client',
      accessor: 'recipient',
      cell: (customer: { first_name: string; last_name: string; phone: string }) => {
        return (
          <VStack alignItems={'flex-start'} gap={0}>
            <BaseText>
              {customer.first_name} {customer.last_name}
            </BaseText>
            <BaseText fontSize={'xs'} color={'fg.muted'}>
              {customer.phone}
            </BaseText>
          </VStack>
        );
      },
    },
    {
      header: 'Montant Restitué',
      accessor: 'amount',
      cell: (amount: number) => <BaseFormatNumber value={amount} />,
    },
    {
      header: 'Statut',
      accessor: 'payout_status',
      cell: (payout_status) => <BaseTag status={payout_status?.toUpperCase()} />,
    },
    {
      header: 'Initié le',
      accessor: 'created_at',
      cell: (date) => {
        return <>{convertDateFormat(date)}</>;
      },
    },
    {
      header: 'Payé le',
      accessor: 'paid_at',
      cell: (date) => {
        return <>{convertDateFormat(date)}</>;
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'view',
          handleClick: (value) => router.push(`${BO_ROUTES.PAYOUTS.DETAILS}?id=${value.order_id}`),
        },
      ],
    },
  ];

  const paginationAction = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <BaseContainer
      title={'Remboursements'}
      description={'Consulter tout les remboursements effectués'}
      border={'none'}
      withActionButtons
      isFilterActive={openFilter}
      onToggleFilter={() => setOpenFilter(!openFilter)}
      filterComponent={
        <PayoutFilters
          isOpen={false}
          onChange={async () => {
            setOpenFilter(!openFilter);
            await handleResetFilter();
          }}
          data={filterValues}
          callback={handleFilter}
          isLoading={isFetching}
        />
      }
      actionsButtonProps={{
        onReload: async () => {
          await refetch();
        },
      }}
    >
      <DataTableContainer
        data={allRefunds?.payouts ?? []}
        columns={columns}
        isLoading={isFetching}
        onOpenSelectRow={(row) => router.push(`${BO_ROUTES.PAYOUTS.DETAILS}?id=${row.order_id}`)}
        initialPage={currentPage}
        paginationData={{
          lazy: true,
          currentPage,
          totalDataPerPage: allRefunds?.pagination.limit!,
          totalItems: allRefunds?.pagination.total_count!,
          totalPages: allRefunds?.pagination.total_pages,
          onLazyLoad: (page) => {
            paginationAction(page);
          },
        }}
        hidePagination={allRefunds?.pagination?.page === 1}
        isOpenSelect
      />
    </BaseContainer>
  );
};
