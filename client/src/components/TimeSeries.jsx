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
      value: null
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
    console.log('outisde')
    if (!this.node || !this.node.contains(e.target)) {
      this.setState({ isHovered: false })
    }
  }

  handleHover(x, y, date, value) {
    if (this.state.isHovered) {
      this.setState({ 
        isHovered: false,
        x,
        y,
        date,
        value
      });
    } else {
      this.setState({ 
        isHovered: true,
        x,
        y,
        date,
        value
       });
    }
  }

  render() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let extract = this.props.data.sort((a, b) => a.date - b.date).map(elem => ({
      words: elem.words,
      score: Math.max(Math.min(elem.score * 20 + 50, 100), 5).toFixed(2),
      date: `${new Date(elem.date).getDay() + 1} ${monthNames[new Date(elem.date).getMonth()]}, ${new Date(elem.date).getFullYear()}`,
    }));
    return (
      <svg ref={node => this.node = node} id='time-series' height={this.state.height}>
        <g>
         {extract.map((elem, i, arr) => <Line key={i} x1={i * document.body.clientWidth / arr.length} y1={elem.score} x2={(i + 1)* document.body.clientWidth / arr.length} y2={arr[i + 1] ? arr[i + 1].score : arr[i].score} date={elem.date.toString()} value={elem.score.toString()} handleHover={this.handleHover}/>)}
         <g id='divider'>
            <line x1="0" y1="50" x2={document.body.clientWidth} y2="50" strokeDasharray="4"/>
         </g>
         {this.state.isHovered && <Popup x={this.state.x} y={this.state.y} date={this.state.date} value={this.state.value}/>}
        </g>
      </svg>
    );
  }
}

export default TimeSeries;