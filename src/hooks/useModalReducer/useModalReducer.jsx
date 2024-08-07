import { useReducer, useRef } from 'react';

export const ACTIONS = {
  SET_ENTRY_TYPE: 'SET_ENTRY_TYPE',
  SET_VALUE: 'SET_VALUE',
};

const initialState = {
  entryType: '',
  value: '',
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ENTRY_TYPE:
      return { ...state, entryType: action.payload, value: '' };
    case ACTIONS.SET_VALUE:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

const useModalReducer = () => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const stateRef = useRef(state);

  stateRef.current = state;

  return [state, dispatch, stateRef];
};

export default useModalReducer;

