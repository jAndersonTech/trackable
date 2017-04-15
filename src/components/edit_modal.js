import React, { Component } from 'react';
import { editTrack } from '../actions';
import { connect } from 'react-redux';

class EditModal extends Component {

    constructor(props) {
        super(props);

        this.state = { error: '', success: '', title:  this.props.track.value.publicName, desc: this.props.track.value.description};
    }
    
    edit() {
        this.setState({ error: '' });
        if(this.state.title === '' || this.state.desc === '') {
            this.setState({ error: 'Please provide track details'});
        } else {
            this.setState({success: 'Your track has been updated'});
            const track = {
                fileId: this.props.track.key,
                title: this.state.title,
                desc: this.state.desc
            }
            this.props.editTrack(track);
        }
    }

    clear() {
        this.setState({error: '', title: '', desc: ''});
    }

    renderError() {
        if(this.state.error !== '')  {
            return <div className="alert alert-danger"><strong>Warning!</strong> {this.state.error}</div>
        } else if (this.state.success !== '') {
            return <div className="alert alert-success"><strong>Alrighty!</strong> {this.state.success}</div>;
        }
    }

    render() {
        return (
            <div 
                className="modal fade bd-edit" 
                tabIndex="-1" role="dialog" 
                aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button className="close" 
                                onClick={() => {this.setState({success: ''})}}
                                type="button" 
                                data-dismiss="modal" 
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> {/* modal-header */}


                        <div className="modal-body">
                            {this.renderError()}
                            <div className="input-group mb-4">
                                <span className="input-group-addon"><i className="fa fa-header fa-fw"></i></span>
                                <input 
                                    value={this.state.title}
                                    onChange={(event) => {this.setState({title: event.target.value})}}
                                    type="text" 
                                    ref="title" 
                                    className="form-control" 
                                    placeholder="Title" 
                                    aria-describedby="title-upload-input" />
                            </div> {/* input-group */}
                            <div className="input-group mt-4">
                                <span className="input-group-addon"><i className="fa fa-sticky-note fa-fw"></i></span>
                                <textarea
                                    value={this.state.desc}
                                    onChange={(event) => {this.setState({desc: event.target.value})}} 
                                    ref="desc" 
                                    className="form-control" 
                                    placeholder="Description" 
                                    aria-describedby="desc-upload-input" />
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
                                    onClick={this.edit.bind(this)}>
                                    Edit
                                </button>
                        </div> {/* modal-footer */}


                    </div> {/* modal-content */}
                </div> {/* modal-dialog */}
            </div> /* modal */
        );
    }
}

export default connect(null,{editTrack})(EditModal);