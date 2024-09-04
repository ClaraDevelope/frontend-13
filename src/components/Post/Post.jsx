import {
  Card, CardHeader, Menu, MenuList, MenuItem, MenuButton, IconButton,
  Flex, Avatar, Box, Heading, Text, CardBody, Image, CardFooter,
  Button, Divider, Input, VStack
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from 'react';
import { BiLike } from 'react-icons/bi';
import useApiCall from "../../hooks/useApiCall/useApiCall";
import { useAuth } from "../../providers/AuthProvider";
import { FaEllipsisV } from "react-icons/fa";

const Post = ({ author, content, img, initialLikes, postId }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState([]);
  
  const callApi = useApiCall();
  const { user } = useAuth();
  const token = user.token;

  const fetchPostData = useCallback(async () => {
    try {
      const { likes, likedBy } = await callApi({ method: 'GET', endpoint: `/post/${postId}`, token });
      setLikes(likes);
      setHasLiked(likedBy.includes(user._id));
      
      const commentsData = await callApi({ method: 'GET', endpoint: `/post/${postId}/comments/`, token });
      setPostComments(commentsData);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  }, [postId, token, user._id]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  const handleApiAction = async (endpoint, method, body = null, onSuccess = () => {}) => {
    try {
      await callApi({ method, endpoint, token, body });
      onSuccess();
    } catch (error) {
      console.error(`Error during ${method} action at ${endpoint}:`, error);
    }
  };

  const handleLike = () => {
    handleApiAction(`/post/${postId}/like`, 'POST', { hasLiked: !hasLiked }, () => {
      setLikes(prevLikes => prevLikes + (hasLiked ? -1 : 1));
      setHasLiked(!hasLiked);
    });
  };

  const handleAddComment = () => {
    handleApiAction(`/post/${postId}/comment`, 'POST', { text: commentText }, fetchPostData);
    setCommentText('');
  };

  const handleDeleteComment = (commentId) => {
    handleApiAction(`/post/${postId}/comment/${commentId}`, 'DELETE', null, () => {
      setPostComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
    });
  };

  const handleDeletePost = () => {
    handleApiAction(`/post/${postId}/delete`, 'DELETE', null, () => setIsVisible(false));
  };

  if (!isVisible) return null;

  return (
    <Card maxW='md' marginBottom="20px" minW="400px" className="card">
      <CardHeader>
        <Flex justify="space-between" alignItems="center">
          <Flex gap='4' alignItems='center'>
            <Avatar name={author?.profile?.name} src={author?.profile?.img} />
            <Box>
              <Heading size='sm'>{author?.profile?.name}</Heading>
            </Box>
          </Flex>
          {author?._id === user._id && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FaEllipsisV />}
                variant="outline"
                size="sm"
              />
              <MenuList>
                <MenuItem onClick={handleDeletePost}>Borrar post</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{content}</Text>
      </CardBody>
      {img && (
        <Image objectFit='cover' src={img} alt='Post image' />
      )}
      <Divider />
      <CardFooter justify='space-between' flexWrap='wrap'>
        <Button 
          flex='1' 
          variant={hasLiked ? 'solid' : 'ghost'} 
          leftIcon={<BiLike />} 
          onClick={handleLike}
        >
          {likes} Like{likes !== 1 && 's'}
        </Button>
        <Button flex='1' variant='ghost'>
          {postComments.length} Comment{postComments.length !== 1 && 's'}
        </Button>
      </CardFooter>
      <VStack spacing={4} p={4}>
        {postComments.map(comment => (
          <Box key={comment._id} p={3} borderWidth={1} borderRadius="md">
            <Flex alignItems="center" mb={2}>
              <Avatar
                name={comment.author?.profile?.name || 'Unknown'}
                src={comment.author?.profile?.img}
                size="sm"
                mr={2}
              />
              <Text fontWeight="bold" mr={2}>
                {comment.author?.profile?.name || 'Unknown'}
              </Text>
              {comment.author?._id === user._id && (
                <Menu ml="auto">
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<FaEllipsisV />}
                    variant="outline"
                    size="sm"
                  />
                  <MenuList>
                    <MenuItem onClick={() => handleDeleteComment(comment._id)}>Borrar comentario</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
            <Text>{comment.text}</Text>
          </Box>
        ))}
        <Input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Escribe un comentario..."
          size="md"
        />
        <Button onClick={handleAddComment} colorScheme="blue">Añadir comentario</Button>
      </VStack>
    </Card>
  );
};

export default Post;










