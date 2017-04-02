import React, { Component } from 'react';

export default class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill={this.props.color}
        height={this.props.height}
        viewBox="0 0 24 24"
        width={this.props.width}>
        <path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    )
  }
}
