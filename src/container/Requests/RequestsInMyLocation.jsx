import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RequestList from "../../components/Requests/RequestList";
import { connect } from "react-redux";
import {
  getRequestsInLocationAction,
  acceptRequestAction,
  completeRequestAction,
} from "../../redux/actions/requests";

const RequestsInMyLocation = (props) => {
  const [showOnlyRequestsAssignedToMe, setShowOnlyRequestsAssignedToMe] = useState(false);
  
  useEffect(() => {
    props.getRequestsInMyLocation(props.userLocationId, props.userId);
  }, []);

  const getRequests = showOnlyRequestsAssignedToMe ? props.requestsInMyLocation.data.filter(req => req.assigned_to_id === props.userId) : props.requestsInMyLocation.data;

  return (
    <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      {showOnlyRequestsAssignedToMe && 
        <Link to="#" onClick={() => setShowOnlyRequestsAssignedToMe(false)}>
          Show All Requests in my Location
        </Link>
      }
      {!showOnlyRequestsAssignedToMe && 
        <Link to="#" onClick={() => setShowOnlyRequestsAssignedToMe(true)}>
          Show Only Requests assigned to Me
        </Link>
      }
      <br />
      {props.requestsInMyLocation.isLoading && <div>Loading!!</div>}
      {!props.requestsInMyLocation.isLoading && (
        <React.Fragment>
          <RequestList
            requests={getRequests}
            showForVolunteer
            currentUserId={props.userId}
            currentUser={props.currentUser}
            acceptRequest={props.acceptRequest}
            completeRequest={props.completeRequest}
            heading={getRequests.length> 0 ? "Requests In your Location" : "There are no such requests in you location!!"}
          />
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  requestsInMyLocation: state.requests.requestsInMyLocation,
  userId: state.user.userId,
  userLocationId: state.user.areaId,
  currentUser: state.user
});
const mapDispatchToProps = (dispatch) => ({
  getRequestsInMyLocation: (userlocationId, currentUserId) =>
    dispatch(getRequestsInLocationAction(userlocationId, currentUserId)),
  acceptRequest: (requestId, userId) =>
    dispatch(acceptRequestAction(requestId, userId)),
  completeRequest: (requestId, userId) =>
    dispatch(completeRequestAction(requestId, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsInMyLocation);
