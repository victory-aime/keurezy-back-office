'use client';

import { BaseButton, FormTextInput, Icons } from '_components/custom';
import { useRouter } from 'next/navigation';
import { VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '_hooks/useAuth';
import { Formik, FormikValues } from 'formik';
import { VALIDATION } from '_types/index';
import { useState } from 'react';
import { AuthBoxContainer } from './AuthBoxContainer';
import { BO_ROUTES } from '@/app/routes';

export const SignIn = ({ callbackUrl = BO_ROUTES.ROOT }: { callbackUrl?: string }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (values: FormikValues) => {
    setIsLoading(true);
    await login({
      email: values.email,
      password: values.password,
      callbackUrl,
    })
      .catch((error) => console.log('error', error))
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthBoxContainer title={'Bienvenue !'}>
      <Formik
        initialValues={{ email: '', password: '' }}
        enableReinitialize
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.resetForm();
        }}
        validationSchema={VALIDATION.AUTH.loginValidationSchema}
      >
        {({ values, handleSubmit }) => (
          <VStack width="full" gap={4}>
            <FormTextInput
              name="email"
              placeholder={'FORM.EMAIL_PLACEHOLDER'}
              value={values.email}
              leftAccessory={<Icons.Mail />}
            />
            <FormTextInput
              name="password"
              type="password"
              placeholder={'FORM.PASSWORD_PLACEHOLDER'}
              value={values.password}
            />
            <BaseButton
              withGradient
              isLoading={isLoading}
              width={'full'}
              colorType={'primary'}
              onClick={() => {
                handleSubmit();
              }}
            >
              {t('COMMON.LOGIN')}
            </BaseButton>
          </VStack>
        )}
      </Formik>
    </AuthBoxContainer>
  );
};
