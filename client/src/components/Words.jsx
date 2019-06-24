import React from 'react';
import Word from './Word.jsx';

class Words extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let words = this.props.data.map((elem, x) => elem.words.map((word, y) => <Word key={`${x} ${y}`} word={word} score={elem.score} delay={x*3000}/>));
    words = [].concat(...words);
    console.log(words)
    return (
      <div id='floating-words'>
        {words}
      </div>
    );
  }
}

export default Words;