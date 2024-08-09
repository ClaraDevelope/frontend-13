export const fetchCurrentCycleData = async (apiCall, cycleId, token) => {
  const response = await apiCall({ method: 'GET', endpoint: `/cycle/${cycleId}`, token });
  return response; 
};



// export const fetchCurrentCycleData = async (apiCall, cycleId, token) => {
//   try {
//     const response = await apiCall({ method: 'GET', endpoint: `/cycle/${cycleId}`, token });

//     if (response.history && response.history.length > 0) {
//       const lastCycle = response.history[response.history.length - 1];
//       return {
//         start: lastCycle.startDate,
//         end: lastCycle.endDate || null,
//         history: response.history
//       };
//     } else {
//       return {
//         start: null,
//         end: null,
//         history: []
//       };
//     }
//   } catch (error) {
//     console.error('Error fetching current cycle data:', error);
//     throw error;
//   }
// };
