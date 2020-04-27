import React, { useEffect } from "react";
import RequestList from "../../components/Requests/RequestList";
import { connect } from "react-redux";
import { getMyRequestsAction } from "../../redux/actions/requests";

const MyRequests = (props) => {
  useEffect(() => {
    props.getMyRequests(props.userId);
  }, [props.userId]);

  return (
    <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <br />
      {props.myRequests.isLoading && <div>Loading!!</div>}
      {!props.myRequests.isLoading && (
        <RequestList 
          requests={props.myRequests.data} 
          heading={props.myRequests.data && props.myRequests.data.length> 0 ? "My Requests" : "You have not made any requests yet."} 
          currentUser={props.currentUser}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  myRequests: state.requests.myRequests,
  userId: state.user.userId,
  currentUser: state.user
});
const mapDispatchToProps = (dispatch) => ({
  getMyRequests: (userId) => dispatch(getMyRequestsAction(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRequests);
