import React from 'react';
import $ from 'jquery';

class Word extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      style: {
        bottom: -10,
        transition: 'bottom 4s ease'
      }
    };
  }

  componentDidMount() {
    this._isMounted = true;
    setTimeout(() => {
      if (this._isMounted) {
        this.setState({ isLoading: true });
        this.slideIn();
      }
    }, this.props.delay);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  slideIn() {
    this.setState({ style: { 
      bottom: 200 + Math.random() * 200, 
      transition: 'bottom 4s ease',
      left: Math.random()*(document.body.clientWidth - 100) + 100,
      fontSize: `${12 + Math.abs(this.props.score) * 10}px`,
      color: this.props.score > 0 ? 'green' : 'red'
    }}, () => setTimeout(() => {
      if ($(this.node).length) $(this.node).remove()
    }, 4000));
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <div ref={node => this.node = node} className='word' style={this.state.style}>
          {this.props.word}
        </div>}
      </div>
    );
  }
}

export default Word;