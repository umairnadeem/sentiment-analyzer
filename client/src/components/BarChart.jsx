import React from 'react';
import Bar from './Bar.jsx';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      width: 400,
      height: 150,
      good: 0,
      bad: 0,
      neutral: 0
    };
  }

  render() {
    let modifiedData = this.props.data.reduce((accum, elem) => {
      if (elem.score >= 1) {
        accum["good"] = accum["good"] ? +accum["good"] + +elem.score : +elem.score;
      } else if (elem.score <= -1) {
        accum["bad"] = accum["bad"] ? +accum["bad"] + +elem.score : +elem.score;
      } else {
        accum["neutral"] = accum["neutral"] ? +accum["neutral"] + 1 : 1;
      }
      return accum;
    }, {});
    console.log(modifiedData)
    return (
      <svg id='bar-chart' width={this.state.width} height={this.state.height}>
        {<Bar width={this.state.width} type="bad" level={Math.abs(modifiedData.bad)} x={0} height={this.state.height}/>}
        {<Bar width={this.state.width} type="neutral" level={Math.abs(modifiedData.neutral)} x={1} height={this.state.height}/>}
        {<Bar width={this.state.width} type="good" level={Math.abs(modifiedData.good)} x={2} height={this.state.height}/>}
      </svg>
    );
  }
}

export default BarChart;