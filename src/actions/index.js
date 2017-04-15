import * as types from './types';
import firebase from 'firebase';

/*************************************
    Music Tracks Action Creators
***************************************/
export function fetchTracks() {
    const { uid } = firebase.auth().currentUser;
    const ref = firebase.database().ref(`users/${uid}/tracks`);

    return ref.once('value').then((snapshot) => {
        return {
            type: types.FETCH_TRACKS,
            payload: snapshot.val()
        };
    });
}

export function fetchSelectedTrack(id) {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/users/${uid}/tracks/${id}`);

    return ref.once('value').then((snapshot) => {
        return {
            type: types.FETCH_SELECTED_TRACK,
            payload: snapshot.val()
        }
    }).catch((error) => {
        alert(error.message);
        return { 
            type: types.DEFAULT_ACTION
        }
    });
}

export function uploadTrack({file, title, desc}) {

    const { currentUser } = firebase.auth();
    const uploadTask = firebase.storage().ref(`/audio/${currentUser.uid}/${file.name}`);
    const databaseRef = firebase.database().ref(`/users/${currentUser.uid}/tracks`); 

    return uploadTask.put(file).then((snapshot) => {
        const fileMeta = snapshot.metadata;

        return databaseRef.push({
            publicId: fileMeta.generation,
            publicName: title,
            description: desc,
            name: fileMeta.name,
            type: fileMeta.contentType,
            artist: currentUser.displayName, //TODO: replace with user
            size: (Math.floor(fileMeta.size / 1e5))/10,
            dateCreated: fileMeta.timeCreated,
            url: snapshot.downloadURL
        }).then(() => {
            return databaseRef.once('value').then((snapshot) => {
                return {
                    type: types.UPLOAD_TRACK,
                    payload: snapshot.val()
                };
            });
        });
    });
}

export function deleteTrack({fileId, file}) {
    const { uid } = firebase.auth().currentUser;
    const databaseRef = firebase.database().ref(`/users/${uid}/tracks/${fileId}`);
    const storageRef = firebase.storage().ref(`/audio/${uid}/${file.name}`);

    storageRef.delete(); 

    return databaseRef.remove().then(() => {
        return fetchTracks();
    });
}

export function deleteAllTracks() {
    const { uid } = firebase.auth().currentUser;
    const databaseRef = firebase.database().ref(`/users/${uid}`);

    return databaseRef.child('tracks').remove().then(() => {
        return fetchUser({});
    }).catch((error) => {
        console.log(error.message);
    });
}

export function editTrack({fileId, title, desc}) {  
    const { uid } = firebase.auth().currentUser;
    const databaseRef = firebase.database().ref(`/users/${uid}/tracks/${fileId}`);

    return databaseRef.update({
        publicName: title,
        description: desc
    }).then(() => {
        return fetchTracks();
    })
}

/*************************************
    User Authenication Action Creators
***************************************/
export function logIn({email, password}) {
    const auth = firebase.auth().signInWithEmailAndPassword(email, password);

    return auth.then((user) => {
            return fetchUser(user);
    }).catch((error) => {
            return fetchUser(error);
    });        
}

export function signUp({username, email, password}) {
    const auth = firebase.auth().createUserWithEmailAndPassword(email, password);

    return auth.then((user) => {
        user.updateProfile({
            displayName: username
        });
        return fetchUser(user);
    }).catch((error) => {
        return fetchUser(error);
    });
}

export function deleteAccount() {
    const auth = firebase.auth().currentUser;
    const password = prompt('Please also provide your password:');
    const credential = firebase.auth.EmailAuthProvider.credential(
        auth.email, 
        password
    );

    deleteAllTracks();  

    return auth.reauthenticate(credential).then(() => {
        return auth.delete().then(() => {
            return fetchUser({});
        }).catch((error) => {
            return fetchUser(error);
        });
    }).catch((error) => {
        alert(error.message);
        return {
            type: 'DEFAULT_ACTION'
        };
    });  
}

export function fetchUser(auth){
    return {
        type: types.FETCH_USER,
        payload: auth.uid || auth.code ? auth : ''
    }
};