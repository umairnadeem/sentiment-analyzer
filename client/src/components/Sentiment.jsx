import React from 'react';

const Sentiment = ({ sentiment }) => (
  <div id='sentiment'>
    <h2>{Math.round(sentiment) + `%`}</h2>
  </div>
);

export default Sentiment;