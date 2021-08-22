import React from 'react';
import ShowCard from './ShowCard';
import IMAGE_NOT_FOUND from '../../Images/not-found.png';
import { FlexGrid } from '../styled';
import { useShow } from '../../misc/custom-hook';

const ShowGrid = ({ data }) => {
  const [starred, dispatchStarred] = useShow();

  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starred.includes(show.id);

        const onStarClick = () => {
          if (isStarred) dispatchStarred({ type: 'REMOVE', showId: show.id });
          else dispatchStarred({ type: 'ADD', showId: show.id });
        };

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
