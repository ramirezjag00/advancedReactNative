import { AsyncStorage } from 'react-native';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
} from './types';
import { Facebook } from 'expo';

// How to use AsyncStorage:
// key value store, basically like Local Storage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');


// 'async await' syntax with redux-thunk 'dispatch'
export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // Dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up Fb Login Process
    handleFacebookLogin(dispatch);
  }
}

cosnt handleFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('290094984983909', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
