import React, { useState } from "react";
import { connect } from 'react-redux';
import { Button } from "react-bootstrap";
import Header from "../Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { useHistory } from "react-router-dom";
import Auth from '../Auth/Auth';
import AddRequests from '../Requests/AddRequests';

const Home = props => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const onHideModal = () => setShowModal(false);
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const onHideAddRequestModal = () => (setShowAddRequestModal(false));
  const handleRegistartion = () => {
    history.push("/Registration");
  };
  const buttonStyle = {
    marginLeft: "1rem",
    marginRight: "1rem",
    marginTop: "2rem",
    marginBottom: "2rem"
  };
  return (
    <div>
      <div>
        <Header />
        {!props.isLoggedIn &&
          <React.Fragment>
            <Button type="button" onClick={handleRegistartion} variant="danger" size="lg" style={buttonStyle}>
              Register
            <i className="fa fa-user-plus" style={{ marginLeft: "1rem" }}></i>
            </Button>

            <Button variant="danger" size="lg" onClick={() => setShowModal(true)} disabled={props.isLoggedIn} style={buttonStyle}>
              Log In
            <i className="fa fa-sign-in" style={{ marginLeft: "1rem" }}></i>
            </Button>
            <Auth showModal={showModal} onHideModal={onHideModal} />
          </React.Fragment>
        }

        {props.isLoggedIn &&
          <React.Fragment>
            {props.isRequester &&
              <React.Fragment>
                <Button variant="danger" size="lg" onClick={() => setShowAddRequestModal(true)} disabled={!props.isLoggedIn} style={buttonStyle}>
                  Add requests
                </Button>
                <AddRequests showAddRequestModal={showAddRequestModal} onHideAddRequestModal={onHideAddRequestModal} />
                <Button type="button" onClick={() => props.history.push('/MyRequests')} variant="danger" size="lg" style={buttonStyle}>
                  My Requests
              </Button>
              </React.Fragment>
            }
            {props.isVolunteer &&
              <Button type="button" onClick={() => props.history.push('/RequestsInMylocation')} variant="danger" size="lg" style={buttonStyle}>
                Volunteer to Help
            </Button>
            }
          </React.Fragment>
        }
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  isRequester: state.user.isRequester,
  isVolunteer: state.user.isVolunteer,
})
export default connect(mapStateToProps, null)(Home);
