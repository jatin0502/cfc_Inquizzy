import { registerUser, loginUser, logoutUser } from "../constants";
import createFetchTypes from '../../helpers/createFetchTypes';

const registerUserFetchTypes = createFetchTypes(registerUser);
const loginUserFetchTypes = createFetchTypes(loginUser);
const logoutUserFetchTypes = createFetchTypes(logoutUser);


const userReducer = (state = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}, action) => {
    switch (action.type) {
        case registerUserFetchTypes.SUCCESS:
        case loginUserFetchTypes.SUCCESS:
            {
                var loggedInState = {
                    ...state,
                    isLoggedIn: true,
                    error: false,
                    ...(action.payload),

                };
                localStorage.setItem('user', JSON.stringify(loggedInState));
                return loggedInState;
            }
        case loginUserFetchTypes.FAILURE:
        case registerUserFetchTypes.FAILURE:
            return {
                ...state,
                error: true,
                errorDetails: { ...(action.payload) }
            };
        case logoutUserFetchTypes.SUCCESS:
            localStorage.removeItem('user');
            return {};

        default:
            return state
    }
};

export default userReducer;