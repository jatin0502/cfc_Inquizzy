import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {loginUserAction} from '../../redux/actions/user';

class Auth extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }
   
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value.trim() });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.onHideModal();
            const params = {username, password}
            this.props.login(params);
        }
    }

    
    handleCancelLogin = (e) =>
    {
        e.preventDefault();
        this.props.onHideModal();
    }
    render() {
        const { username, password, submitted } = this.state;
        return (
            <Modal show={this.props.showModal} onHide={this.props.onHideModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-12 col-md-offset-3">
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                <label htmlFor="username">Username</label><label style={{color: "red"}}>*</label>
                                <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                {submitted && !username &&
                                    <div className="text-danger">Username is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label><label style={{color: "red"}}>*</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="text-danger">Password is required</div>
                                }
                            </div>
                            
                            <div className="row">
                                    <p style = {{color: "red"}}><i>* All fields are mandatory</i></p>
                            </div>
                            <div className="form-group">
                                <button variant="primary" className="btn btn-primary">
                                    Login
                                </button>
                                <button style={{'margin-left': '10px'}} variant="secondary" className="btn btn-secondary" onClick={this.handleCancelLogin}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
            </Modal >
        );
    }
}

const mapStateToProps = (state) => ({
    loginFailure : state
});

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(loginUserAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);