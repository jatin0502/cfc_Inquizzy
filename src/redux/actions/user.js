import {registerUser, loginUser, logoutUser} from '../constants';
import createFetchTypes from '../../helpers/createFetchTypes';

export const registerUserAction = (payload) => ({
    type: createFetchTypes(registerUser).REQUEST,
    payload
});
export const loginUserAction = (payload) => ({
    type: createFetchTypes(loginUser).REQUEST,
    payload
});

export const logoutUserAction = () => ({
    type: createFetchTypes(logoutUser).SUCCESS,
});