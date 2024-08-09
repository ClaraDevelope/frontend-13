import { useLoading } from '../../providers/LoadingProvider'; 
import apiCall from '../../utils/API/api'; 


const useApiCall = () => {
  const { showLoading, hideLoading } = useLoading();

  const callApi = async (options) => {
    try {
      showLoading(); 
      const result = await apiCall(options);
      return result;
    } catch (error) {
      console.error('Error en la llamada a la API:', error);
      throw error;
    } finally {
      hideLoading(); 
    }
  };

  return callApi;
};

export default useApiCall;