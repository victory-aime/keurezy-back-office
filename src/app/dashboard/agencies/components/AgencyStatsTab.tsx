'use client';

import { Box, Flex, SimpleGrid, Text, Icon } from '@chakra-ui/react';
import {
  LuFileText,
  LuUsers,
  LuTicket,
  LuArrowLeftRight,
  LuEye,
  LuBuilding,
  LuUserCheck,
  LuLandmark,
  LuVault,
  LuMail,
  LuFlag,
} from 'react-icons/lu';
import { BaseStats, Icons } from '_components/custom';
import { HiOutlineMenu } from 'react-icons/hi';
import { HiHome } from 'react-icons/hi2';

interface AgencyStatsTabProps {
  stats: Record<string, number> | undefined;
}

const STAT_CONFIG = [
  { key: 'properties', label: 'Propriétés', icon: HiHome, color: 'blue' },
  { key: 'contracts', label: 'Contrats', icon: LuFileText, color: 'green' },
  { key: 'tenants', label: 'Locataires', icon: LuUsers, color: 'primary' },
  { key: 'tickets', label: 'Tickets', icon: LuTicket, color: 'red' },
  { key: 'transactions', label: 'Transactions', icon: LuArrowLeftRight, color: 'teal' },
  { key: 'visits', label: 'Visites', icon: LuEye, color: 'orange' },
  { key: 'batiments', label: 'Bâtiments', icon: LuBuilding, color: 'yellow' },
  { key: 'villas', label: 'Villas', icon: LuLandmark, color: 'pink' },
  { key: 'lands', label: 'Terrains', icon: LuVault, color: 'orange' },
  { key: 'staff', label: 'Staff', icon: LuUserCheck, color: 'blue' },
  { key: 'leads', label: 'Leads', icon: LuMail, color: 'primary' },
  { key: 'invitations', label: 'Invitations', icon: LuMail, color: 'teal' },
  { key: 'reports', label: 'Rapports', icon: LuFlag, color: 'red' },
  {
    key: 'transactionCommissions',
    label: 'Commissions',
    icon: Icons.StatsChart,
    color: 'green',
  },
];

export const AgencyStatsTab = ({ stats }: AgencyStatsTabProps) => {
  if (!stats) return null;
  return (
    <Box>
      <Flex align="center" gap={2} mb={4}>
        <Icon as={HiOutlineMenu} boxSize={4} color="gray.400" />
        <Text
          fontSize="xs"
          fontWeight="600"
          color="gray.400"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Vue d'ensemble
        </Text>
      </Flex>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={3}>
        {STAT_CONFIG.map(({ key, label, icon: Icon, color }) => (
          <BaseStats
            key={key}
            icon={<Icon />}
            title={label}
            value={stats[key] ?? 0}
            color={color}
            iconBgColor={`${color}.500`}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
