/* eslint-disable import/no-cycle */
import { logInWhitGoogle, githubSignin, loginWithEmail } from '../lib/logInFb.js';
import { validateEmail } from '../lib/validations.js';
import { onNavigate } from '../main.js';

export const logIn = () => {
  document.body.style.backgroundImage = 'url(../images/signUp.png)';
  const theBody = document.querySelector('body');
  theBody.classList.add('login-body');
  const divLogIn = document.createElement('div');
  const LogInNodes = `
  <nav>
    <a href="#">
      <i id='home' class="fas fa-home" aria-hidden="true"></i>
    </a>
  </nav>
  <h1 class="title_login">Iniciar sesión</h1>
  <form class="sub_contenedor">
    <label>Correo electrónico</label>
    <input id="user" type="email">
    <label>Contraseña</label>
    <input id="pass" type="password">
    <button class="btn_login">Iniciar sesión</button>
    <p id="register">
      ¿Aún no tienes cuenta? 
      <a href="#">
        <i class="signUp">Regístrate</i>
      </a></p>
    <h4 class="tag_or">-o-</h4>
    <button class="btn_google">
      <div>
        <span>Ingresa con </span>
        <img src="../images/logo_google.png">
      </div>
    </button><button class="btn_git">
      <div><span>Ingresa con </span>
        <img src="../images/github.png">
      </div>
    </button>
  </form>
  `;

  divLogIn.innerHTML = LogInNodes;
  // icono home, funcion retorno a home
  divLogIn.querySelector('#home').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/');
  });

  divLogIn.querySelector('.btn_login').addEventListener('click', (e) => {
    e.preventDefault();
    const email = divLogIn.querySelector('#user').value;
    const password = divLogIn.querySelector('#pass').value;
    if (email !== '' && password !== '') {
      validateEmail(email);
      loginWithEmail(onNavigate, email, password);
    } else {
      divLogIn.querySelector('#register').style.display = 'block';
    }
  });

  divLogIn.querySelector('.signUp').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/signUp');
  });

  divLogIn.querySelector('.btn_google').addEventListener('click', (e) => {
    e.preventDefault();
    logInWhitGoogle(onNavigate);
  });

  divLogIn.querySelector('.btn_git').addEventListener('click', (e) => {
    e.preventDefault();
    githubSignin(onNavigate);
  });


  return divLogIn;
};
