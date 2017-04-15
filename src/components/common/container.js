import React, { Component } from 'react';
import { connect } from 'react-redux';

import UploadModal from '../upload_modal';


class Container extends Component {

    renderButton(type) {
        if(this.props.auth.uid){
            switch(type) {
                case 'plus': 
                    return (
                        <div>
                            <button type="button" className="close" aria-label="upload" data-toggle="modal" data-target=".bd-upload">
                                <span aria-hidden="true">&#43;</span>
                            </button>
                            <UploadModal />
                        </div>
                    );
                default: 
                    return;
            }
        } else {

        }
    }

    render() {

        const { buttonType } = this.props;
        return (
            <div className="containment m-2 p-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        {this.props.title}
                        {this.renderButton(buttonType)}
                    </div>
                    <div className="card-block">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Container);