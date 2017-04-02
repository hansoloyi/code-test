import axios from 'axios';
import { configs, actions } from '../configs';

function hasResults(data) {
  return (data && data.Response == 'True') ? 1 : 0
}

export function getList(title, type, page) {
  return function(dispatch) {
    dispatch({type: actions.NEW_SEARCH, payload: { type: type, search: title }})
    axios.get(`${configs.apiUrl}/?s=${title}&type=movie`)
      .then((resp) => {
        dispatch({ type: actions.MOVIE_LENGTH, payload: hasResults(resp.data) });
      })
      .catch((err) => {
         dispatch({type: actions.RETRIEVE_ERROR, payload: err});
       })

    axios.get(`${configs.apiUrl}/?s=${title}&type=series`)
      .then((resp) => {
        dispatch({ type: actions.SERIES_LENGTH, payload: hasResults(resp.data) });
      })
      .catch((err) => {
         dispatch({type: actions.RETRIEVE_ERROR, payload: err});
       })

    axios.get(`${configs.apiUrl}/?s=${title}&type=episode`)
      .then((resp) => {
        dispatch({type: actions.EPISODE_LENGTH, payload: hasResults(resp.data) });
      })
      .catch((err) => {
         dispatch({type: actions.RETRIEVE_ERROR, payload: err});
       })

    axios.get(`${configs.apiUrl}/?s=${title}&type=${type}&page=${page}`)
      .then((resp) => {
        getMoreInfo(dispatch, resp.data);
      })
      .catch((err) => {
         dispatch({type: actions.RETRIEVE_ERROR, payload: err});
       })
   }
}

function getMoreInfo(dispatch, list) {
  const data = (list && list.Search) ? list.Search : [];
  const result = (list && list.Response) ? list.Response : 'False'
  dispatch({type: actions.HAS_RESULTS, payload: result})
  data.forEach((item) => {
    axios.get(`${configs.apiUrl}/?i=${item.imdbID}`)
      .then((resp) => {
        dispatch({type: actions.ADD_TO_LIST, payload: resp.data})
      })
      .catch((err) => {
         dispatch({type: actions.RETRIEVE_ERROR, payload: err});
       })
  })
}

export function getByIdAdd(id) {
  return function(dispatch) {
    axios.get(`${configs.apiUrl}/?i=${id}`)
      .then((resp) => {
        dispatch({type: actions.ADD_TO_LIST, payload: resp.data})
      })
      .catch((err) => {
         dispatch({type: actions.RETRIEVE_ERROR, payload: err});
       })
  }
}

export function currentSearch(search) {
  return {
    type: actions.CURRENT_SEARCH,
    payload: search
  }
}

export function addToRecent(search) {
  return {
    type: actions.ADD_SEARCH,
    payload: search
  }
}

export function addToFavorite(favorite) {
  return {
    type: actions.ADD_FAVORITE,
    payload: favorite
  }
}

export function removeFavorite(favorite) {
  return {
    type: actions.REMOVE_FAVORITE,
    payload: favorite
  }
}

export function clearFavorites() {
  return {
    type: actions.CLEAR_FAVORITES
  }
}

export function clearRecent() {
  return {
    type: actions.CLEAR_RECENT
  }
}
