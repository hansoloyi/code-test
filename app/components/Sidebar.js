import React, { Component } from 'react';
import List from '../icons/List';
import Star from '../icons/Star';
import Search from '../icons/Search';
import Button from './Button';
import { colors } from '../shared/styles';
import { clearFavorites, clearRecent, getList, currentSearch } from '../actions/api';
import { Link, hashHistory } from 'react-router';

const styles = {
  background: {
    width: '25%',
    textAlign: 'right',
    paddingRight: '3%',
    paddingTop: '20px',
    color: colors.darkGray
  },
  sideItem: {
    padding: '15px 0px',
    borderBottom: `1px solid ${colors.lightGray}`,
    cursor: 'pointer',
    paddingRight: '20px',
  },
  recentItem: {
    padding: '15px 0px',
    paddingRight: '20px',
  },
  recentContainer: {
    padding: '15px 0px',
    cursor: 'pointer',
    paddingRight: '20px',
  },
  text: {
    display: 'inline-block',
    marginRight: '10px'
  },
  active: {
    color: colors.teal
  },
  recentStyle: {
    borderRight: `1px solid ${colors.darkGray}`,
    paddingRight: '20px',
    marginBottom: '4px'
  },
  clear: {
    border: `1px solid ${colors.darkGray}`,
    width: '100px',
    float: 'right',
    marginTop: '15px',
    textAlign: 'center'
  }
};

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this._handleClear = this._handleClear.bind(this);
  }

  _handleClear(e) {
    e.preventDefault();
    this.props.dispatch(clearRecent())
  }

  _handleClick(item, e) {
    // this.props.router.push(``);
    this.props.dispatch(currentSearch(item))
  }

  render() {
    const {
      background,
      sideItem,
      text,
      active,
      recentStyle,
      clear,
      recentContainer,
      recentItem
     } = styles;
    const backgroundStyle = Object.assign({}, background, this.props.styles);

    const recentMap = this.props.recent.slice(0,8).map((recent, idx) => {
      return (
        <Link to={`search/${recent}/1`} key={idx}>
          <div style={recentStyle} onClick={this._handleClick.bind(this, recent)}>
            {recent}
          </div>
        </Link>
      );
    })

    return (
      <div style={backgroundStyle}>
        <Link to="search" activeStyle={active}>
          <div style={sideItem}>
            <div style={text}> Search </div>
            <Search width={28} height={28} color={colors.darkGray} />
          </div>
        </Link>

        <Link to="favorites" activeStyle={active}>
          <div style={sideItem}>
            <div style={text}> Favorites </div>
            <Star width={28} height={28} color={colors.darkGray} />
          </div>
        </Link>

        <div style={recentItem} onClick={this._handleRecent}>
          <div style={text}> Recent Searches </div>
          <List width={26} height={26} color={colors.darkGray} />
        </div>

        <div style={recentContainer}>
          {recentMap}
          {(this.props.recent.length)
            ? <Button styles={clear} text={'Clear'} onClick={this._handleClear} isActive={false} />
            : null}
        </div>
      </div>
    );
  }
}
