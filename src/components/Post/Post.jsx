import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, CardBody, Image, CardFooter, Button, Divider, Input, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { BiLike } from 'react-icons/bi'; 
import useApiCall from "../../hooks/useApiCall/useApiCall";
import { useAuth } from "../../providers/AuthProvider";

const Post = ({ author, content, img, initialLikes, comments, postId }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState(comments);
  const callApi = useApiCall();
  const { user } = useAuth();
  const token = user.token;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await callApi({ method: 'GET', endpoint: `/post/${postId}`, token });
        console.log('Post data:', data);
        setLikes(data.likes);
        setHasLiked(data.likedBy.includes(user._id)); 
        setPostComments(data.comments);
        
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId, token, user._id]);

  const handleLike = async () => {
    try {
      const updatedPost = await callApi({
        method: 'POST',
        endpoint: `/post/${postId}/like`,
        token,
        body: { hasLiked: !hasLiked }
      });
      setLikes(updatedPost.likes);
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const newComment = await callApi({
        method: 'POST',
        endpoint: `/post/${postId}/comment`,
        token,
        body: { text: commentText }
      });
      setPostComments([...postComments, newComment]);      
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {    
      await callApi({
        method: 'DELETE',
        endpoint: `/post/${postId}/comment/${commentId}`,
        token
      });
      setPostComments(postComments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <Card maxW='md' marginBottom="20px" minW="400px">
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={author?.profile?.name} src={author?.profile?.img} />
            <Box>
              <Heading size='sm'>{author?.profile?.name}</Heading>
            </Box>
          </Flex>
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
      <Divider/>
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
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
            <Text fontWeight="bold">
              {comment.author ? comment.author.name : 'Unknown'}
            </Text>
            <Text>{comment.text}</Text>
            <Button mt={2} colorScheme="red" onClick={() => handleDeleteComment(comment._id)}>
              Borrar comentario
            </Button>
          </Box>
        ))}
        <Input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Escribe un comentario..."
          size="md"
        />
        <Button onClick={handleAddComment} colorScheme="blue">Add Comment</Button>
      </VStack>
    </Card>
  );
};

export default Post;


