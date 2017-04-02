import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/View';
import SearchView from './components/SearchView';
import Favorites from './components/Favorites';
import FullResults from './components/FullResults';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import { persistStore, autoRehydrate } from 'redux-persist';

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={View}>
          <Route path="search" component={SearchView}>
            <Route path=":search/:page" component={SearchView} />
          </Route>
          <Route path="result/:id" component={FullResults} />
          <Route path="favorites" component={Favorites} />
          <IndexRoute component={SearchView} />
        </Route>
      </Router>
  </Provider>,
  document.getElementById('app')
);
