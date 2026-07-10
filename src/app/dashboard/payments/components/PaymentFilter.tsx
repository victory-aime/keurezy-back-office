import React from 'react';

import { Formik } from 'formik';
import { createListCollection, VStack, HStack } from '@chakra-ui/react';
import {
  ActionsButton,
  FormDatePicker,
  FormPhonePicker,
  FormSelect,
  FormTextInput,
  Icons,
  ModalOpenProps,
} from '_components/custom';
import { MODELS, VALIDATION } from '_types/';
import * as Yup from 'yup';

interface IPaymentFilters extends ModalOpenProps {
  data: MODELS.IGetTransactionsParams | null;
}

export const PaymentFilter = ({
  onChange,
  isLoading,
  callback = () => {},
  data,
}: IPaymentFilters) => {
  const paymentMethodList = createListCollection({
    items: [
      { label: 'Wave', value: 'wave' },
      { label: 'Orange', value: 'orange' },
    ].map((method) => ({
      label: method.label,
      value: method.value,
    })),
  });
  const statusPaymentList = createListCollection({
    items: [
      {
        label: 'En attente',
        value: 'pending',
      },
      {
        label: 'Payé',
        value: 'paid',
      },
      {
        label: 'Payé et bloqué',
        value: 'paid_and_blocked',
      },
      {
        label: 'Remboursé',
        value: 'refunded',
      },
      {
        label: 'Annulé',
        value: 'cancelled',
      },
    ].map((status) => ({
      label: status.label,
      value: status.value,
    })),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{} as MODELS.IGetTransactionsParams}
      onSubmit={callback}
      onReset={onChange}
      validationSchema={() =>
        Yup.object().shape({
          customer_phone: VALIDATION.PHONE_VALIDATION.phoneSchema({ required: false }),
        })
      }
    >
      {({ setFieldValue, resetForm, handleSubmit, values }) => (
        <VStack alignItems={'flex-end'} gap={'3'}>
          <HStack width={'full'}>
            <FormTextInput name={'min_amount'} type={'amount'} placeholder={'Montant minimal'} />
            <FormTextInput name={'max_amount'} type={'amount'} placeholder={'Montant maximal'} />
          </HStack>
          <HStack width={'full'}>
            <FormPhonePicker
              name={'customer_phone'}
              placeholder={'Numéro de téléphone client'}
              listAvailableCountries={['sn']}
            />
            <FormSelect
              name={'status'}
              placeholder={'Statut'}
              listItems={statusPaymentList}
              setFieldValue={setFieldValue}
            />
          </HStack>
          <HStack width={'full'}>
            <FormDatePicker name={'date'} mode={'range'} />
          </HStack>
          <FormSelect
            name={'paymentMethod'}
            placeholder={'Methode de paiement'}
            listItems={paymentMethodList}
            setFieldValue={setFieldValue}
          />
          <ActionsButton
            justifyContent={'flex-end'}
            mt={4}
            cancelShow={!!data}
            icon={<Icons.Search />}
            cancelVariant={'outline'}
            onClick={() => handleSubmit()}
            validateTitle={'Rechercher'}
            cancelTitle={'COMMON.CLEAR_FILTER'}
            isLoading={isLoading}
            onCancel={() => resetForm()}
          />
        </VStack>
      )}
    </Formik>
  );
};
