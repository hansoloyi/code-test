import React, { Component } from 'react';
import { colors } from '../shared/styles';
import Search from '../icons/Search';
import Title from './Title';
import { connect } from 'react-redux';
import { getList, addToRecent, currentSearch } from '../actions/api';
import ResultContainer from './ResultContainer';
import { configs } from '../configs';
import Paginator from './Paginator';
import { Router } from 'react-router';
import _ from 'lodash';

const styles = {
  background: {
    borderLeft: `1px solid ${colors.darkGray}`,
    marginTop: '30px',
    paddingBottom: '100px'
  },
  title: {
    marginLeft: '2%',
    padding: '5px',
  },
  search: {
    display: 'inline-block',
  },
  error: {
    marginLeft: '3%',
    marginTop: '2%'
  }
}

export default class SearchView extends Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    const searchKey = this.input.value;
    this.props.dispatch(currentSearch(searchKey))
    if (searchKey != this.props.currentSearch) {
      this.props.router.push(`/search/${searchKey}/1`);
    }
    this.props.dispatch(addToRecent(searchKey));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.page != nextProps.params.page
      || this.props.currentSearch != nextProps.currentSearch
      || !this.props.isSame) {
        const page = nextProps.params.page || 1;
        this.props.dispatch(getList(nextProps.currentSearch, nextProps.type, page))
    }
  }

  render() {
    const { background, title, search, error } = styles;
    const hasData = ( this.props.list && this.props.list.length > 0 );

    return (
      <div style={background}>
        <Title title={""} styles={title}>
          <Search color={colors.teal} width={28} height={28} />
          <form style={search} onSubmit={this._handleSubmit}>
            <input type="text" placeholder="Search by Name..." ref={(input) => this.input = input} />
          </form>
        </Title>
        {(hasData)
          ? <ResultContainer {...this.props} />
          : (!this.props.firstLoad && !this.props.hasResults)
            ? <div style={error}> {configs.notFound} </div>
            : null}
        <Paginator hasData={hasData} page={this.props.params.page} currentSearch={this.props.currentSearch}/>
      </div>
    );
  }
}
