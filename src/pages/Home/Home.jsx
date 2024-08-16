import React from 'react'
import './Home.css'
import { Flex, Img } from '@chakra-ui/react'

const Home = () => {
  return (
    <Flex className='landing-container' justifyContent="center">
      <Img src="/image-ppal.jpg" borderRadius="50%" opacity="60%" maxHeight="800px" objectFit="cover"/>
    </Flex>
  )
}

export default Home

