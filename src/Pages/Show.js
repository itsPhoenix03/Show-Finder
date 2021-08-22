/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../Components/show/Cast';
import Details from '../Components/show/Details';
import Seasons from '../Components/show/Seasons';
import ShowMainData from '../Components/show/ShowMainData';
import { useShowRender } from '../misc/custom-hook';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const Show = () => {
  const { id } = useParams();
  const { show, isLoading, error } = useShowRender(id);

  if (isLoading)
    return <div style={{ color: '#2400ff' }}>Data is being Loading.....</div>;
  if (error)
    return <div style={{ color: '#2400ff' }}>Error ocurred: {error}</div>;

  return (
    <ShowPageWrapper>
      <ShowMainData
        id={show.externals.imdb}
        name={show.name}
        image={show.image}
        rating={show.rating}
        summary={show.summary}
        genres={show.genres}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
