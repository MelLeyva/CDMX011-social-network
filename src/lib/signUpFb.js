// eslint-disable-next-line import/no-cycle
import { validateEmail, validatePassword } from './validations.js';

export const fireBaseSignUp = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.email);
      console.log(user.name);
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
