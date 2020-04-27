import { ofType } from 'redux-observable';
import { Observable, from } from 'rxjs';
import { mergeMap,  map as rxmap } from 'rxjs/operators';
import createFetchTypes from "../../helpers/createFetchTypes";
import apiClient from "../../helpers/apiClient";

export const createEpic = (fetchName, fetchUrl, methodName, apiCallPayload) => {
    const fetchTypes = createFetchTypes(fetchName);
    const fetchUserSuccess = payload => ({ type: fetchTypes.SUCCESS, payload });
    const fetchUserFailure = error => ({ type: fetchTypes.FAILURE, error });

    let apiMethod;
    if (methodName === "POST") {
        apiMethod = apiClient.httpClient.post;
    } else if (methodName === "DELETE") {
        apiMethod = apiClient.httpClient.delete;
    } else {
        apiMethod = apiClient.httpClient.get;
    }
    return action$ => action$.pipe(
        ofType(fetchTypes.REQUEST),
        mergeMap(action => {
            const payload = apiCallPayload || action.payload;
            let modifiedUrl = fetchUrl;
            if(payload) {
                modifiedUrl = fetchUrl
                    .replace("{id}", payload._id || payload.id || "")
                    .replace("{userId}", payload.userId || "")
                    .replace("{locationId}", payload.locationId || "")
                    .replace("{currentUserId}", payload.currentUserId || "")
                    .replace("{areaId}", payload.areaId || "")
                    .replace("{requestId}", payload.requestId || "");
            }
            return (apiMethod(modifiedUrl, payload))
            .then(response => {
                if (response.error || response.data.error) {
                    return fetchUserFailure(response);
                } else {
                    return fetchUserSuccess(response.data);
                }
            })
            .catch(error => fetchUserFailure(error))
        })
    );
}