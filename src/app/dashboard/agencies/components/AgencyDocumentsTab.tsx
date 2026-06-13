'use client';

import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { BaseButton, BaseText, Icons } from '_components/custom';
import { downloadFile, getFileIcon, getFileType, getFileNameFromUrl } from '_hooks/download';
import { EmptyBlock } from '@/app/components/EmptyBlock';

interface AgencyDocumentsTabProps {
  documents: string[];
  onOpenDoc: (url: string) => void;
  file?: string;
}

export const AgencyDocumentsTab = ({ documents, onOpenDoc, file }: AgencyDocumentsTabProps) => {
  if (!documents.length) {
    return <EmptyBlock infoMessage={'Aucun document disponible'} icon={Icons.Paper} />;
  }

  return (
    <Box>
      <Flex align="center" gap={2} mb={4}>
        <Icon as={Icons.Paper} boxSize={4} color="gray.400" />
        <Text
          fontSize="xs"
          fontWeight="600"
          color="gray.400"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {documents.length} document{documents.length > 1 ? 's' : ''}
        </Text>
      </Flex>

      <Flex flexDirection="column" gap={2}>
        {documents.map((url, idx) => {
          const fileName = getFileNameFromUrl(url) ?? `Document ${idx + 1}`;
          const FileIcon = getFileIcon(url);
          const fileType = getFileType(url);

          return (
            <Box
              key={idx}
              _dark={{ bg: 'gray.800' }}
              border="0.5px solid"
              borderColor="inherit"
              borderRadius="md"
              px={4}
              py={3}
              _hover={{ borderColor: 'indigo', bg: 'inherit' }}
              transition="all 0.15s"
            >
              <Flex align="center" gap={3}>
                <Box
                  p={2.5}
                  bg="primary.50"
                  _dark={{ bg: 'primary.900' }}
                  borderRadius="lg"
                  flexShrink={0}
                >
                  <Icon
                    as={FileIcon}
                    boxSize={5}
                    color="primary.500"
                    _dark={{ color: 'primary.300' }}
                  />
                </Box>

                <Box flex={1} minW={0}>
                  <BaseText fontSize="sm">{fileName}</BaseText>
                  <BaseText fontSize="xs" color="gray.400">
                    {fileType}
                  </BaseText>
                </Box>

                <Flex gap={2} flexShrink={0}>
                  <BaseButton
                    size="xs"
                    variant="plain"
                    colorType={'secondary'}
                    onClick={() => onOpenDoc(url)}
                  >
                    Voir
                  </BaseButton>
                  <BaseButton size="xs" variant="plain" onClick={() => downloadFile(file!)}>
                    Télécharger
                  </BaseButton>
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
