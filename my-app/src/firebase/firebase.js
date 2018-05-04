import * as firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyAV_YAjt_yxNca9WDuTWF_IP3vuQvzVulI",
    authDomain: "search-app-f2c58.firebaseapp.com",
    databaseURL: "https://search-app-f2c58.firebaseio.com",
    projectId: "search-app-f2c58",
    storageBucket: "search-app-f2c58.appspot.com",
    messagingSenderId: "445811064368"
  };

  if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }

  const auth = firebase.auth();

  export {
      auth,
  };