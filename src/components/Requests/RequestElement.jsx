import React, { Component } from "react";
import { Button } from "react-bootstrap";
import UserDetails from "../UserDetails/UserDetails";
import {Link} from 'react-router-dom';

const buttonStyle = {
  marginLeft: "0.25rem",
  marginRight: "0.25rem",
  marginTop: "0.1rem",
  marginBottom: "0.1rem",
};

class RequestElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVolunteerDetailsModal: false,
      showUserDetailsModal: false,
    };
  }

  setShowVolunteerDetailsModal = (val) => this.setState({...this.state, showVolunteerDetailsModal: val});
  setShowUserDetailsModal = (val) => this.setState({...this.state, showUserDetailsModal: val});

  getLocationDetailsForUser = (user) => ({
    name: user.username,
    location: {
      lat: user.homeCoordinatesLat, lng: user.homeCoordinatesLong
    }
  });

  render() {
    return (
      <React.Fragment>
        <tr>
          {this.props.showForVolunteer && (
            <td>
              <Link to="#" onClick={() =>this.setShowUserDetailsModal(!this.state.showUserDetailsModal)}>
                {this.props.requester_details.username}
              </Link>
            </td>
          )}
          <td>{this.props.requested_item}</td>
          <td>{this.props.requested_quantity}</td>
          <td>{this.props.requested_urgency}</td>
          <td>{this.props.requested_date}</td>
          <td>
            {this.props.accepted_date === "Invalid Date"
              ? ""
              : this.props.accepted_date}
          </td>
          {!this.props.showForVolunteer && (
            <td>
              <Link to="#" onClick={() =>this.setShowVolunteerDetailsModal(!this.state.showVolunteerDetailsModal)}>
                {this.props.volunteer_details && this.props.volunteer_details.username}
              </Link>
            </td>
          )}
          <td>
            {this.props.closed_date === "Invalid Date"
              ? ""
              : this.props.closed_date}
          </td>
          {this.props.showForVolunteer && (
            <td>
              {this.props.accepted_date === "Invalid Date" && (
                <Button
                  style={buttonStyle}
                  type="button"
                  onClick={() =>
                    this.props.acceptRequest(
                      this.props._id,
                      this.props.currentUserId
                    )
                  }
                  variant="info"
                  size="sm"
                >
                  Accept
                </Button>
              )}

              {this.props.accepted_date !== "Invalid Date" &&
                this.props.closed_date === "Invalid Date" && 
                this.props.assigned_to_id === this.props.currentUserId && (
                  <Button
                    style={buttonStyle}
                    type="button"
                    onClick={() =>
                      this.props.completeRequest(
                        this.props._id,
                        this.props.currentUserId
                      )
                    }
                    variant="danger"
                    size="sm"
                  >
                    Complete
                  </Button>
                )}

              {this.props.closed_date !== "Invalid Date" && (
                <label>Request Completed!</label>
              )}
            </td>
          )}
        </tr>
        {(this.state.showUserDetailsModal || this.state.showVolunteerDetailsModal) && (
          <tr><td colspan={this.props.showForVolunteer ? "8" : "7"}>
            {this.props.showForVolunteer && (
              <UserDetails
                showModal={this.state.showUserDetailsModal}
                onHideModal={() => this.setShowUserDetailsModal(false)}
                {...this.props.requester_details}
                heading="User Details"
                userLocation={this.getLocationDetailsForUser(this.props.requester_details)}
                volunteerLocations={[this.getLocationDetailsForUser(this.props.currentUser)]}
              />
            )}
            {!this.props.showForVolunteer && this.props.volunteer_details && (
              <UserDetails
                showModal={this.state.showVolunteerDetailsModal}
                onHideModal={() => this.setShowVolunteerDetailsModal(false)}
                {...this.props.volunteer_details}
                heading="Volunteer Details"
                userLocation={this.getLocationDetailsForUser(this.props.currentUser)}
                volunteerLocations={[this.getLocationDetailsForUser(this.props.volunteer_details)]}
              />
            )}
          </td></tr>
        )}
      </React.Fragment>
    );
  }
}

export default RequestElement;
