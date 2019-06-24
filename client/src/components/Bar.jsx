import React from 'react';

class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
      type: this.props.type === 'bad' ? 'red' : this.props.type === 'neutral' ? 'blue' : 'green'
    };

    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter() {
    this.setState(state => ({ isHovered: !state.isHovered }))
  }

  render() {
    return (
      <g>
        {/* <rect fill="#d6d6d6" height="100%" width="10px" x={0} y="0"></rect> */}
        <rect width={`${this.props.width * 1/5}px`} height={`${Math.min(this.props.level, this.props.height)}px`} x={this.props.width * this.props.x * 1/3 + (1/3 - 1/5)*this.props.width / 2} y={0} fill={this.state.isHovered ? this.state.type : "white"} onMouseEnter={this.handleEnter} onMouseLeave={this.handleEnter}></rect>
        {this.state.isHovered && <text fill="white" x={this.props.width * this.props.x * 1/3 + (1/3 - 1/5)*this.props.width / 2} y={this.props.level + 15}>{this.props.type}</text>}
      </g>
    );
  }
}

export default Bar;