import { actions } from '../configs';
import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
  list: [],
  favorites: [],
  recent: [],
  fullResults: [],
  currentSearch: '',
  isError: false,
  type: 'movie',
  movieExist: 0,
  episodeExist: 0,
  seriesExist: 0,
  firstLoad: true,
  hasResults: false
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case REHYDRATE: {
      return Object.assign({}, state, action.payload)
    }

    case actions.MOVIE_LENGTH: {
      return { ...state, movieExist: action.payload }
    }
    case actions.SERIES_LENGTH: {
      return { ...state, seriesExist: action.payload }
    }
    case actions.EPISODE_LENGTH: {
      return { ...state, episodeExist: action.payload }
    }

    case actions.NEW_SEARCH: {
      return { ...state, type: action.payload.type, list: [], currentSearch: action.payload.search }
    }
    case actions.ADD_TO_LIST: {
      const newList = state.list.filter((item) => item.imdbID == action.payload.imdbID).length == 0 ? state.list.concat(action.payload) : state.list
      return { ...state, list: newList }
    }
    case actions.HAS_RESULTS: {
      return { ...state, hasResults: action.payload == 'True' }
    }
    case actions.CURRENT_SEARCH: {
      return { ...state, currentSearch: action.payload }
    }

    case actions.ADD_SEARCH: {
      var newRecent = state.recent.slice();
      newRecent.unshift(action.payload);
      return { ...state, recent: newRecent }
    }
    case actions.ADD_FAVORITE: {
      const idToFind = action.payload.imdbID;
      var newFavorites = state.favorites.slice();
      if (state.favorites.filter((item) => item.imdbID == idToFind).length == 0) {
        newFavorites.unshift(action.payload)
      }
      return { ...state, favorites: newFavorites }
    }
    case actions.REMOVE_FAVORITE: {
      return { ...state, favorites: state.favorites.filter((fav) => action.payload.imdbID != fav.imdbID) }
    }

    case actions.CLEAR_FAVORITES: {
      return { ...state, favorites: [] }
    }
    case actions.CLEAR_RECENT: {
      return { ...state, recent: [] }
    }
    case actions.RETRIEVE_ERROR: {
      return { ...state, isError: true }
    }
  }
  return state;
}
