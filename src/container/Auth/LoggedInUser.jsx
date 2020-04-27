import React from 'react';
import {logoutUserAction} from '../../redux/actions/user';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

const LoggedInUser = (props) => {
    const history = useHistory();
    return(
        <div>
            <div style={{"float": "left", "padding-top": "10px", "padding-right": "10px"}}>
                <h6><i>Hi {props.loggedInUsername}!</i></h6>&nbsp;
            </div>
            <div style={{"float": "left"}}>
                <button className ="btn btn-danger" onClick = {() => {props.logout(); history.push('/')} }>Log Out</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    loggedInUsername: state.user.username
});
const mapDispatchToProps = (dispatch) => ({
    logout : () => dispatch(logoutUserAction())
});

export default connect(mapStateToProps,mapDispatchToProps) (LoggedInUser);

