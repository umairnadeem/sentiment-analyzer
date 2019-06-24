import React from 'react';
import Point from './Point.jsx';

const Line = ({ x1, x2, y1, y2, date, value, handleHover }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2}/>
    <Point x={x1} y={y1} date={date} value={value} handleHover={handleHover}/>
  </g>
);

export default Line;