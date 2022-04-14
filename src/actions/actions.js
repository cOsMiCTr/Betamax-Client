export const SET_MOVIES = "SET_MOVIES";
export const SET_USER = "SET_USER";
export const SET_FILTER = "SET_FILTER";
export const SET_USERDATA = "SET_USERDATA";
export const ADD_FAVMOVIES = "ADD_FAVMOVIES";
export const REM_FAVMOVIES = "REM_FAVMOVIES";

export const GET_TOKEN = "GET_TOKEN";

export  function getToken() {
    return {
      type: 'GET_TOKEN'
    }
}


export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value,
  };
}

export function addFavoriteMovies(value) {
  return {
    type: ADD_FAVMOVIES,
    value,
  };
}
export function removeFavoriteMovies(value) {
  return {
    type: REM_FAVMOVIES,
    value,
  };
}

export function setUser(value) {
  return {
    type: SET_USER,
    value,
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

export function setUserData(value) {
  return { type: SET_USERDATA, value };
}
