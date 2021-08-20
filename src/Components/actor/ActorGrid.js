import React from 'react';
import ActorCard from './ActorCard';
import IMAGE_NOT_FOUND from '../../Images/not-found.png';

const ActorGrid = ({ data }) => {
  return (
    <div>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          id={person.id}
          name={person.name}
          image={person.image ? person.image.medium : IMAGE_NOT_FOUND}
          gender={person.gender ? person.gender : null}
          country={person.country ? person.country.name : null}
          birthday={person.birthday}
          deathday={person.deathday}
        />
      ))}
    </div>
  );
};

export default ActorGrid;
