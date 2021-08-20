import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let isMounted = true;

  useEffect(() => {
    apiGet(`/shows/${id}?embeded[]=seasons&embeded[]=cast`)
      .then(result => {
        if (isMounted) {
          setShow(result);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.massage);
          setIsLoading(false);
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
