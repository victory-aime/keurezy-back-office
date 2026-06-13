import { CustomSkeletonLoader } from '_components/custom';
import { VStack, Flex, Separator, HStack } from '@chakra-ui/react';

export const IsDetailsDataLoad = () => {
  return (
    <VStack alignItems={'flex-start'} width={'full'}>
      <HStack justifyContent={'space-between'} width={'full'}>
        <CustomSkeletonLoader
          type={'TEXT_IMAGE'}
          direction={'row'}
          numberOfLines={2}
          width={'800px'}
          radius={'full'}
        />
        <CustomSkeletonLoader type={'BUTTON'} width={'120px'} colorButton={'primary'} />
      </HStack>
      <HStack flexDir={{ base: 'column', sm: 'row' }} width={'full'} gap={4}>
        <Flex width={'1/6'}>
          <CustomSkeletonLoader width={'full'} type={'FORM'} height={'50svh'} />
        </Flex>
        <Separator height={'lg'} orientation={{ base: 'horizontal', sm: 'vertical' }} />
        <Flex width={'full'}>
          <CustomSkeletonLoader type={'FORM'} width={'100%'} height={'50svh'} />
        </Flex>
      </HStack>
    </VStack>
  );
};
