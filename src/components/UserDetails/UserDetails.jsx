import React, {useState} from "react";
import HereMap from '../LocationMap/HereMap';
import './userDetails.css';

const UserDetails = (props) => {
const [zoom, setzoom] = useState(15);

  const buttonStyle = {
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    marginTop: "0.1rem",
    marginBottom: "0.1rem",
  };
  
  return (
    <div show={props.showModal} onHide={props.onHideModal} className="user-details-modal" >
        <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
        <div>
          <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
            <div className="row">
              <div
                className="col-md-12"
                style={{
                    position: "relative",
                    padding: "1rem",
                  }}
                >
                <div className="row">
                  <span style={{"font-weight": "bold"}}>Username:&nbsp;&nbsp;</span><span>{props.username}</span>
                </div>
                <div className="row">
                  <span style={{"font-weight": "bold"}}>Name:&nbsp;&nbsp;</span><span>{props.fname} {props.lname}</span>
                </div>
                <div className="row">
                  <span style={{"font-weight": "bold"}}>Age/Gender:&nbsp;&nbsp;</span><span>{props.age}/{props.gender}</span>
                </div>
                <div className="row">
                  <span style={{"font-weight": "bold"}}>Phone:&nbsp;&nbsp;</span><span>{props.phone}</span>
                </div>
                <div className="row">
                  <span style={{"font-weight": "bold"}}>Email:&nbsp;&nbsp;</span><span>{props.email}</span>
                </div>
                <div className="row">
                  <span style={{"font-weight": "bold"}}>Address:&nbsp;&nbsp;</span><span>{props.address}</span>
                </div>
                <br/>
              </div>
            </div>
            
            <div>
              <HereMap
                  lat={props.homeCoordinatesLat}
                  lng={props.homeCoordinatesLong}
                  zoom={zoom}
                  apikey="xuFmS42DOyN5V8g73oGL-HlgMbJgKkAcPtOHZPe94Fs"
                  theme="normal.day"
                  user = {props.userLocation}
                  volunteers = {props.volunteerLocations}
                  container_id={props.requestId}
              />
            </div>
            <br/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
