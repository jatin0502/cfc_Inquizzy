import { combineEpics } from 'redux-observable';
import { createEpic } from './epicHelper';
import { 
    fetchUser, registerUser, loginUser, 
    getLocations, 
    getMyRequests, getRequestsInLocation, addRequest, acceptRequest, completeRequest
} from "../constants";
import config from "../../config";

const fetchUserEpic = createEpic(fetchUser, config.fetchUserUrl);
const registerUserEpic = createEpic(registerUser, config.registerUserUrl, "POST");
const loginUserEpic = createEpic(loginUser, config.loginUserUrl, "POST");
const getLocationsEpic = createEpic(getLocations, config.getLocationsUrl);
const getMyRequestsEpic = createEpic(getMyRequests, config.getMyRequestsUrl);
const getRequestsInLocationEpic = createEpic(getRequestsInLocation, config.getRequestsInLocationUrl);
const addRequestEpic = createEpic(addRequest, config.addRequestUrl, "POST");
const acceptRequestsEpic = createEpic(acceptRequest, config.acceptRequestUrl, "POST");
const completeRequestsEpic = createEpic(completeRequest, config.completeRequestUrl, "POST");

const rootEpic = combineEpics(
    fetchUserEpic,
    registerUserEpic,
    loginUserEpic,
    getLocationsEpic,
    getMyRequestsEpic,
    getRequestsInLocationEpic,
    addRequestEpic,
    acceptRequestsEpic,
    completeRequestsEpic
);

export default rootEpic;