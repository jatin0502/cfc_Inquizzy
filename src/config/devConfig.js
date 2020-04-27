const baseBackendUrl = "http://localhost:8080";
export default {
    fetchUserUrl: `${baseBackendUrl}/user`,
    registerUserUrl: `${baseBackendUrl}/user/register`,
    loginUserUrl: `${baseBackendUrl}/authentication/authenticate`,
    getLocationsUrl: `${baseBackendUrl}/locations`,
    getMyRequestsUrl: `${baseBackendUrl}/requests/getAllRequestsForUser/{userId}`,
    getRequestsInLocationUrl: `${baseBackendUrl}/requests/getAllRequestsForLocation/{locationId}/{currentUserId}`,
    addRequestUrl: `${baseBackendUrl}/requests/addRequest`,
    acceptRequestUrl: `${baseBackendUrl}/requests/acceptRequest/{requestId}/{userId}`,
    completeRequestUrl: `${baseBackendUrl}/requests/completeRequest/{requestId}/{userId}`,
};