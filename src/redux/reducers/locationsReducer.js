import { getLocations } from "../constants";
import createFetchTypes from '../../helpers/createFetchTypes';

const getLocationsFetchTypes = createFetchTypes(getLocations);

const locationsReducer = (state = {isLoading: true, locations: []}, action) => {
    switch (action.type) {
        case getLocationsFetchTypes.REQUEST:
            return {
                isLoading: true,
                locations: []
            };
        case getLocationsFetchTypes.SUCCESS:
            return {
                isLoading: false,
                locations: action.payload
            };
        case getLocationsFetchTypes.FAILURE:
            return {
                isLoading: false,
                locations: []
            };
        default:
            return state;
    }
};

export default locationsReducer;