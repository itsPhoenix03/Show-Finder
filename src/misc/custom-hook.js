import { useEffect, useReducer, useState } from 'react';
import { apiGet } from './config';

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

export function useLastQuery(key = 'LastQuery') {
  const [input, setInput] = useState(() => {
    const persist = sessionStorage.getItem(key);
    return persist ? JSON.parse(persist) : '';
  });

  function usePersistedInput(newState) {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  }

  return [input, usePersistedInput];
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { ...prevState, isLoading: false, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

export function useShowRender(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  let isMounted = true;

  useEffect(() => {
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: result });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.massage });
        }
      });
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false;
    };
  }, [showId]);

  return state;
}
