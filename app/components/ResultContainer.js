import React, { Component } from 'react';
import { configs } from '../configs';
import { colors } from '../shared/styles';
import { getList, addToRecent } from '../actions/api';
import Button from './Button';
import Result from './Result';

const styles = {
  background: {
    marginLeft: '3%',
    marginTop: '2%'
  },
  type: {
    display: 'inline-block',
    padding: '10px 10px',
    border: `1px solid ${colors.teal}`,
    color: colors.teal,
    marginRight: '1%',
    cursor: 'pointer',
    marginBottom: '2%'
  }
}

export default class ResultContainer extends Component {
  constructor(props) {
    super(props);
  }

  _handleSwitch(type){
    this.props.dispatch(getList(this.props.currentSearch, type, 1));
    this.props.router.push(`/search/${this.props.currentSearch}/1`);
  }

  render() {
    const { background, type, active } = styles;

    const movieActive = (this.props.type == 'movie');
    const seriesActive = (this.props.type == 'series');
    const episodesActive = (this.props.type == 'episode');

    var sortedList = this.props.list || [];
    sortedList.sort(function(a, b) {
      const aYear = a.Year || '0';
      const bYear = b.Year || '0';

      const aCompare = parseInt(aYear.split('-')[0]);
      const bCompare = parseInt(bYear.split('-')[0]);
      return bCompare - aCompare;
    });

    return (
      <div style={background}>
        <div>
          {(this.props.movieExist) ? <Button text={'Movies'} onClick={this._handleSwitch.bind(this, 'movie')} isActive={movieActive} styles={type}/> : null}
          {(this.props.seriesExist) ? <Button text={'Series'} onClick={this._handleSwitch.bind(this, 'series')} isActive={seriesActive} styles={type}/> : null}
          {(this.props.episodeExist) ? <Button text={'Episodes'} onClick={this._handleSwitch.bind(this, 'episode')} isActive={episodesActive} styles={type}/> : null}
        </div>
        <div>
          {sortedList.map((item, idx) => {
            return (<Result key={idx} result={item} dispatch={this.props.dispatch} favorites={this.props.favorites} />)
          })}
        </div>
      </div>
    )
  }
}
