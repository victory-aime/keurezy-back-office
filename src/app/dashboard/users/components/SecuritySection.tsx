import { BaseText, Icons } from '_components/custom';
import { VariablesColors } from '_theme/variables';
import { MODELS } from '@/types';
import { VStack, Flex, HStack, Separator } from '@chakra-ui/react';

export const SecuritySection = ({ data }: { data: MODELS.IUserInfoResponse | undefined }) => {
  return (
    <VStack align="stretch" gap={0}>
      <Flex py={2} justify="space-between">
        <BaseText>Email verified</BaseText>
        <HStack>
          {data?.emailVerified ? (
            <Icons.CircleCheck color={VariablesColors.success} size={18} />
          ) : (
            <Icons.CircleClose color={VariablesColors.danger} size={18} />
          )}
          <BaseText>{data?.emailVerified ? 'Yes' : 'No'}</BaseText>
        </HStack>
      </Flex>

      <Separator />

      <Flex py={2} justify="space-between">
        <BaseText>2FA Enabled</BaseText>
        <HStack>
          {data?.twoFactorEnabled ? (
            <Icons.CircleCheck color={VariablesColors.success} size={18} />
          ) : (
            <Icons.CircleClose color={VariablesColors.danger} size={18} />
          )}
          <BaseText>{data?.twoFactorEnabled ? 'Yes' : 'No'}</BaseText>
        </HStack>
      </Flex>

      <Separator />

      <Flex py={2} justify="space-between" align="flex-start">
        <BaseText>Linked Providers</BaseText>

        <VStack align="flex-end" gap={1}>
          {data?.accounts?.length ? (
            data.accounts.map((account, idx) => (
              <HStack key={idx}>
                <Icons.World size={16} color={VariablesColors.blue} />
                <BaseText fontSize="sm">{account?.providerId}</BaseText>
              </HStack>
            ))
          ) : (
            <BaseText color="gray.400" fontSize="sm">
              Aucun provider
            </BaseText>
          )}
        </VStack>
      </Flex>
    </VStack>
  );
};
