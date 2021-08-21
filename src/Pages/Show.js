import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const reducer = (prevState, action) => {
  switch (action) {
    case 'FECTH_SUCCESS': {
      return { ...prevState, isLoading: false, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

const intialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    intialState
  );

  let isMounted = true;

  useEffect(() => {
    apiGet(`/shows/${id}?embeded[]=seasons&embeded[]=cast`)
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
  }, [id]);

  console.log('show', show);

  if (isLoading) return <div>Data is being Loading.....</div>;
  if (error) return <div>Error ocurred: {error}</div>;

  return <div>This is show page</div>;
};

export default Show;
