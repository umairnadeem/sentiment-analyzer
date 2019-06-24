import React from 'react';
import Line from './Line.jsx';
import Popup from './Popup.jsx';

class TimeSeries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 150,
      xScale: 0.88,
      yScale: 0.5,
      isHovered: false,
      x: 0,
      y: 0,
      date: null,
      value: null,
      string: ''
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleOutsideHover = this.handleOutsideHover.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mouseout', this.handleOutsideHover);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseout', this.handleOutsideHover);
  }

  handleOutsideHover(e) {
    if (!this.node || !this.node.contains(e.target)) {
      this.setState({ isHovered: false })
    }
  }

  handleHover(x, y, date, value, string) {
    if (this.state.isHovered) {
      this.setState({ 
        isHovered: false,
        x,
        y,
        date,
        value,
        string
      });
    } else {
      this.setState({ 
        isHovered: true,
        x,
        y,
        date,
        value,
        string
       });
    }
  }

  render() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let extract = this.props.data.sort((a, b) => a.date - b.date).map(elem => ({
      words: elem.words,
      score: Math.max(Math.min(-1 * (elem.score * 15) + 50, 100), 10).toFixed(2),
      date: `${new Date(elem.date).getDay() + 1} ${monthNames[new Date(elem.date).getMonth()]}, ${new Date(elem.date).getFullYear()}`,
      string: elem.string
    }));
    return (
      <svg ref={node => this.node = node} id='time-series' height={this.state.height}>
        <g>
         {extract.map((elem, i, arr) => <Line key={i} x1={i * document.body.clientWidth / arr.length} y1={elem.score} x2={(i + 1)* document.body.clientWidth / arr.length} y2={arr[i + 1] ? arr[i + 1].score : arr[i].score} date={elem.date.toString()} value={elem.score.toString()} string={elem.string} handleHover={this.handleHover}/>)}
         <g id='divider'>
            <line x1="0" y1="50" x2={document.body.clientWidth} y2="50" strokeDasharray="4"/>
         </g>
         {this.state.isHovered && <Popup x={this.state.x} y={this.state.y} date={this.state.date} value={this.state.value} string={this.state.string}/>}
        </g>
      </svg>
    );
  }
}

export default TimeSeries;