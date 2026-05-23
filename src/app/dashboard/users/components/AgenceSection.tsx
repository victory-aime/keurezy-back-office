import { BaseText, BaseTag, Icons } from '_components/custom';
import { VariablesColors } from '_theme/variables';
import { MODELS } from '@/types';
import { VStack, Stack, Flex, Separator, HStack, Box } from '@chakra-ui/react';

export const AgenceSection = ({
  data,
  handleOpenDoc,
  getFileNameFromUrl,
}: {
  data: MODELS.IUserInfoResponse | undefined;
  handleOpenDoc: (doc: string) => void;
  getFileNameFromUrl: (doc: string) => string | undefined;
}) => {
  return (
    <VStack gap={4} width="full" align="stretch">
      {data?.owner?.agency ? (
        <>
          <Stack>
            <BaseText fontWeight="bold" fontSize="lg">
              {data.owner.agency.name}
            </BaseText>
            <BaseText color="gray.500" fontSize="sm">
              {data.owner.agency.description}
            </BaseText>
          </Stack>

          {/* INFOS */}
          <VStack align="stretch" gap={0}>
            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Adresse</BaseText>
              <BaseText>{data.owner.agency.address}</BaseText>
            </Flex>

            <Separator />

            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Téléphone</BaseText>
              <BaseText>{data.owner.agency.phone}</BaseText>
            </Flex>

            <Separator />

            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Status</BaseText>
              <BaseTag status={data.owner.agency.status} />
            </Flex>

            <Separator />

            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Approve</BaseText>
              <BaseTag
                color={data.owner.agency.isVerified ? 'green' : 'orange'}
                label={data.owner.agency.isVerified ? 'Approved' : 'Pending'}
              />
            </Flex>

            <Separator />

            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Rating</BaseText>
              <HStack>
                {data?.owner.agency.rating && (
                  <Icons.Star color={VariablesColors.orange} size={18} />
                )}
                <BaseText>{data.owner.agency?.rating ?? 'N/A'}</BaseText>
              </HStack>
            </Flex>

            <Separator />

            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Terms</BaseText>
              <HStack>
                {data?.owner.agency.acceptTerms ? (
                  <Icons.CircleCheck color={VariablesColors.success} size={18} />
                ) : (
                  <Icons.CircleClose color={VariablesColors.danger} size={18} />
                )}
                <BaseText>{data.owner.agency.acceptTerms ? 'Yes' : 'No'}</BaseText>
              </HStack>
            </Flex>
          </VStack>
          {/* DOCUMENTS */}
          <VStack align="stretch" gap={2}>
            <BaseText>Documents</BaseText>

            {data.owner.agency.documents?.length ? (
              data.owner.agency.documents.map((doc, idx) => (
                <Flex
                  key={idx}
                  p={2}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  align="center"
                  justify="space-between"
                  _hover={{ bgColor: 'bg.muted' }}
                  onClick={() => handleOpenDoc(doc)}
                  cursor={'pointer'}
                >
                  <HStack>
                    <Icons.Paper />
                    <BaseText fontSize="sm">{getFileNameFromUrl(doc)}</BaseText>
                  </HStack>
                  <Icons.View size={16} />
                </Flex>
              ))
            ) : (
              <BaseText color="gray.400" fontSize="sm">
                Aucun document
              </BaseText>
            )}
          </VStack>
        </>
      ) : (
        <Box p={4} border="1px dashed" borderColor="gray.300" borderRadius="lg" textAlign="center">
          <BaseText color="gray.400">Aucune agence liée</BaseText>
        </Box>
      )}
    </VStack>
  );
};
