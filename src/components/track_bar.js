import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { uploadTrack } from '../actions';
import { connect } from 'react-redux';

class UploadModal extends Component {

    constructor(props) {
        super(props);

        this.state = { error: '', file: [], title: '', desc: '' };
    }

    upload() {
        this.setState({ error: '' });
        if(this.state.file.length === 0) {
            this.setState({ error: 'Please provide a track to upload'});
        } else if(this.state.title === '' || this.state.desc === '') {
            this.setState({ error: 'Please provide track details'});
        } else {
            const track = {
                file: this.state.file[0],
                title: this.state.title,
                desc: this.state.desc
            }
            this.clear();
            this.props.uploadTrack(track);
        }
    }

    clear() {
        this.setState({error: '', file: [], title: '', desc: ''})
    }

    onDrop(file) {
        this.setState({file: [], error: ''});
        if(file[0].type !== 'audio/flac' && file[0].type !== 'audio/mp3') {
            this.setState({error: 'Only .mp3 or .flac files can be uploaded'});
        } else if(file[0].size > 4e9) {
            this.setState({error: 'File size is too big. 4gb or less'})
        } else {
            this.setState({file, error: ''});
        }
    }

    renderDropContent() {

        if(this.state.file.length > 0) {
            return(
                <div className="py-5">
                    <i className="fa fa-file fa-fw"></i>
                    <p>{this.state.file[0].name}</p>
                </div>
            );
        } else {
            return(
                <div className="py-5">Try dropping some files here, or click to select files to upload.</div>
            );
        }
    }

    renderError() {
        if(this.state.error !== '')  {
            return <div className="alert alert-danger"><strong>Warning!</strong> {this.state.error}</div>
        }
    }

    render() {
        return (
            <div 
                className="modal fade bd-upload" 
                tabIndex="-1" role="dialog" 
                aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Upload</h5>
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
                            <Dropzone className="dropzone text-center p-2 mb-4" multiple={false} onDrop={this.onDrop.bind(this)}>
                                {this.renderDropContent()}
                            </Dropzone>
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
                                    onClick={this.upload.bind(this)}>
                                    Upload
                                </button>
                        </div> {/* modal-footer */}


                    </div> {/* modal-content */}
                </div> {/* modal-dialog */}
            </div> /* modal */
        );
    }
}

export default connect(null,{uploadTrack})(UploadModal);