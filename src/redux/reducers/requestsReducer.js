import { getMyRequests, getRequestsInLocation, addRequest, acceptRequest, completeRequest } from "../constants";
import createFetchTypes from '../../helpers/createFetchTypes';

const getMyRequestsFetchTypes = createFetchTypes(getMyRequests);
const getRequestsInLocationFetchTypes = createFetchTypes(getRequestsInLocation);
const addRequestFetchTypes = createFetchTypes(addRequest);
const acceptRequestFetchTypes = createFetchTypes(acceptRequest);
const completeRequestFetchTypes = createFetchTypes(completeRequest);

const defaultState = {
    myRequests: {
        isLoading: false,
        data: []
    },
    requestsInMyLocation: {
        isLoading : false,
        data: []
    },
    addRequest: {
        isLoading: false
    },
    acceptRequest: {
        isLoading: false
    },
    completeRequest: {
        isLoading: false
    }
};

const requestsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case getMyRequestsFetchTypes.REQUEST:
            return {
                ...state,
                myRequests: {
                    isLoading: true
                }
            };
        case getRequestsInLocationFetchTypes.REQUEST:
            return {
                ...state,
                requestsInMyLocation: {
                    isLoading: true
                }
            };
        case addRequestFetchTypes.REQUEST:
            return {
                ...state,
                addRequest: {
                    isLoading: true
                }
            };
        case acceptRequestFetchTypes.REQUEST:
            return {
                ...state,
                acceptRequest: {
                    isLoading: true
                }
            };
        case completeRequestFetchTypes.REQUEST:
            return {
                ...state,
                completeRequest: {
                    isLoading: true
                }
        };
        case getMyRequestsFetchTypes.SUCCESS:
            return {
                ...state,
                myRequests: {
                    isLoading: false,
                    data: action.payload
                }
            };
        case getRequestsInLocationFetchTypes.SUCCESS:
            return {
                ...state,
                requestsInMyLocation: {
                    isLoading: false,
                    data: action.payload
                }
            };
        case addRequestFetchTypes.SUCCESS:
            return {
                ...state,
                addRequest: {
                    isLoading: false
                }
            };
        case acceptRequestFetchTypes.SUCCESS: {
            const requestsInMyLocation = {
                ...state.requestsInMyLocation,
                data: [...state.requestsInMyLocation.data].map(req => {
                    if(req._id === action.payload._id) {
                        return  {
                            ...req,
                            assigned_to_id: action.payload.assigned_to_id,
                            accepted_date: action.payload.accepted_date,
                        };
                    }
                    return req;
                })
            }
            return {
                ...state,
                acceptRequest: {
                    isLoading: false
                },
                requestsInMyLocation
            };
        }
        case completeRequestFetchTypes.SUCCESS: {
            const requestsInMyLocation = {
                ...state.requestsInMyLocation,
                data: [...state.requestsInMyLocation.data].map(req => {
                    if(req._id === action.payload._id) {
                        return  {
                            ...req,
                            closed_date: action.payload.closed_date,
                        };
                    }
                    return req;
                })
            }
            return {
                ...state,
                completeRequest: {
                    isLoading: false
                },
                requestsInMyLocation
            };
        }
        case getMyRequestsFetchTypes.FAILURE:
            return {
                ...state,
                myRequests: {
                    isLoading: false
                }
            };
        case getRequestsInLocationFetchTypes.FAILURE:
            return {
                ...state,
                requestsInMyLocation: {
                    isLoading: false
                }
            };
        case addRequestFetchTypes.FAILURE:
            return {
                ...state,
                addRequest: {
                    isLoading: false
                }
            };
        case acceptRequestFetchTypes.FAILURE:
            return {
                ...state,
                acceptRequest: {
                    isLoading: false
                }
        };
        case completeRequestFetchTypes.FAILURE:
            return {
                ...state,
                completeRequest: {
                    isLoading: false
                }
        };
        default:
            return state;
    }
};

export default requestsReducer;