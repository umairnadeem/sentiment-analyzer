import React from 'react';

const Popup = ({ value, string, date, x, y }) => (
  <g className='popup'>
    <text fill='#fff' x="46%" y="130">{date}</text>
    <text fill='#fff' x={x + 5} id="string" y={y}>{string.length > 80 ? `${string.slice(0,80)}...` : string}</text>
    <rect fill="#d6d6d6" height="100%" width="1px" x={x} y="0"></rect>
    <circle cx={x} cy={y} fill="blue" r="2"></circle>
  </g>
);

export default Popup;