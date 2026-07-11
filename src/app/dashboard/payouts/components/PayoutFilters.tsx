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

interface IPayoutFilters extends ModalOpenProps {
  data: MODELS.IGetTransactionsParams | null;
}

export const PayoutFilters = ({
  onChange,
  isLoading,
  callback = () => {},
  data,
}: IPayoutFilters) => {
  const paymentMethodList = createListCollection({
    items: [
      { label: 'Wave', value: 'wave' },
      { label: 'Orange', value: 'orange_money' },
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
        label: 'Terminé',
        value: 'completed',
      },
      {
        label: 'Echoué',
        value: 'failed',
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
      initialValues={{} as MODELS.IGetPayoutParams}
      onSubmit={callback}
      onReset={onChange}
      validationSchema={() =>
        Yup.object().shape({
          recipient_phone: VALIDATION.PHONE_VALIDATION.phoneSchema({ required: false }),
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
              name={'recipient_phone'}
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
            name={'payment_method'}
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
