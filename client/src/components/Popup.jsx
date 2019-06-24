import React from 'react';

const Popup = ({ value, date, x, y }) => (
  <g className='popup'>
    <text fill='#fff' x="46%" y="130">{date}</text>
    <rect fill="#d6d6d6" height="100%" width="1px" x={x} y="0"></rect>
    <circle cx={x} cy={y} fill="blue" r="2"></circle>
  </g>
);

export default Popup;