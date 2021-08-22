import { useEffect, useReducer } from 'react';

function showReducer(preState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...preState, action.showId];
    }
    case 'REMOVE': {
      return preState.filter(showId => showId !== action.showId);
    }
    default:
      return preState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, intial => {
    const persist = localStorage.getItem(key);
    return persist ? JSON.parse(persist) : intial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShow(key = 'shows') {
  return usePersistedReducer(showReducer, [], key);
}
