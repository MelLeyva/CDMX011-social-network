// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const home = () => {
  document.body.style.backgroundImage = 'url(../images/home.png)';
  const theBody = document.querySelector('body');
  theBody.classList.add('home_body');
  const divHome = document.createElement('div');
  const homeNodes = `
    <div class='section_home'>
    <h1 class='namePage'>Boo!</h1>
    <p class='slogan'>Aquí se respira el miedo...cuentame tu historia.</p>
    <div class='container_btn'>
      <button class='btn_sign_up'>Regístrate</button>
      <button class='btn_log_in'>Inicia sesión</button>
    </div>
  </div>
  `;
  divHome.innerHTML = homeNodes;

  divHome.querySelector('.btn_sign_up').addEventListener('click', () => onNavigate('/signUp'));
  divHome.querySelector('.btn_log_in').addEventListener('click', () => onNavigate('/logIn'));

  return divHome;
};
