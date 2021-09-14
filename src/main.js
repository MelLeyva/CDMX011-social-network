/* eslint-disable import/no-cycle */
import { home } from './components/home.js';
// eslint-disable-next-line import/no-cycle
import { logIn } from './components/logIn.js';
import { signUp } from './components/signUp.js';
import { wall } from './components/wall.js';
import { CreatePost } from './components/post/CreatePost.js';
import { editPost } from './components/post/editPost.js';

export const routes = {
  '/': home,
  '/logIn': logIn,
  '/signUp': signUp,
  '/wall': wall,
  '/add': CreatePost,
  '/edit': editPost,
};
export const onNavigate = (pathname) => {
  const rootDiv = document.getElementById('root');
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[window.location.pathname]());
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    onNavigate('/wall');
    console.log('Toy Logeado');
  } else {
    onNavigate('/');
    console.log('No Logueado');
  }
});

window.onpopstate = () => {
  const rootDiv = document.getElementById('root');
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && ((window.location.pathname !== '/') || (window.location.pathname !== '/signUp') || (window.location.pathname !== '/logIn'))) {
      onNavigate('/');
    }
  });
  rootDiv.appendChild(routes[window.location.pathname]());
};

export const render = () => {
  const rootDiv = document.createElement('div');
  window.onpopstate();
  // console.log(window.onpopstate());
  return rootDiv;
};
