import React, { Component } from 'react';
import { colors } from '../shared/styles';
import Title from './Title';
import Star from '../icons/Star';
import { clearFavorites, clearRecent } from '../actions/api';
import Button from './Button';
import Result from './Result';

const styles = {
  background: {
    borderLeft: `1px solid ${colors.darkGray}`,
    marginTop: '30px',
    paddingBottom: '50px'
  },
  title: {
    marginLeft: '2%',
    padding: '5px',
  },
  clear: {
    marginLeft: '2%',
    marginTop: '15px',
    backgroundColor: colors.teal,
    color: colors.white,
    width: '150px',
    padding: '8px 0px',
    textAlign: 'center',
    cursor: 'pointer'
  },
  item: {
    marginLeft: '2%',
    marginTop: '15px'
  },
  loadMore: {
    backgroundColor: colors.teal,
    color: colors.white,
    margin: '0 auto',
    marginLeft: '2%',
    padding: '8px 0px',
    marginTop: '20px',
    textAlign: 'center'
  }
}

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this._handleClear = this._handleClear.bind(this);
    this._loadMore = this._loadMore.bind(this);
    this.state={
      numToShow: 10
    }
  }

  _loadMore() {
    this.setState({
      numToShow: this.state.numToShow + 10
    })
  }

  _handleClear() {
    this.props.dispatch(clearFavorites())
  }

  render() {
    const { background, title, clear, item, loadMore } = styles;
    return (
      <div style={background}>
        <Title title={"Favorites"} styles={title}>
          <Star color={colors.teal} width={28} height={28} />
        </Title>
        <div style={item}>
          {this.props.favorites.slice(0, this.state.numToShow).map((fav, idx) => {
            return (<Result key={idx} favorites={this.props.favorites} dispatch={this.props.dispatch} result={fav} />)
          })}
        </div>
        {(this.props.favorites.length > 0)
          ? <Button styles={clear} onClick={this._handleClear} text={'CLEAR ALL'} isActive={false} />
          : <div style={item}> No Favorites! Go add some </div>}
        {(this.props.favorites.length > this.state.numToShow)
          ? <Button styles={loadMore} text={'LOAD MORE'} onClick={this._loadMore} />
          : null}
      </div>
    )
  }
}
