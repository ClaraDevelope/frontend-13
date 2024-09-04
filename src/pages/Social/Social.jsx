import React, { useEffect, useState } from 'react';
import Post from '../../components/Post/Post';
import { Box } from '@chakra-ui/react';
import ProfilePost from '../../components/ProfilePost/ProfilePost';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import { useAuth } from '../../providers/AuthProvider';

const Social = () => {
  const [posts, setPosts] = useState([]);
  const callApi = useApiCall();
  const { user } = useAuth();
  const token = user.token;

  const fetchPosts = async () => {
    try {
      const response = await callApi({
        method: 'GET',
        endpoint: '/post/',
        token: token,
      });

      if (response && Array.isArray(response)) {
        setPosts(response); 
      } else {
        console.error('La respuesta no contiene un array de posts');
        setPosts([]); 
      }
    } catch (error) {
      console.log('No se ha realizado correctamente la llamada:', error);
      setPosts([]); 
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const handlePostCreated = () => {
    fetchPosts(); 
  };

  return (
    <>
      <ProfilePost user={user} onPostCreated={handlePostCreated} />
      <Box display="flex" flexDirection="column" alignItems="center" margin="0 auto" marginBottom="50px">
        {posts.map((post) => (
          <Post
            key={post._id} 
            postId={post._id}
            author={post.author}
            content={post.content}
            img={post.img}
            initialLikes={post.likes}
            comments={post.comments}
          />
        ))}
      </Box>
    </>
  );
};

export default Social;


