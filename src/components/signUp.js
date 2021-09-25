/* eslint-disable import/no-cycle */
import { fireBaseSignUp } from '../lib/signUpFb.js';
import { onNavigate } from '../main.js';
import { validateEmail, validatePassword } from '../lib/validations.js';

export const signUp = () => {
  document.body.style.backgroundImage = 'url(../images/signUp.png)';
  const theBody = document.querySelector('body');
  theBody.classList.add('signUp-body');
  const divSignUp = document.createElement('div');
  const signUpNodes = `
  <nav id="signUpNav">
    <a href="#">
      <i id="home" class="fas fa-home" aria-hidden="true"></i>
    </a>
  </nav>
  <h1 class="title_signup">Regístrate</h1>
  <form id="signUpForm">
    <label for="emailSigUp">Correo electrónico</label>
    <input type="email" id="emailSigUp">
    <label for="idSignUp">Contraseña</label>
    <input type="password" id="idSignUp">
    <label for="idConfirmSignUp">Confirmar contraseña</label>
    <input type="password" id="idConfirmSignUp">
    <button type="submit" id="submitSignUp">Regístrate</button>
    <p class="logIn-redirect">¿Ya eres miembro? <a href="#"><i class='redirectLogIn' >Inicia sesión</i></a></p>
  </form>
  `;

  divSignUp.innerHTML = signUpNodes;

  divSignUp.querySelector('#home').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/');
  });
  divSignUp.querySelector('.redirectLogIn').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/logIn');
  });

  divSignUp.querySelector('#submitSignUp').addEventListener('click', (e) => {
    e.preventDefault();
    const email = divSignUp.querySelector('#emailSigUp').value;
    const password = divSignUp.querySelector('#idSignUp').value;
    const inputConfirmPassword = document.getElementById('idConfirmSignUp').value;
    // eslint-disable-next-line max-len
    if (validateEmail(email) === true && (validatePassword(password, inputConfirmPassword) === true)) {
      fireBaseSignUp(email, password);
    } else {
      onNavigate('/signUp');
    }
  });

  return divSignUp;
};
