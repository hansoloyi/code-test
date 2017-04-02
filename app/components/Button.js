import React, { Component } from 'react';
import { colors } from '../shared/styles';

const styles = {
  active: {
    color: colors.white,
    backgroundColor: colors.teal,
  }
}

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { active } = styles;
    const newStyle = (this.props.isActive)
                        ? Object.assign({}, this.props.styles, active)
                        : this.props.styles;
    return (
      <div style={newStyle} onClick={this.props.onClick}>
        {this.props.text}
      </div>
    )
  }
}
