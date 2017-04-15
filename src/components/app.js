import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { fetchUser, fetchTracks, deleteTrack, deleteAccount } from '../actions';

import firebaseInit from '../resources/firebase_init';
import Container from './common/container';
import Table from './common/table';
import LoginModal from './login_modal';
import SignupModal from './signup_modal';
import EditModal from './edit_modal';
import Logo from '../resources/trackableLogo.png';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = { signedIn: false, showTrack: false, selectedTrack: {} };
  }

  componentWillMount() {
    firebaseInit(this.props.fetchUser);
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.auth !== this.props.auth) {
      if(nextProps.auth.uid) {
        this.setState({signedIn: true});
        this.props.fetchTracks();
      } else {
        this.setState({signedIn: false});
      }
    }
  } 

  delete(fileId, file, event) {
    this.props.deleteTrack({fileId, file});
  }

  show(value, event) {
    this.setState({showTrack: false, selectedTrack: {}});
    setTimeout(() => {
      this.setState({showTrack: true, selectedTrack: value});
    }, 200);
    
  }

  deleteAccount() {
    const displayName = firebase.auth().currentUser.displayName;
    const username = prompt("Type in your username (" + displayName +") to confirm deletion of this account:");

    if(displayName === username) {
      this.props.deleteAccount();
    } else {
      alert("Invalid username. Account was not deleted.");
    }
  }

  renderHeader() {
    if(this.props.auth.email) {
      return(
        <div>
          <div>Welcome! {firebase.auth().currentUser.displayName}</div>
          <div className="btn-group btn-group-sm m-2" role="group" aria-label="First group">
            <button className="btn btn-primary" onClick={() => { firebase.auth().signOut() }}>Log Out</button>
            <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dashboard
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
              <div className="dropdown-item" role="button" href="#">Settings</div>
              <div 
                onClick={this.deleteAccount.bind(this)}
                className="dropdown-item bg-danger text-white" 
                role="button" 
                href="#">
                Delete Account
              </div>
            </div> {/* dropdown-menu */}
          </div> {/* btn-group */}
        </div>
      );
    } else {
      return(
        <div className="btn-group btn-group-sm m-2" role="group" aria-label="First group">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-login-sm">Log In</button>
          <button type="button" className="btn btn-secondary" data-toggle="modal" data-target=".bd-signup-sm">Sign Up</button>
        </div> /* btn-group */
      );
    }
  } 

  renderUploadTable() {

    const { tracks } = this.props;

    if(this.state.signedIn && _.size(tracks) > 0) {
      return _.map(tracks, (value, key) => {
        const newDate = new Date(value.dateCreated);
        const dateCreated = newDate.toString().split(" " + newDate.getFullYear());

        return(
          <tr key={key}>
            <td>{value.publicName}</td>
            <td>{value.artist}</td>
            <td>{value.size} MB</td>
            <td>{dateCreated[0] + ", " +  newDate.getFullYear()}</td>
            <td>
              <div className="btn-group btn-group-sm" role="group" aria-label="First group">
                <i 
                  onClick={this.show.bind(this, value)}
                  role="button" 
                  className="btn btn-info fa fa-play"></i>
                <i 
                  role="button" 
                  data-toggle="modal"
                  data-target=".bd-edit"
                  className="btn btn-info fa fa-pencil"></i>
                <EditModal track={{key, value}} />
                <i role="button" 
                  onClick={this.delete.bind(this, key, value)}
                  className="btn btn-info fa fa-trash"></i>
              </div> {/* btn-group */}
            </td>
          </tr>
        );
      });
    } else {
      return(
        <tr>
          <td className="text-center" colSpan="5">Tracks you have uploaded with show up here.</td>
        </tr>
      );
    }
  } 


  renderModal() {
    if(this.state.showTrack) {
      
      const { selectedTrack } = this.state;

      return (
        <div className="footer bg-inverse text-white text-center align-items-center p-2 d-flex justify-content-between">
            <h4 className="m-0">{selectedTrack.publicName}</h4>
            <audio controls autoPlay className="w-50">
              <source src={selectedTrack.url} type={selectedTrack.type} />
            </audio>
             <button 
                onClick={() => { this.setState({ showTrack: false, selectedTrack: {} }) }}
                type="button" 
                className="close text-danger" 
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
      );
    } 
  }

  renderSharedTable() {
    return(
      <tr>
        <td className="text-center" colSpan="5">Tracks shared with you will show up here.</td>
      </tr>
    );
  }
  
  render() {

    const titles = ['Name', 'Artist', 'File Size', 'Date Created', 'Actions'];

    return (
      <div className="app">

        <div className="header text-center d-sm-flex flex-wrap align-items-center justify-content-between py-2">
          <div className="d-sm-flex flex-wrap align-items-center">
            <img src={Logo} className="float-left mx-3" alt="Trackable Logo"/>
            <p className="h1">Trackable</p>
          </div>
          {this.renderHeader()}
        </div> {/* header */}

        <div className="app-body d-flex flex-row flex-wrap justify-content-around p-1">
          <LoginModal />
          <SignupModal />
          <Container title="My Tracks" buttonType="plus">
            <Table titles={titles}>
              {this.renderUploadTable()}
            </Table>
          </Container>
          <Container title="Shared Tracks">
            <Table titles={titles}>
              {this.renderSharedTable()}
            </Table>
          </Container>
        </div>  {/* app-body */}
        {this.renderModal()}
      </div> /* app */
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, tracks: state.tracks.all };
}

export default connect(mapStateToProps, {fetchUser, fetchTracks, deleteTrack, deleteAccount})(App);
