import { BaseText, Icons } from '_components/custom';
import { MODELS } from '@/types';
import { Flex, HStack, Text, Box, Icon } from '@chakra-ui/react';
import { formatCreatedAt } from 'rise-core-frontend';
import { VariablesColors } from '_theme/variables';
import { DisplayInfoRow } from '@/app/components/DisplayInfoRow';

export const ProfileSection = ({ data }: { data: MODELS.IUserInfoResponse | undefined }) => {
  return (
    <Box
      _dark={{ bg: 'gray.800' }}
      border="0.5px solid"
      borderColor="inherit"
      borderRadius="xl"
      px={6}
      py={4}
    >
      <Flex align="center" gap={2} mb={4}>
        <Icon as={Icons.User} boxSize={4} color="gray.400" />
        <Text
          fontSize="xs"
          fontWeight="600"
          color="gray.400"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Informations générales
        </Text>
      </Flex>

      <DisplayInfoRow icon={Icons.Mail} label="Email">
        <Text fontSize="sm" color="blue.600" _dark={{ color: 'blue.400' }}>
          {data?.email ?? '—'}
        </Text>
      </DisplayInfoRow>
      <DisplayInfoRow icon={Icons.SendMail} label="Email vérifiée">
        <HStack>
          {data?.emailVerified ? (
            <Icons.CircleCheck color={VariablesColors.success} size={18} />
          ) : (
            <Icons.CircleClose color={VariablesColors.danger} size={18} />
          )}
          <BaseText>{data?.emailVerified ? 'Yes' : 'No'}</BaseText>
        </HStack>
      </DisplayInfoRow>
      <DisplayInfoRow icon={Icons.Shield} label="2FA activée">
        <HStack>
          {data?.twoFactorEnabled ? (
            <Icons.CircleCheck color={VariablesColors.success} size={18} />
          ) : (
            <Icons.CircleClose color={VariablesColors.danger} size={18} />
          )}
          <BaseText>{data?.twoFactorEnabled ? 'Yes' : 'No'}</BaseText>
        </HStack>
      </DisplayInfoRow>
      <DisplayInfoRow icon={Icons.FingerPrint} label="PasswordLess activée">
        <HStack>
          {data?.passkeys?.length
            ? data.passkeys.slice(0, 5).map((account, idx) => (
                <HStack key={idx}>
                  <Icons.Check size={16} color={VariablesColors.blue} />
                  <BaseText fontSize="sm" textTransform={'uppercase'}>
                    {account?.name}
                  </BaseText>
                </HStack>
              ))
            : 'N/A'}
        </HStack>
      </DisplayInfoRow>
      <DisplayInfoRow icon={Icons.World} label="Methodes de connexion">
        {data?.accounts?.length
          ? data.accounts.map((account, idx) => (
              <HStack key={idx}>
                <Icons.World size={16} color={VariablesColors.blue} />
                <BaseText fontSize="sm" textTransform={'uppercase'}>
                  {account?.providerId}
                </BaseText>
              </HStack>
            ))
          : 'N/A'}
      </DisplayInfoRow>
      <DisplayInfoRow icon={Icons.Calendar} label="Créé le">
        <BaseText>{formatCreatedAt(data?.createdAt!)}</BaseText>
      </DisplayInfoRow>
      <DisplayInfoRow icon={Icons.Calendar} label="Mis a jour le">
        <BaseText>{formatCreatedAt(data?.updatedAt!)}</BaseText>
      </DisplayInfoRow>
    </Box>
  );
};
