import React, { Component } from 'react';
import { colors } from '../shared/styles';
import Button from './Button'
import { addToFavorite, removeFavorite } from '../actions/api';

const styles = {
  container: {
    marginTop: '30px',
    borderLeft: `1px solid ${colors.darkGray}`,
    paddingBottom: '50px'
  },
  allItems: {
    marginLeft: '2%'
  },
  image: {
    display: 'inline-block'
  },
  info: {
    display: 'inline-block',
    width: '45%',
    marginLeft:'1%',
    verticalAlign: 'top'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '2%'
  },
  infoItem: {
    marginBottom: '1%'
  },
  restTitle: {
    display: 'inline-block',
    fontWeight: 'bold'
  },
  restDesc: {
    marginLeft: '2%',
    display: 'inline-block'
  },
  rest: {
    marginTop: '2%'
  },
  add: {
    backgroundColor: colors.yellow,
    color: colors.darkGray,
    padding: '10px 30px',
    width: '300px',
    textAlign: 'center',
    marginTop: '2%',
    cursor: 'pointer'
  },
  remove: {
    backgroundColor: colors.teal,
    color: colors.white,
    width: '300px',
    padding: '10px 30px',
    textAlign: 'center',
    marginTop: '2%',
    cursor: 'pointer'
  }
}

export default class FullResults extends Component {
  constructor(props) {
    super(props);
  }

  hasItem(field) {
    return (field && field != 'N/A');
  }

  hasRating(rating) {
    return rating && rating.length > 0;
  }

  isInFavorites(item, favorites) {
    const id = item.imdbID;
    return favorites.filter((fav) => fav.imdbID == id).length > 0;
  }

  _addOrRemoveFavorites(item, favorites, e) {
    e.preventDefault();
    if (this.isInFavorites(item, favorites)) {
      this.props.dispatch(removeFavorite(item))
    } else {
      this.props.dispatch(addToFavorite(item));
    }
  }

  render() {
    const { container, allItems, image, info, title, infoItem, restDesc, restTitle, rest, add, remove } = styles;
    const pulledData = this.props.list.length == 0
      ? JSON.parse(window.localStorage.getItem('reduxPersist:list'))
      : this.props.list;
    const pulledFavorites = this.props.favorites.length == 0
      ? JSON.parse(window.localStorage.getItem('reduxPersist:favorites'))
      : this.props.favorites;
    const id = this.props.params.id;
    const result = pulledData.filter((item) => item.imdbID == id);
    const display = result[0];
    const years = display.Year.split('\u2013');
    const displayYear = (years.length == 1)
      ? years[0]
      : (years.length == 2 && years[1].length == 0)
        ? `${years[0]}-Present`
        : `${years[0]}-${years[1]}`;
    const img = (this.hasItem(display.Poster)) ? display.Poster : '/images/notfound.jpg';

    const buttonText = this.isInFavorites(display, pulledFavorites) ? 'Remove from Favorites' : 'Add to Favorites';
    const buttonStyle = this.isInFavorites(display, pulledFavorites) ? remove : add;

    return (
      <div style={container}>
        <div style={allItems}>
          <div>
            <div style={image}> <img src={img} width="300" height="450"/> </div>
            <div style={info}>
              <div style={title}> {display.Title} </div>
              {this.hasItem(display.Year) ? <div style={infoItem}> <b> Year: </b> {displayYear} </div> : null }
              {this.hasItem(display.Plot) ? <div style={infoItem}> <b> Plot </b>: {display.Plot} </div> : null }
              {this.hasItem(display.Genre) ? <div style={infoItem}> <b> Genre </b>: {display.Genre} </div> : null }
              {this.hasItem(display.Language) ? <div style={infoItem}> <b> Language </b>: {display.Language} </div> : null }
              {this.hasItem(display.Director) ? <div style={infoItem}> <b> Director </b>: {display.Director} </div> : null }
              {this.hasItem(display.Writer) ? <div style={infoItem}> <b> Writer </b>: {display.Writer} </div> : null }
              {this.hasItem(display.Actors) ? <div style={infoItem}> <b> Actors </b>: {display.Actors} </div> : null }
              {this.hasItem(display.Rated) ? <div style={infoItem}> <b> Rated </b>: {display.Rated} </div> : null }
              {this.hasItem(display.Runtime) ? <div style={infoItem}> <b> Runtime </b>: {display.Runtime} </div> : null }
            </div>
          </div>
          <div style={rest}>
            {(this.hasRating(display.Ratings))
              ? <div>
                  {display.Ratings.map((rating, idx) => {
                    return (<div key={idx} style={infoItem}><b>{rating.Source} </b>: {rating.Value} </div>)
                  })}
                </div>
              : null}
          </div>
          <div style={rest}>
            {this.hasItem(display.Awards) ? <div style={restTitle}> Awards: </div> : null}
            {this.hasItem(display.Awards) ? <div style={restDesc}> {display.Awards} </div> : null }
          </div>
          <Button styles={buttonStyle} text={buttonText} onClick={this._addOrRemoveFavorites.bind(this, display, pulledFavorites)}/>
        </div>
      </div>
    )
  }
}
