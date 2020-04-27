import React from "react";
import RequestElement from "./RequestElement";
import { Table, Alert } from "react-bootstrap";

const RequestList = (props) => (
  <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
    <br />
    <div>
      <Alert variant="primary">
        <Alert.Heading style={{ alignContent: "center" }}>
          {props.heading}
        </Alert.Heading>
      </Alert>
      <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
        <div className="row">
          <div className="col-md-1"></div>
          <div
            className="col-md-10"
            style={{
              position: "relative",
              padding: "1rem",
            }}
          >
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  {props.showForVolunteer && <th>Requester</th>}
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Urgency</th>
                  <th>Requested On</th>
                  <th>Request Accepted On</th>
                  {!props.showForVolunteer && <th>Volunteer</th>}
                  <th>Request Completed On</th>
                  {props.showForVolunteer && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {props.requests.map((req) => (
                  <RequestElement
                    {...req}
                    acceptRequest={props.acceptRequest}
                    completeRequest={props.completeRequest}
                    showForVolunteer={props.showForVolunteer}
                    currentUserId={props.currentUserId}
                    currentUser={props.currentUser}
                    key={req._id}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  </div>
);

export default RequestList;
