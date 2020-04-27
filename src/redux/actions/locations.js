import {getLocations} from '../constants';
import createFetchTypes from '../../helpers/createFetchTypes';

export const getLocationsAction = () => ({
    type: createFetchTypes(getLocations).REQUEST
});
