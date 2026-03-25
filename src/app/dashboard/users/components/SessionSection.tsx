import { BaseText, Icons } from "@/components/custom";
import { MODELS } from "@/types";
import { VStack, Box, Flex, HStack } from "@chakra-ui/react";
import { formatCreatedAt } from "rise-core-frontend";

export const SessionSection = ({
  data,
}: {
  data: MODELS.IUserInfoResponse | undefined;
}) => {
  // utils/parseUserAgent.ts
  const parseUserAgent = (ua: string | undefined) => {
    if (!ua) return "Unknown device";

    // détecter navigateur
    const browserMatch = ua.match(/(Chrome|Firefox|Safari|Edge)\/([\d.]+)/);
    const browser = browserMatch
      ? `${browserMatch[1]} ${browserMatch[2]}`
      : "Browser";

    // détecter OS
    const osMatch = ua.match(/\(([^)]+)\)/);
    const os = osMatch ? osMatch[1].split(";")[0] : "OS";

    return `${browser} sur ${os}`;
  };
  return (
    <VStack gap={3} width="full" align="stretch">
      {data?.sessions?.length ? (
        data.sessions.map((session, idx) => (
          <Box
            key={idx}
            p={3}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            _hover={{ borderColor: "gray.300" }}
          >
            <BaseText fontWeight="bold">
              {parseUserAgent(session?.userAgent)}
            </BaseText>

            <Flex wrap="wrap" gap={3} color="gray.500" fontSize="sm">
              <HStack>
                <Icons.World />
                <BaseText>{session?.ipAddress || "N/A"}</BaseText>
              </HStack>

              <HStack>
                <Icons.Timer />
                <BaseText>{formatCreatedAt(session?.createdAt)}</BaseText>
              </HStack>

              <HStack>
                <Icons.Timer />
                <BaseText>
                  Expires: {formatCreatedAt(session?.expiresAt)}
                </BaseText>
              </HStack>
            </Flex>
          </Box>
        ))
      ) : (
        <Box
          p={4}
          border="1px dashed"
          borderColor="gray.300"
          borderRadius="lg"
          textAlign="center"
        >
          <BaseText color="gray.400">Aucune session enregistrée</BaseText>
        </Box>
      )}
    </VStack>
  );
};
