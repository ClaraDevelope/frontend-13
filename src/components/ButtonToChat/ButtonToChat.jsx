// import { Button } from '@chakra-ui/react';
// import React from 'react';
// import { Link } from 'react-router-dom';

// const ButtonToChat = ({ userId }) => {
//   return (
//     <Button
//       as={Link}
//       to={`/Chat/${userId}`}
//       ml="auto"
//       size="sm"
//       colorScheme="blue"
//       bg="blue.700"
//     >
//       Abrir chat
//     </Button>
//   );
// };

// export default ButtonToChat;

import React from 'react';
import { Button } from '@chakra-ui/react';

const ButtonToChat = ({ user, onClick }) => {
  return (
    <Button ml="auto"
          size="sm"
          colorScheme="blue"
          bg="blue.700" onClick={() => onClick(user)}>
      Iniciar Chat
    </Button>
  );
};

export default ButtonToChat;