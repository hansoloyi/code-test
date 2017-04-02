import React, { Component } from 'react';
import { colors } from '../shared/styles';

const styles = {
  container: {
    color: colors.darkGray,
    borderBottom: `1px solid ${colors.teal}`,
    height: '40px',
  },
  item: {
    display: 'inline-block',
    lineHeight: '40px',
    marginLeft: '10px'
  }
}

export default class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { container, item } = styles;
    const fullStyle = Object.assign({}, container, this.props.styles);

    return (
      <div style={fullStyle}>
        <div style={item}> {this.props.children} </div>
        { (this.props.title) ? <div style={item}> {this.props.title.toUpperCase()} </div> : null }
      </div>
    )
  }
}
