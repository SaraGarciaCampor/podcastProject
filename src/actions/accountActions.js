import axios from 'src/utils/axios';

export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const UPDATE_PROFILE = '@account/update-profile';

export function login(email, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      console.log("hoadlasdjlasjmnd");
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          
        }
      });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}


export function logout() {
  return async (dispatch) => {
    

    dispatch({
      type: LOGOUT
    });
  };
}

export function register() {
  return true;
}

export function updateProfile(update) {
  const request = axios.post('/api/account/profile', { update });

  return (dispatch) => {
    request.then((response) => dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    }));
  };
}
