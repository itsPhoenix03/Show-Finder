import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    apiGet(`/shows/${id}?embeded[]=seasons&embeded[]=cast`).then(result =>
      setShow(result)
    );
  }, [id]);

  console.log('show', show);
  return <div>This is show page</div>;
};

export default Show;
