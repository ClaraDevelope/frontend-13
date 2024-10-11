import { BASE_URL, SERVER } from "../constants";

const apiCall = async ({
  method,
  endpoint,
  body = null,
  isFormData = false,
  token = null,
  server = false,
}) => {
  
  const apiUrl = server ? SERVER + endpoint : BASE_URL + endpoint;

  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';

    body = body ? JSON.stringify(body) : null;
  
  }

  const requestOptions = {
    method: method,
    headers: headers,
    body: body,
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || 'Error al enviar los datos');
    }
    const responseData = await response.json();
    // console.log('Respuesta de la API:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    throw error;
  }
};

export default apiCall;
