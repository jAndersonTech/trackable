import firebase from 'firebase';

export default (fetchUser) => {
    const config = {
      apiKey: "AIzaSyDE5StQ4LR2XwTSB6EV_Gi8z7ew9ERlvGM",
      authDomain: "audio-share-e8ecd.firebaseapp.com",
      databaseURL: "https://audio-share-e8ecd.firebaseio.com",
      storageBucket: "audio-share-e8ecd.appspot.com",
      messagingSenderId: "779192503961"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        return fetchUser(user);
      } else {
        return fetchUser({});
      }
    });
};