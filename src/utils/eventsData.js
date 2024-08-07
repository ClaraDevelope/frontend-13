export const fetchEventsData = async (apiCall, token) => {
  const response = await apiCall({ method: 'GET', endpoint: '/calendary/', token });
  return response.map(event => ({
    ...event,
    start: new Date(event.date),
    end: new Date(event.date),
    title: event.value
  }));
};

