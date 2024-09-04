import apiCall from './API/api'; 

export const getUserData = async (userId, token) => {
  try {
    const response = await apiCall({
      method: 'GET',
      endpoint: `/auth/${userId}`,
      token: token
    });
    return response;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    throw error;
  }
};

