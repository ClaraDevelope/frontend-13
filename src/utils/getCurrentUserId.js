export const getCurrentUserId = () => {
  const userFromStorage = localStorage.getItem('user');
  if (userFromStorage) {
    try {
      const { _id } = JSON.parse(userFromStorage);
      return _id;
    } catch (error) {
      console.error('Error al parsear el usuario desde localStorage:', error);
    }
  }
  return null;
};
