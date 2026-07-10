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
import { PaymentFilter } from '@/app/dashboard/payments/components/PaymentFilter';
import { FormikValues } from 'formik';

export const PaymentsList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [filterValues, setFilterValues] = useState<MODELS.IGetTransactionsParams | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const queryPayload = useMemo(
    () => ({
      params: {
        ...filterValues,
        page: currentPage,
        limit: CONSTANTS.PAGINATION.FIVE_ITEMS_PER_PAGE,
      },
    }),
    [currentPage, filterValues],
  );

  const {
    data: allTransactions,
    isFetching,
    refetch,
  } = PaymentModule.getAllTransactionsQueries(queryPayload);

  const handleFilter = async (values: FormikValues) => {
    const [startDate, endDate] = values.date ?? [];
    const { date, ...rest } = values;

    setFilterValues({
      ...rest,
      paymentMethod: values?.paymentMethod && values?.paymentMethod[0],
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
    { header: '', accessor: 'select' },
    {
      header: 'Client',
      accessor: 'customer',
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
      header: 'Plan souscris',
      accessor: 'products',
      cell: (products: { name: string; price: number }[]) => {
        const planType = products[0].name.replace(/^Abonnement\s+/, '') as ENUM.PlanType;
        return (
          <VStack alignItems={'flex-start'} gap={0}>
            <BaseText>{t(`SUBSCRIPTION.PLANS.${planType}`)}</BaseText>
            <BaseText fontSize={'xs'} color={'fg.muted'}>
              <BaseFormatNumber value={products[0].price} />
            </BaseText>
          </VStack>
        );
      },
    },
    {
      header: 'Montant payé',
      accessor: 'amount',
      cell: (amount: number) => <BaseFormatNumber value={amount} />,
    },
    {
      header: 'Frais payé',
      accessor: 'fees',
      cell: (fees: number) => <BaseFormatNumber value={fees} />,
    },
    {
      header: 'Statut',
      accessor: 'transaction_status',
      cell: (transaction_status) => <BaseTag status={transaction_status?.toUpperCase()} />,
    },
    {
      header: 'Date',
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
          handleClick: (value) => router.push(`${BO_ROUTES.PAYMENTS.DETAILS}?id=${value.order_id}`),
        },
      ],
    },
  ];

  const paginationAction = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <BaseContainer
      title={'Transactions'}
      description={'Consulter toutes les transactions de paiement'}
      border={'none'}
      withActionButtons
      isFilterActive={openFilter}
      onToggleFilter={() => setOpenFilter(!openFilter)}
      filterComponent={
        <PaymentFilter
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
        data={allTransactions?.transactions ?? []}
        columns={columns}
        isLoading={isFetching}
        onOpenSelectRow={(row) => router.push(`${BO_ROUTES.PAYMENTS.DETAILS}?id=${row.order_id}`)}
        initialPage={currentPage}
        paginationData={{
          lazy: true,
          currentPage,
          totalDataPerPage: allTransactions?.pagination.limit!,
          totalItems: allTransactions?.pagination.total_count!,
          totalPages: allTransactions?.pagination.total_pages,
          onLazyLoad: (page) => {
            paginationAction(page);
          },
        }}
        isOpenSelect
      />
    </BaseContainer>
  );
};
