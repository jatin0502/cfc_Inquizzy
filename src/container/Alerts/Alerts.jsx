import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';
import './styles.css';
const Alerts = (props) => {
    const { alerts, removeAlert } = props;
    const [show, setShow] = useState(true);
    const toastStyle = {
        width: '100%',
        'max-width': '20000px'
    };

    if (alerts !== null && alerts.length > 0) {
        var alertsList = alerts.map(alert => {
            return (
                <div id="alerts" >
                    <Toast style={toastStyle} onClose={() => removeAlert()} show={show} delay={5000} autohide={true} role="alert">
                        <Toast.Body className={`alert alert-${alert.alertType}`}>
                            <h6><i>{alert.msg}</i></h6>
                        </Toast.Body>
                    </Toast>
                </div>
            )
        });
        return alertsList;
    }
    else
        return null;
}
const mapStateToProps = (state) => ({
    alerts: state.alerts
});
const mapDispatchToProps = (dispatch) => ({
    removeAlert: () => dispatch({ type: 'REMOVE_ALERT' })
})
export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
