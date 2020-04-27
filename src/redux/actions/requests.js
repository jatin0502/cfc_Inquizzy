import {
  getMyRequests,
  getRequestsInLocation,
  addRequest,
  acceptRequest,
  completeRequest,
} from "../constants";
import createFetchTypes from "../../helpers/createFetchTypes";

export const getMyRequestsAction = (userId) => ({
  type: createFetchTypes(getMyRequests).REQUEST,
  payload: { userId },
});

export const getRequestsInLocationAction = (locationId, currentUserId) => ({
  type: createFetchTypes(getRequestsInLocation).REQUEST,
  payload: { locationId, currentUserId },
});

export const addRequestAction = (payload) => ({
  type: createFetchTypes(addRequest).REQUEST,
  payload,
});

export const acceptRequestAction = (requestId, userId) => ({
  type: createFetchTypes(acceptRequest).REQUEST,
  payload: { requestId, userId },
});

export const completeRequestAction = (requestId, userId) => ({
  type: createFetchTypes(completeRequest).REQUEST,
  payload: { requestId, userId },
});
