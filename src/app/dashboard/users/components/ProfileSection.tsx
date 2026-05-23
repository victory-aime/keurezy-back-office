import { BaseText, BaseTag, Icons } from '_components/custom';
import { Avatar } from '_components/ui/avatar';
import { MODELS } from '@/types';
import { VStack, Flex, Stack, HStack, Separator } from '@chakra-ui/react';
import { formatCreatedAt } from 'rise-core-frontend';

export const ProfileSection = ({ data }: { data: MODELS.IUser | undefined }) => {
  return (
    <VStack gap={4} width="full" align="stretch">
      <Flex gap={4} align="center">
        <Avatar src={data?.image} size="2xl" />
        <Stack gap={0}>
          <BaseText fontWeight="bold" fontSize="lg">
            {data?.name}
          </BaseText>
          <BaseText color="gray.400" fontSize="sm">
            {data?.email}
          </BaseText>

          <HStack mt={1}>
            <BaseTag color="orange" label={data?.role} />
            <BaseTag status={data?.status} />
          </HStack>
        </Stack>
      </Flex>
      <VStack align="stretch" gap={0}>
        <Flex py={2} justify="space-between">
          <BaseText color="gray.500">Created</BaseText>
          <HStack>
            <Icons.Calendar />
            <BaseText>{formatCreatedAt(data?.createdAt!)}</BaseText>
          </HStack>
        </Flex>

        <Separator />

        <Flex py={2} justify="space-between">
          <BaseText color="gray.500">Updated</BaseText>
          <HStack>
            <Icons.Calendar />
            <BaseText>{formatCreatedAt(data?.updatedAt!)}</BaseText>
          </HStack>
        </Flex>
      </VStack>
    </VStack>
  );
};
