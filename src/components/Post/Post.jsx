import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, IconButton, CardBody, Image, CardFooter, Button } from "@chakra-ui/react";
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs'; 
import { BiLike, BiChat, BiShare } from 'react-icons/bi'; 

const Post = ({ author, content, img, likes, comments, interactions }) => {
  return (
    <Card maxW='md' marginBottom="20px">
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={author?.name} src={author?.profile.img} />
            <Box>
              <Heading size='sm'>{author?.profile.name}</Heading>
            </Box>
          </Flex>
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {content}
        </Text>
      </CardBody>
      {img && (
        <Image
          objectFit='cover'
          src={img}
          alt='Post image'
        />
      )}
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
          {likes} Like{likes !== 1 && 's'}
        </Button>
        <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
          {comments.length} Comment{comments.length !== 1 && 's'}
        </Button>
        <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
