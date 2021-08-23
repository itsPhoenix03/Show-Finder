import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
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

  const usePersistedInput = useCallback(
    newState => {
      setInput(newState);
      sessionStorage.setItem(key, JSON.stringify(newState));
    },
    [key]
  );

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

export function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        // eslint-disable-next-line no-console
        console.log('[why-did-you-update]', name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
