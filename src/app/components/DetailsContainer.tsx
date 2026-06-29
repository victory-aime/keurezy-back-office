import { Box } from '@chakra-ui/react';
import React from 'react';

export function DetailsContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      _dark={{ bg: 'gray.800' }}
      border="0.5px solid"
      borderColor="inherit"
      borderRadius="xl"
      px={6}
      py={4}
    >
      {children}
    </Box>
  );
}
