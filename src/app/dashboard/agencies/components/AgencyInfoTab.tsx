'use client';

import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import {
  LuBuilding,
  LuUser,
  LuMail,
  LuPhone,
  LuMapPin,
  LuFileText,
  LuShieldCheck,
  LuCalendar,
  LuShieldX,
} from 'react-icons/lu';
import { formatDisplayDate } from 'rise-core-frontend';
import { MODELS } from '_types/';
import { BaseTag } from '_components/custom';
import { DisplayInfoRow } from '@/app/components/DisplayInfoRow';

interface AgencyInfoTabProps {
  data: MODELS.IAgencyDetailsResponse | undefined;
}

export const AgencyInfoTab = ({ data }: AgencyInfoTabProps) => {
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
        <Icon as={LuBuilding} boxSize={4} color="gray.400" />
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

      <DisplayInfoRow icon={LuUser} label="Propriétaire">
        <Flex align="center" gap={2}>
          <Text fontSize="sm" fontWeight="500" textTransform="uppercase">
            {data?.name ?? '—'}
          </Text>
          <BaseTag status={data?.status} />
        </Flex>
      </DisplayInfoRow>

      <DisplayInfoRow icon={LuMail} label="Email">
        <Text fontSize="sm" color="blue.600" _dark={{ color: 'blue.400' }}>
          {data?.email ?? '—'}
        </Text>
      </DisplayInfoRow>

      <DisplayInfoRow icon={LuPhone} label="Téléphone">
        <Text fontSize="sm" fontWeight="500">
          {data?.phone ?? '—'}
        </Text>
      </DisplayInfoRow>

      <DisplayInfoRow icon={LuMapPin} label="Adresse">
        <Text fontSize="sm" fontWeight="500">
          {data?.address ?? '—'}
        </Text>
      </DisplayInfoRow>

      <DisplayInfoRow icon={LuFileText} label="Description">
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }} lineHeight="tall">
          {data?.description ?? '—'}
        </Text>
      </DisplayInfoRow>

      <DisplayInfoRow icon={data?.isVerified ? LuShieldCheck : LuShieldX} label="Vérification">
        <BaseTag
          label={data?.isVerified ? 'Agence vérifiée' : 'Non vérifiée'}
          color={data?.isVerified ? 'green' : 'red'}
        />
      </DisplayInfoRow>

      <DisplayInfoRow icon={LuCalendar} label="Créée le">
        <Text fontSize="sm" fontWeight="500">
          {formatDisplayDate(data?.createdAt)}
        </Text>
      </DisplayInfoRow>

      <DisplayInfoRow icon={LuCalendar} label="Mise à jour le">
        <Text fontSize="sm" color="gray.500">
          {formatDisplayDate(data?.updatedAt)}
        </Text>
      </DisplayInfoRow>
    </Box>
  );
};
