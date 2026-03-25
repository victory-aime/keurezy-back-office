import { BaseText, BaseTag, Icons } from "@/components/custom";
import { VariablesColors } from "@/theme/variables";
import { MODELS } from "@/types";
import { VStack, Stack, Flex, Separator, HStack, Box } from "@chakra-ui/react";

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
      {data?.propertyOwner?.propertyAgency ? (
        <>
          <Stack>
            <BaseText fontWeight="bold" fontSize="lg">
              {data.propertyOwner.propertyAgency.name}
            </BaseText>
            <BaseText color="gray.500" fontSize="sm">
              {data.propertyOwner.propertyAgency.description}
            </BaseText>
          </Stack>

          {/* INFOS */}
          <VStack align="stretch" gap={0}>
            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Adresse</BaseText>
              <BaseText>{data.propertyOwner.propertyAgency.address}</BaseText>
            </Flex>

            <Separator />

            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Téléphone</BaseText>
              <BaseText>{data.propertyOwner.propertyAgency.phone}</BaseText>
            </Flex>

            <Separator />

            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Status</BaseText>
              <BaseTag status={data.propertyOwner.propertyAgency.status} />
            </Flex>

            <Separator />

            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Approve</BaseText>
              <BaseTag
                color={
                  data.propertyOwner.propertyAgency.isApprove
                    ? "green"
                    : "orange"
                }
                label={
                  data.propertyOwner.propertyAgency.isApprove
                    ? "Approved"
                    : "Pending"
                }
              />
            </Flex>

            <Separator />

            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Rating</BaseText>
              <HStack>
                {data?.propertyOwner.propertyAgency.rating && (
                  <Icons.Star color={VariablesColors.orange} size={18} />
                )}
                <BaseText>
                  {data.propertyOwner.propertyAgency?.rating ?? "N/A"}
                </BaseText>
              </HStack>
            </Flex>

            <Separator />

            <Flex py={2} justify="space-between">
              <BaseText color="gray.500">Terms</BaseText>
              <HStack>
                {data?.propertyOwner.propertyAgency.acceptTerms ? (
                  <Icons.CircleCheck
                    color={VariablesColors.success}
                    size={18}
                  />
                ) : (
                  <Icons.CircleClose color={VariablesColors.danger} size={18} />
                )}
                <BaseText>
                  {data.propertyOwner.propertyAgency.acceptTerms ? "Yes" : "No"}
                </BaseText>
              </HStack>
            </Flex>
          </VStack>
          {/* DOCUMENTS */}
          <VStack align="stretch" gap={2}>
            <BaseText>Documents</BaseText>

            {data.propertyOwner.propertyAgency.documents?.length ? (
              data.propertyOwner.propertyAgency.documents.map((doc, idx) => (
                <Flex
                  key={idx}
                  p={2}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  align="center"
                  justify="space-between"
                  _hover={{ bgColor: "bg.muted" }}
                  onClick={() => handleOpenDoc(doc)}
                  cursor={"pointer"}
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
        <Box
          p={4}
          border="1px dashed"
          borderColor="gray.300"
          borderRadius="lg"
          textAlign="center"
        >
          <BaseText color="gray.400">Aucune agence liée</BaseText>
        </Box>
      )}
    </VStack>
  );
};
