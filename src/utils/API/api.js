import { BASE_URL } from "../constants";

const apiCall = async ({ method, endpoint, body = null, isFormData = false, token = null }) => {
  const apiUrl = BASE_URL + endpoint;

  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
    console.log('Cuerpo antes de stringify:', body); // Debug: Cuerpo antes de stringify
    body = body ? JSON.stringify(body) : null;
    console.log('Cuerpo después de stringify:', body); // Debug: Cuerpo después de stringify
  }


  const requestOptions = {
    method: method,
    headers: headers,
    body: body
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error('Error al enviar los datos');
    }

    const responseData = await response.json();
    console.log('Respuesta de la API:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    throw error;
  }
};

export default apiCall;


// const url = "http://localhost:3000/api/v1";

// export const API = async ({
//   endpoint,
//   method = "GET",
//   body,
//   isJSON = true,
//   token = null
// }) => {
//   const headers = {
//     "Authorization": Bearer ${token}
//   };

//   isJSON ? (headers["Content-Type"] = "application/json") : null;

//   const res = await fetch(url + endpoint, {
//     body: isJSON ? JSON.stringify(body) : body,
//     method,
//     headers,
//   });

//   const response = await res.json();
//   return response;
// };

