export const fetchEventsData = async (apiCall, token) => {
  try {
    const response = await apiCall({ method: 'GET', endpoint: '/calendary/', token });


    // console.log("Datos recibidos del backend:", response);

    return response.map(event => ({
      ...event,
      start: new Date(event.date),
      end: new Date(event.end || event.date), 
      title: event.value
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};