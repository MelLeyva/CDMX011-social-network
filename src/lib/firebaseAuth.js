import { validateEmail, validatePassword } from './validations.js';
// Inicio de sesión con email y password

export const loginWithEmail = (onNavigate, email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      onNavigate('/wall');
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert('El usuario o contraseña son incorrectos, favor de verificarlos');
    });
};
// Inicio de sesión con google
export const logInWhitGoogle = (onNavigate) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      onNavigate('/wall');
    }).catch((error) => {
      const errorCode = error.code;
      alert(`${errorCode}`);
    });
};
// Inicio de sesión con gitHub
export const githubSignin = (onNavigate) => {
  const provider = new firebase.auth.GithubAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      onNavigate('/wall');
    }).catch((e) => {
      alert(e.message);
    });
};
// Registor de nuevo usuario
export const fireBaseSignUp = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (validateEmail() === true) {
        validatePassword();
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
// Cerrar sesión
export const logOutUser = (onNavigate) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      onNavigate('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(` esto es error: ${errorCode}`);
    });
};
