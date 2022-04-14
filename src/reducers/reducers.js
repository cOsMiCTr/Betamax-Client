import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, SET_USERDATA, ADD_FAVMOVIES, REM_FAVMOVIES, GET_TOKEN  } from '../actions/actions';


// function getToken (state = '', action) {
//   switch(action.type){
//     case GET_TOKEN:
//       return localStorage.getItem("token");
//   }
// }

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}


function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    case ADD_FAVMOVIES:
        return action.value;
    case REM_FAVMOVIES:
        return action.value;
    default:
      return state;
  }
}

function user(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function userData(state = "", action) {
  switch (action.type) {
    case SET_USERDATA:
      console.log("SET_USERDATA Works");
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  userData
});

export default moviesApp;
