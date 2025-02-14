/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/named
import { logInWhitGoogle, githubSignin, loginWithEmail } from '../lib/logInFb.js';
import { validateEmail } from '../lib/validations.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const logIn = () => {
  document.body.style.backgroundImage = 'url(../images/signUp.png)';
  const theBody = document.querySelector('body');
  const divLogIn = document.createElement('section');
  const tagNav = document.createElement('nav');
  const tagUl = document.createElement('ul');
  const tagLi = document.createElement('li');
  const tagHrefReturnHome = document.createElement('a');
  const tagI = document.createElement('i');
  const tagTitle = document.createElement('h1');
  const formulario = document.createElement('form');
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const labelPassword = document.createElement('label');
  const inputPassword = document.createElement('input');
  const buttonLogIn = document.createElement('button');
  const tagOr = document.createElement('h4');
  const buttonGoogle = document.createElement('button');
  const divLoginGoogle = document.createElement('div');
  const spanDivLoginGoogle = document.createElement('span');
  const imagenButton = document.createElement('img');
  const btnGitLogIn = document.createElement('button');
  const divLogInGit = document.createElement('div');
  const spanBtnLogInGit = document.createElement('span');
  const imgGitLogIn = document.createElement('img');
  const divRegister = document.createElement('p');
  const redirectSignUp = document.createElement('a');
  const signUp = document.createElement('i');

  theBody.classList.add('login-body');
  divLogIn.classList.add('div_login');
  tagI.classList.add('fas', 'fa-home');
  tagTitle.classList.add('title_login');
  formulario.classList.add('sub_contenedor');
  buttonLogIn.classList.add('btn_login');
  tagOr.classList.add('tag_or');
  buttonGoogle.classList.add('btn_google');
  btnGitLogIn.classList.add('btn_git');
  inputEmail.setAttribute('id', 'user');
  inputPassword.setAttribute('id', 'pass');
  divRegister.setAttribute('id', 'register');
  redirectSignUp.setAttribute('href', '#');

  tagHrefReturnHome.setAttribute('href', '#');
  inputEmail.setAttribute('type', 'email');
  inputPassword.setAttribute('type', 'password');
  imagenButton.setAttribute('src', '../images/logo_google.png');
  imgGitLogIn.setAttribute('src', '../images/github.png');

  tagTitle.textContent = 'Iniciar sesión';
  tagOr.textContent = '-o-';
  labelEmail.textContent = 'Correo electrónico';
  labelPassword.textContent = 'Contraseña';
  buttonLogIn.textContent = 'Iniciar sesión';
  spanDivLoginGoogle.textContent = 'Ingresa con ';
  spanBtnLogInGit.textContent = 'Ingresa con ';
  divRegister.textContent = '¿Aún no tienes cuenta? ';
  signUp.textContent = 'Regístrate';
  // icono home, funcion retorno a home
  tagHrefReturnHome.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/');
  });

  buttonGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    logInWhitGoogle(onNavigate);
  });

  btnGitLogIn.addEventListener('click', (e) => {
    e.preventDefault();
    githubSignin(onNavigate);
  });

  buttonLogIn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    if (email !== '' && password !== '') {
      validateEmail(email);
      loginWithEmail(onNavigate, email, password);
    } else {
      document.getElementById('register').style.display = 'block';
    }
  });
  signUp.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/signUp');
  });

  tagNav.appendChild(tagUl);
  tagUl.appendChild(tagLi);
  tagLi.appendChild(tagHrefReturnHome);
  tagHrefReturnHome.appendChild(tagI);
  divRegister.appendChild(redirectSignUp);
  redirectSignUp.appendChild(signUp);

  divLogIn.appendChild(tagNav);
  divLogIn.appendChild(tagTitle);
  divLogIn.appendChild(formulario);

  formulario.appendChild(labelEmail);
  formulario.appendChild(inputEmail);
  formulario.appendChild(labelPassword);
  formulario.appendChild(inputPassword);
  formulario.appendChild(buttonLogIn);
  formulario.appendChild(divRegister);
  formulario.appendChild(tagOr);
  formulario.appendChild(buttonGoogle);
  formulario.appendChild(btnGitLogIn);

  buttonGoogle.appendChild(divLoginGoogle);
  divLoginGoogle.appendChild(spanDivLoginGoogle);
  divLoginGoogle.appendChild(imagenButton);
  btnGitLogIn.appendChild(divLogInGit);
  divLogInGit.appendChild(spanBtnLogInGit);
  divLogInGit.appendChild(imgGitLogIn);

  return divLogIn;
};
