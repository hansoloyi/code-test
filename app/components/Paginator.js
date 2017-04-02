import React, { Component } from 'react';
import Button from './Button';
import { colors } from '../shared/styles';
import { Link, hashHistory } from 'react-router';

const styles = {
  button: {
    color: colors.white,
    display: 'inline-block',
    backgroundColor: colors.teal,
    padding: '4px 10px',
    marginRight: '10px',
    cursor: 'pointer'
  },
  container: {
    float: 'right',
    marginTop: '3%',
    alignItems: 'right'
  }
}

export default class Paginator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { button, container } = styles;
    const page = this.props.page || 1;
    const search = this.props.currentSearch;
    const backPage = `search/${search}/${parseInt(page)-1}`;
    const nextPage = `search/${search}/${parseInt(page)+1}`;
    return (
      <div style={container}>
        {(page > 1)
          ? <Link to={backPage}>
              <Button text={'<'} styles={button}/>
            </Link>
          : null }
        {(this.props.hasData)
          ? <Link to={nextPage}>
              <Button text={'>'} styles={button}/>
            </Link>
          : null }
      </div>
    )
  }
}
