import React from 'react';
import { useLoading } from '../../providers/LoadingProvider';
import { Spinner, Center } from '@chakra-ui/react';

const Loading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <Center
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="1000"
    >
      <Spinner size="xl" color="white" />
    </Center>
  );
};

export default Loading;
