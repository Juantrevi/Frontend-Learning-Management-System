import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

const RaterWrapper = ({ total = 5, rating = 0, ...props }) => {
  return <Rater total={total} rating={rating} {...props} />;
};

export default RaterWrapper;