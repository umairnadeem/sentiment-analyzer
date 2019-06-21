import React from 'react';
import axios from 'axios';
import Sentiment from './Sentiment.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sentiment: 0,
      showSentiment: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    axios.get(`/api/${this.state.query}/sentiment`)
      .then(res => this.setState({ 
        sentiment: res.data.sentiment,
        showSentiment: true
      }))
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
      <div>
        <div id='form'>
          <label>Sentimentalyze</label>
          <input type='text' id='query' onChange={this.handleChange}></input>
          <button id='submit' onClick={this.handleSubmit}>Go</button>
        </div>
        {showSentiment && <Sentiment sentiment={sentiment}/>}
      </div>
    );
  }
}

export default App;