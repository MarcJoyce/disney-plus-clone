 import firebase from 'firebase';
 
 const firebaseConfig = {
    apiKey: "AIzaSyAhppqFExjJF4bTcnznrjJXqmgUY1AIK-s",
    authDomain: "disneyplusclone-c8834.firebaseapp.com",
    projectId: "disneyplusclone-c8834",
    storageBucket: "disneyplusclone-c8834.appspot.com",
    messagingSenderId: "489701166145",
    appId: "1:489701166145:web:bd4701f41dc062c0c54ac0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export { auth, provider, storage };
  export default db;