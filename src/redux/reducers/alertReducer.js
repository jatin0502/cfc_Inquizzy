import { loginUser, logoutUser, addRequest, registerUser, acceptRequest, completeRequest } from "../constants";
import createFetchTypes from '../../helpers/createFetchTypes';

const loginUserFetchTypes = createFetchTypes(loginUser);
const logoutUserFetchTypes = createFetchTypes(logoutUser);
const addRequestFetchTypes = createFetchTypes(addRequest);
const registerUserFetchTypes = createFetchTypes(registerUser);
const acceptRequestFetchTypes = createFetchTypes(acceptRequest);
const completeRequestFetchTypes = createFetchTypes(completeRequest);

const appendAlert = (state, msg, alertType) => [
    ...state,
    {msg, alertType}
];

const alertReducer = (state = [], action) => {
    switch (action.type) {
        case acceptRequestFetchTypes.SUCCESS:
            return appendAlert(
                state,
                `Thank you for accepting the request!!`,
                'success'
            );
        case acceptRequestFetchTypes.FAILURE:
            return appendAlert(
                state,
                `There was some error in assigning the request to you. Please try again`,
                'danger'
            );
        case completeRequestFetchTypes.SUCCESS:
            return appendAlert(
                state,
                `Thank you for completing the request!!`,
                'success'
            );
        case completeRequestFetchTypes.FAILURE:
            return appendAlert(
                state,
                `There was some error in completing the request to you. Please try again`,
                'danger'
            );
        case registerUserFetchTypes.SUCESS:
            return appendAlert(
                state,
                `Hi ${action.payload.username}!! Welcome Aboard!!`,
                'success'
            );
        case registerUserFetchTypes.FAILURE:
            return appendAlert(
                state,
                `Some error occured during registration. Please try again!!`,
                'danger'
            );
        case loginUserFetchTypes.SUCCESS:
            return appendAlert(
                state,
                `Hi ${action.payload.username}!! You have been successfully logged in!!`,
                'success'
            );
        case loginUserFetchTypes.FAILURE:
            return appendAlert(
                state,
                'Sorry!! Login was unsuccessful. Please try again',
                'danger'
            );
        case logoutUserFetchTypes.SUCCESS:
            return appendAlert(
                state,
                'You have been successfully logged out!!',
                'success'
            );
        case addRequestFetchTypes.SUCCESS:
            return appendAlert(
                state,
                `Your Request has been added successfully!! Volunteers will be serving you soon!!`,
                'success'
            );
        case addRequestFetchTypes.FAILURE:
            return appendAlert(
                state,
                `${action.error && action.error.message}. Sorry, we were not able to add your request. Please try again`,
                'danger'
            );
        case 'REMOVE_ALERT':
            {
                return [];
            }
        default:
            return state
    }
};

export default alertReducer;