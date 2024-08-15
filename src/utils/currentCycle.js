export const fetchCurrentCycleData = async (apiCall, cycleId, token) => {
  const response = await apiCall({ method: 'GET', endpoint: `/cycle/${cycleId}`, token });
  return response; 
};