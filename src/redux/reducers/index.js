import { combineReducers } from 'redux';
import userReducer from './userReducer';
import locationsReducer from './locationsReducer';
import requestsReducer from './requestsReducer';
import alertReducer from './alertReducer';

const rootReducer =  combineReducers({
    user: userReducer,
    locations: locationsReducer,
    requests: requestsReducer,
    alerts: alertReducer

});

export default rootReducer;