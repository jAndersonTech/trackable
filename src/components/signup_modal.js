import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions';

class SignupModal extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', email: '', password: '', error: '', success: ''};
    }

    clear() {
        this.setState({error: '', success: '', username: '', email: '', password: ''});
    }

    signup() {
        const creds = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        this.setState({error: ''});
        setTimeout(() => {this.props.signUp(creds)}, 500);
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.auth !== this.props.auth) {
            if(nextProps.auth.message) {
                this.setState({error: nextProps.auth.message, success: ''});
            } else if (nextProps.auth.uid) {
                const welcome = 'Close this box to see your dashboard.';
                this.setState({username: '', email: '', password: '', success: welcome, error: ''});
            }
        }
    }    

    renderSuccess() {
        if(this.state.error !== '')  {
            return <div className="alert alert-danger"><strong>Sorry!</strong> {this.state.error}</div>;
        } else if(this.state.success !== '') {
            return <div className="alert alert-success"><strong>Welcome!</strong> {this.state.success}</div>
        }
    }

    render() {
        return (
            <div className="modal fade bd-signup-sm" 
            onClick={() => {this.setState({success: ''})}}
            tabIndex="-1" role="dialog" 
            aria-labelledby="mySmallModalLabel" 
            aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sign Up</h5>
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
                            {this.renderSuccess()}
                            <div className="input-group mb-4">
                                <span className="input-group-addon"><i className="fa fa-envelope fa-fw"></i></span>
                                <input 
                                    value={this.state.username}
                                    onChange={(event) => {this.setState({username: event.target.value})}}
                                    type="text" 
                                    ref="username" 
                                    className="form-control" 
                                    placeholder="Username" 
                                    aria-describedby="username-signup-input" />
                            </div> {/* input-group */}
                            <div className="input-group mb-4">
                                <span className="input-group-addon"><i className="fa fa-envelope fa-fw"></i></span>
                                <input 
                                    value={this.state.email}
                                    onChange={(event) => {this.setState({email: event.target.value})}}
                                    type="text" 
                                    ref="email" 
                                    className="form-control" 
                                    placeholder="Email" 
                                    aria-describedby="email-signup-input" />
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
                                    aria-describedby="password-signup-input" />
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
                                    ref="signup"
                                    type="button" 
                                    className="btn btn-primary m-2"
                                    onClick={this.signup.bind(this)}>
                                    Sign Up
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

export default connect(mapStateToProps, {signUp})(SignupModal);

export { SignupModal as PureSignupModal };