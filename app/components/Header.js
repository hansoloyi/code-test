import React, { Component } from 'react';
import { colors } from '../shared/styles';

const styles = {
  background: {
    backgroundColor: colors.teal,
    color: colors.white,
    textAlign: 'center',
    height: '50px',
    lineHeight: '50px'
  }
};

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { background } = styles;
    return (
      <div style={background}>
        CODE TEST - HANSOL YI
      </div>
    );
  }
}
