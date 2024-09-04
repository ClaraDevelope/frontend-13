import React from 'react';
import { Box, Text, Flex, Divider, Avatar } from '@chakra-ui/react';

const MessageList = ({ messages, currentUserId, receiver }) => (
  <>
    <Text fontSize="xl" fontWeight="bold" mb={4}>
      Conversación con {receiver ? receiver.name : 'Desconocido'}
    </Text>
    {messages.map((msg, index) => {
      const isUserMessage = msg.sender.id === currentUserId;
      const senderName = isUserMessage ? 'Tú' : (msg.sender.name || 'Desconocido');
      return (
        <Flex
          key={index}
          direction={isUserMessage ? 'row-reverse' : 'row'}
          mb={2}
          align="flex-start"
          justify={isUserMessage ? 'flex-end' : 'flex-start'}
        >
          <Flex width="100%" direction="column" align={isUserMessage ? 'flex-end' : 'flex-start'}>
            <Flex
              direction="row"
              align="center"
              bg={isUserMessage ? 'blue.100' : 'green.100'}
              p={3}
              borderRadius="md"
              maxW="100%"
              textAlign={isUserMessage ? 'right' : 'left'}
              boxShadow="md"
            >
              {!isUserMessage && (
                <Avatar
                  name={senderName}
                  src={`https://api.adorable.io/avatars/40/${senderName}.png`}
                  size="sm"
                  mr={3}
                  bg="green.200"
                />
              )}
              <Box flex="1">
                <Text fontWeight="bold" color={isUserMessage ? 'blue.600' : 'green.600'} overflowWrap="break-word">
                  {senderName}
                </Text>
                <Text>{msg.text}</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Text>
                {index < messages.length - 1 && <Divider my={2} />}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      );
    })}
  </>
);

export default MessageList;

