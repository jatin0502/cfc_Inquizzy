import React, {useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Content from "./container/Content";
import Footer from "./container/Footer/Footer";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {connect} from 'react-redux';
import {getLocationsAction} from './redux/actions/locations';
import LoggedInUser from './container/Auth/LoggedInUser';
import Alerts from './container/Alerts/Alerts';

function App(props) {
  useEffect(() => {
    props.getLocations();
    const preSendhandler = (event) => {
      event.data.context.skills['main skill'].user_defined.username = (props.isLoggedIn ? props.username : null);
      event.data.context.skills['main skill'].user_defined.userId = (props.isLoggedIn ? props.userId : null);
      event.data.context.skills['main skill'].user_defined.areaId = (props.isLoggedIn ? props.areaId : null);
      event.data.context.skills['main skill'].user_defined.isRequester = (props.isLoggedIn ? props.isRequester : null);
    }
    new window.loadWatsonAssistantChat({
      integrationID: "c0e3485c-6f7d-4f12-a425-876bafa3efb4", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
    }).then(function(instance){
      instance.on({ type: "pre:send", handler: preSendhandler });
      instance.render();
    });
  }, [props.isLoggedIn]);

  return (
    <BrowserRouter>
      <Route />
      <div className="App site">
        <div className="site-content">
          <Alerts />
          <header>
            <Link className="padding-5 pull-left" to="/Home">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Home</Tooltip>}
              >
                <i
                  className="fa fa-home"
                  style={{ marginLeft: "1rem", fontSize: "xx-large" }}
                ></i>
              </OverlayTrigger>
            </Link>
            <Link className="padding-5 pull-left" to="/AboutUs">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>About Us</Tooltip>}
              >
                <i
                  className="fa fa-info-circle"
                  style={{ marginLeft: "1rem", fontSize: "xx-large" }}
                ></i>
              </OverlayTrigger>
            </Link>
            <Link className="padding-5 pull-left" to="/LocationMap">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Location</Tooltip>}
              >
                <i
                  className="fa fa-map-marker"
                  style={{ marginLeft: "1rem", fontSize: "xx-large" }}
                ></i>
              </OverlayTrigger>
            </Link>
            <div style = {{float: "right"}}>
             { props.isLoggedIn ? <LoggedInUser /> : ''}
            </div>
          </header>
          <br />
          <Content />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  username: state.user.username,
  userId: state.user.userId,
  areaId: state.user.areaId
})
const mapDispatchToProps = (dispatch) => ({
  getLocations: () => dispatch(getLocationsAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
