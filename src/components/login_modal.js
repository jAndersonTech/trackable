import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions';

class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', success: ''};
    }

    clear() {
        this.setState({success: '', email: '', password: ''})
    }

    login() {
        const creds = {
            email: this.state.email,
            password: this.state.password
        };

        this.setState({error: ''});
        setTimeout(() => {this.props.logIn(creds)}, 500);
        
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.auth !== this.props.auth) {
            if(nextProps.auth.message) {
                this.setState({error: nextProps.auth.message});
            } else if (nextProps.auth.uid) {
                const welcome = 'Close this box to see your dashboard.';
                this.setState({email: '', password: '', success: welcome});
            }
        }
    }    

    renderError() {
        if(this.state.error !== '')  {
            return <div className="alert alert-danger"><strong>Sorry!</strong> {this.state.error}</div>;
        }
    }

    renderSuccess() {
        if(this.state.success !== '') {
            return <div className="alert alert-success"><strong>Welcome Back!</strong> {this.state.success}</div>
        }
    }

    render() {
        return (
            <div className="modal fade bd-login-sm" 
            onClick={() => {this.setState({success: ''})}}
            tabIndex="-1" role="dialog" 
            aria-labelledby="mySmallModalLabel" 
            aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Log In</h5>
                            <button 
                                onClick={() => {this.setState({success: ''})}}
                                type="button" 
                                className="close" 
                                data-dismiss="modal" 
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> {/* modal-header */}


                        <div className="modal-body">
                            {this.renderError()}
                            {this.renderSuccess()}
                            <div className="input-group mb-4">
                                <span className="input-group-addon"><i className="fa fa-envelope fa-fw"></i></span>
                                <input 
                                    value={this.state.email}
                                    onChange={(event) => {this.setState({email: event.target.value})}}
                                    type="text" 
                                    ref="email" 
                                    className="form-control" 
                                    placeholder="Email" 
                                    aria-describedby="email-login-input" />
                            </div> {/* input-group */}
                            <div className="input-group mt-4">
                                <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                                <input 
                                    value={this.state.password}
                                    onChange={(event) => {this.setState({password: event.target.value})}}
                                    type="password" 
                                    ref="password" 
                                    className="form-control" 
                                    placeholder="Password" 
                                    aria-describedby="password-login-input" />
                            </div> {/* input-group */}
                        </div> {/* modal-body */}


                        <div className="modal-footer">
                                <button 
                                    ref="clear"
                                    type="button" 
                                    className="btn btn-danger m-2" 
                                    onClick={this.clear.bind(this)}>
                                    Clear
                                </button>
                                <button 
                                    ref="login"
                                    type="button" 
                                    className="btn btn-primary m-2"
                                    onClick={this.login.bind(this)}>
                                    Log In
                                </button>
                        </div> {/* modal-footer */}


                    </div> {/* modal-content */}
                </div> {/* modal-dialog */}
            </div> /* modal */
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps, {logIn})(LoginModal);

export { LoginModal as PureLoginModal };