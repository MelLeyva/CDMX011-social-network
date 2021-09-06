/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAmFtZt8XA0kLFHhAglaTLjaFIpJ8NQ1PY',
  authDomain: 'boo-73257.firebaseapp.com',
  projectId: 'boo-73257',
  storageBucket: 'boo-73257.appspot.com',
  messagingSenderId: '862147976867',
  appId: '1:862147976867:web:f234d866499afb00d8e916',
};

firebase.initializeApp(firebaseConfig);

// acceder con una ventana emergente, utilizando signInWithPopup
export const logInWhitGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log(` Name: ${user.displayName}`);
      console.log(` email: ${user.email}`);
      console.log(` email verificado: ${user.emailVerified}`);
      console.log(user.photoURL);
      onNavigate('/wall');
    // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      console.log(` esto es error: ${errorCode}`);
    });
};

const provider = new firebase.auth.GithubAuthProvider();
export function githubSignin() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log(` Name: ${user.displayName}`);
      console.log(` email: ${user.email}`);
      console.log(` email verificado: ${user.emailVerified}`);
      onNavigate('/wall');
    }).catch((e) => {
      console.log(e);
      alert(e.message);
    });
}

export const loginWithEmail = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('estoy logueada');
      onNavigate('/wall');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`esto pasa cuando pongo mal el password ${errorMessage}`);
    });
};

firebase
.auth()
.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
