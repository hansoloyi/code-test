import React, { Component } from 'react';
import { colors } from '../shared/styles';
import Header from './Header';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { persistStore } from 'redux-persist'
import store from '../store';

const styles = {
  display: {
    display: 'inline-block'
  },
  sidebar: {
    display: 'inline-block'
  },
  children: {
    width: '50%',
    display: 'inline-block',
    verticalAlign: 'top'
  }
};

@connect((store) => {
  return {
    list: store.list,
    recent: store.recent,
    favorites: store.favorites,
    isError: store.isError,
    type: store.type,
    seriesExist: store.seriesExist,
    movieExist: store.movieExist,
    episodeExist: store.episodeExist,
    currentSearch: store.currentSearch,
    firstLoad: store.firstLoad,
    hasResults: store.hasResults
  }
})
export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = { isSame: true };
  }

  componentWillReceiveProps(nextProps) {
    const currentPath = (this.props.location.pathname.startsWith('/'))
      ? this.props.location.pathname
      : '/' + this.props.location.pathname;
    const nextPath = (nextProps.location.pathname.startsWith('/'))
      ? nextProps.location.pathname
      : '/' + nextProps.location.pathname;

    this.setState({
      isSame: currentPath.split('/')[1] == nextPath.split('/')[1]
    })
  }

  componentDidMount() {
    persistStore(store, undefined, () => console.log('clearing list')).purge(['firstLoad', 'list']);
  }

  render() {
    const { display, sidebar, children } = styles;
    return (
      <div>
        <Header />
        <Sidebar styles={sidebar} {...this.props}/>
        <div style={children}>
          {React.cloneElement(this.props.children, {...this.props, isSame: this.state.isSame })}
        </div>
      </div>
    )
  }
}
