import React from 'react'
import Post from '../../components/Post/Post'
import { Box } from '@chakra-ui/react'
import ProfilePost from '../../components/ProfilePost/ProfilePost'


const Social = () => {
  return (
    <>
    <ProfilePost/>
    <Box display="flex" justifyContent="center" margin="0 auto" marginBottom="50px">
      <Post/>
    </Box>
    </>
  )
}

export default Social
