import React, { Component } from 'react';
import { colors } from '../shared/styles';
import { Link, hashHistory } from 'react-router';
import Star from '../icons/Star';
import { actions } from '../configs';
import { addToFavorite, removeFavorite } from '../actions/api';

const styles = {
  item: {
    cursor: 'pointer',
    marginTop: '10px',
    border: `1px solid ${colors.darkGray}`,
    padding: '5px',
    alignItems: 'center'
  },
  image: {
    display: 'inline-block'
  },
  info: {
    marginLeft: '1%',
    display: 'inline-block',
    width: '82%',
    verticalAlign: 'middle'
  },
  title: {
    color: colors.darkGray
  },
  plot: {
    fontSize: '12px'
  },
  icon: {
    marginLeft: '1%',
    display: 'inline-block',
    width: '4%',
    verticalAlign: 'middle',
    textAlign: 'center'
  }
}

export default class Result extends Component {
  constructor(props) {
    super(props);
  }

  isInFavorites(item) {
    const id = item.imdbID;
    return this.props.favorites.filter((fav) => fav.imdbID == id).length > 0;
  }

  _addOrRemoveFavorites(item, e) {
    e.preventDefault();
    if (this.isInFavorites(item)) {
      this.props.dispatch(removeFavorite(item))
    } else {
      this.props.dispatch(addToFavorite(item));
    }
  }

  render() {
    const { item, image, info, title, plot, icon } = styles;
    const link = `result/${this.props.result.imdbID}`;
    const starColor = this.isInFavorites(this.props.result)
      ? colors.yellow
      : colors.darkGray;
    const years = this.props.result.Year.split('\u2013');
    const displayYear = (years.length == 1) ? years[0] : (years.length == 2 && years[1].length == 0) ? `${years[0]}-Present` : `${years[0]}-${years[1]}`
    const img = (this.props.result.Poster == 'N/A') ? '/images/notfound.jpg' : this.props.result.Poster;
    const displayPlot = (this.props.result.Plot == 'N/A') ? null : this.props.result.Plot;

    return(
      <Link to={link}>
        <div style={item}>
          <div style={image}> <img src={img} height="90px" width="60px"/> </div>
          <div style={info}>
            <div style={title}> {this.props.result.Title} ({displayYear}) </div>
            <div style={plot}> {displayPlot} </div>
          </div>
          <div style={icon} onClick={this._addOrRemoveFavorites.bind(this, this.props.result)}>
            <Star height="30" width="30" color={starColor}/>
          </div>
        </div>
      </Link>
    );
  }
}
