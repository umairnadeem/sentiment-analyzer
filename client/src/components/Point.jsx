import React from 'react';

class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
  }

  render() {
    return (
      <g className='point'>
        <rect width="5px" height="100%" fill='rgba(0,0,0,0)' x={this.props.x} y="0" onMouseEnter={() => this.props.handleHover(this.props.x,this.props.y,this.props.date,this.props.value, this.props.string)} onMouseLeave={() => this.props.handleHover(this.props.x,this.props.y,this.props.date,this.props.value, this.props.string)}/>
      </g>
    );
  }
}

export default Point;