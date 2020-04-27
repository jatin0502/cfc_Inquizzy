import React, { Component } from "react";
import { connect } from "react-redux";

import { registerUserAction } from "../../redux/actions/user";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import HereMap from "../../components/LocationMap/HereMap"
import "./Registration.css";
import {
  Form,
  Col,
  FormGroup,
  Button,
  Alert,
} from "react-bootstrap";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      roleOptions: [
        { value: undefined, label: "- Select -" },
        { value: "Requester", label: "Requester" },
        { value: "Volunteer", label: "Volunteer" },
      ],
      secOptions: [
        { value: undefined, label: "- Select a security question -" },
        {
          value: "What is the name of your first pet",
          label: "What is the name of your first pet",
        },
        {
          value: "What is your secondary school name",
          label: "What is your secondary school name",
        },
        {
          value: "Which is your favorite flower",
          label: "Which is your favorite flower",
        },
      ],
    };
  }

  getAreaOptions = () => [
    { value: undefined, label: "- Select -" },
    ...this.props.locations.locations.map((loc) => ({
      value: loc,
      label: loc.name,
    })),
  ];

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.isLoggedIn) {
      nextProps.history.push("/");
    }
    if (nextProps.user.id !== prevState.user.id) {
      return {
        user: nextProps.user,
      };
    }

    return null;
  }
  onChange = (event) => {
    const field = event.target.name;
    const user = { ...this.state.user };
    user[field] = event.target.value;

    this.setState({ ...this.state, user });
  };

  onAreaChange = (selectedOption) => {
    const user = { ...this.state.user };
    user.area = selectedOption.value;
    this.setState({ ...this.state, user });
  };

  onSecQuestionChange = (selectedOption) => {
    const user = { ...this.state.user };
    user.security_question = selectedOption.value;
    this.setState({ ...this.state, user });
  };

  onRoleChange = (selectedOptions) => {
    const user = { ...this.state.user };
    user.roles = selectedOptions.map((opt) => opt.value);
    this.setState({ ...this.state, user });
  };

  isLoadingSomething = () =>
    this.props.locations.isLoading || this.userLatLngNotYetSet();

  componentDidMount() {
    if (this.props.user.isLoggedIn) {
      this.props.history.push("/");
    } else {
      this.getCurrentUserLocation();
    }
  }

  userLatLngNotYetSet = () =>
    this.state.user.homeCoordinatesLat === undefined &&
    this.state.user.homeCoordinatesLong === undefined;

  getCurrentUserLocation = () => {
    if (navigator.geolocation && this.userLatLngNotYetSet()) {
      navigator.geolocation.getCurrentPosition(this.setUserLocation);
    }
  };

  setUserLocation = (position) =>
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        homeCoordinatesLat: position.coords.latitude,
        homeCoordinatesLong: position.coords.longitude,
      },
    });

  onCurrentLocationChange = (loc) =>
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        homeCoordinatesLat: loc.lat,
        homeCoordinatesLong: loc.lng,
      },
    });

  render() {
    return this.isLoadingSomething() ? (
      "Loading..."
    ) : (
      <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
        <br />
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Alert variant="primary">
                    <Alert.Heading style={{ alignContent: "center" }}>
                      Registration
                    </Alert.Heading>
                  </Alert>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="pull-left">First Name</Form.Label>
                  <Form.Control
                    required
                    name="fname"
                    placeholder="Enter First Name"
                    value={this.state.user.fname || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className="pull-left">Last Name</Form.Label>
                  <Form.Control
                    required
                    name="lname"
                    placeholder="Enter Last Name"
                    value={this.state.user.lname || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="pull-left">Age</Form.Label>
                  <Form.Control
                    name="age"
                    placeholder="Enter Age"
                    value={this.state.user.age || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </Form.Group>
                <FormGroup as={Col}>
                  <Form.Label className="pull-left">Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    value={this.state.user.phone || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </FormGroup>
                <FormGroup as={Col}>
                  <Form.Label className="pull-left">Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={this.state.user.email || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} style={{ textAlign: "left" }}>
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={(event) => this.onChange(event)}
                        checked={this.state.user.gender === "Male"}
                      />{" "}
                      Male{" "}
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={(event) => this.onChange(event)}
                        checked={this.state.user.gender === "Female"}
                      />{" "}
                      Female{" "}
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="Third"
                        onChange={(event) => this.onChange(event)}
                        checked={this.state.user.gender === "Third"}
                      />{" "}
                      Third Gender{" "}
                    </div>
                  </div>
                </FormGroup>

                <FormGroup as={Col} style={{ textAlign: "left" }}>
                  <Form.Label>Do you have any car</Form.Label>
                  <div>
                    <div>
                      <input
                        type="radio"
                        name="car"
                        value="Yes"
                        onChange={(event) => this.onChange(event)}
                        checked={this.state.user.car === "Yes"}
                      />{" "}
                      Yes{" "}
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="car"
                        value="No"
                        onChange={(event) => this.onChange(event)}
                        checked={this.state.user.car === "No"}
                      />{" "}
                      No{" "}
                    </div>
                  </div>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <Form.Label className="pull-left">Address</Form.Label>
                  <Form.Control
                    name="address"
                    value={this.state.user.address || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label className="pull-left">City</Form.Label>
                  <Form.Control
                    name="city"
                    value={this.state.user.city || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </Form.Group>
                <FormGroup as={Col}>
                  <Form.Label className="pull-left">Pin Code</Form.Label>
                  <Form.Control
                    name="pin"
                    value={this.state.user.pin || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </FormGroup>
                <FormGroup as={Col}>
                  <div style={{ textAlign: "left" }}>
                    <Form.Label>Area</Form.Label>
                  </div>
                  <Select
                    options={this.getAreaOptions()}
                    onChange={this.onAreaChange}
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <Form.Label>Exact Location</Form.Label>
                  <HereMap
                    lat={this.state.user.homeCoordinatesLat}
                    lng={this.state.user.homeCoordinatesLong}
                    zoom={15}
                    apikey="xuFmS42DOyN5V8g73oGL-HlgMbJgKkAcPtOHZPe94Fs"
                    theme="normal.day"
                    onCurrentLocationChange={this.onCurrentLocationChange}
                    pinCurrentLocationOnLoad
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <Form.Label className="pull-left">User Name</Form.Label>
                  <Form.Control
                    name="username"
                    value={this.state.user.username || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <Form.Label className="pull-left">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={this.state.user.password || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <Form.Label className="pull-left">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmpassword"
                    value={this.state.user.confirmpassword || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <div style={{ textAlign: "left" }}>
                    <Form.Label>Security Question</Form.Label>
                  </div>
                  <Select
                    name="securtiryQuestion"
                    options={this.state.secOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={this.onSecQuestionChange}
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <Form.Label className="pull-left">Security Answer</Form.Label>
                  <Form.Control
                    name="secAnswer"
                    value={this.state.user.secAnswer || ""}
                    onChange={(event) => this.onChange(event)}
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <div style={{ textAlign: "left" }}>
                    <Form.Label>Your Role</Form.Label>
                  </div>
                  <Select
                    isMulti
                    name="colors"
                    options={this.state.roleOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={this.onRoleChange}
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <Button
                    name="btnSubmit"
                    type="button"
                    onClick={() => this.props.registerUser(this.state.user)}
                    variant="danger"
                    size="lg"
                    style={{
                      marginLeft: "1rem",
                      marginRight: "1rem",
                      marginTop: "2rem",
                      marginBottom: "2rem",
                    }}
                  >
                    Submit
                    <i
                      className="fa fa-save"
                      style={{ marginLeft: "1rem" }}
                    ></i>
                  </Button>
                </FormGroup>
              </Form.Row>
            </Form>
          </div>
          <div className="col-sm-2" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  locations: state.locations,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (user) => dispatch(registerUserAction(user)),
});

Registration.defaultProps = {
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
