import React from 'react';
import axios from 'axios';
import Sentiment from './Sentiment.jsx';
import TimeSeries from './TimeSeries.jsx';
import Words from './Words.jsx';
import BarChart from './BarChart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sentiment: 0,
      data: [],
      showSentiment: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    axios.get(`/api/${this.state.query}/sentiment`)
      .then(res => this.setState({ 
        sentiment: res.data.score,
        data: res.data.data,
        showSentiment: true
      }, () => console.log(this.state.data)))
      .catch(err => console.error(err));
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    let { sentiment, showSentiment } = this.state;

    return (
      <div className='container'>
        {showSentiment && <TimeSeries data={this.state.data}/>}
        <div className='flex'>
          <div className='form'>
            <h2>SENTIMENTALYZE<span>.io</span></h2>
          </div>
          <div className='search'>
            <input type='text' autoComplete="off" id='query' onChange={this.handleChange} autoFocus></input>
            <button id='submit' onClick={this.handleSubmit}>Go</button>
          </div>
          {showSentiment && <Sentiment sentiment={sentiment} data={this.state.data}/>}
          {showSentiment && <Words data={this.state.data}/>}
          {<BarChart data={this.state.data}/>}
        </div>
      </div>
    );
  }
}

export default App;