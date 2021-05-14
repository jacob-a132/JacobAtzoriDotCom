import React, { Component } from 'react';

class Ref extends Component {
  render() {
    let { link, text } = this.props;
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
       {text}
      </a>
    );
  }
}

export default Ref;
