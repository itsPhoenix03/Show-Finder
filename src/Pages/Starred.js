import React, { useEffect, useReducer } from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import { useShow } from '../misc/custom-hook';
import { apiGet } from '../misc/config';
import ShowGrid from '../Components/show/ShowGrid';

function reducer(prevState, action) {
  switch (action.type) {
    case 'RENDER': {
      return { ...prevState, shows: action.show, isLoading: false };
    }
    case 'ERROR': {
      return { ...prevState, error: action.error, isLoading: false };
    }
    default:
      return { ...prevState, isLoading: false };
  }
}

const intialState = {
  shows: null,
  isLoading: true,
  error: null,
};

const Starred = () => {
  const [starred] = useShow();
  const [{ shows, isLoading, error }, dispatch] = useReducer(
    reducer,
    intialState
  );

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(result => dispatch({ type: 'RENDER', show: result }))
        .catch(err => dispatch({ type: 'ERROR', error: err.massage }));
    } else dispatch({ type: '' });
  }, [starred]);
  return (
    <MainPageLayout>
      {isLoading && (
        <div style={{ color: '#2400ff' }}>
          Favourite Shows are being Loading.... <br />
          Plaese wait for a while!!
        </div>
      )}
      {error && <div style={{ color: '#2400ff' }}>Error Occurred: {error}</div>}
      {!isLoading && !shows && (
        <div style={{ textAlign: 'center', color: '#2400ff' }}>
          No Show has been added to favourites!!!
        </div>
      )}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
