/* eslint-disable import/no-cycle */
import { home } from './components/home.js';
import { logIn } from './components/logIn.js';
import { signUp } from './components/signUp.js';
import { wall } from './components/wall.js';
import { CreatePost } from './components/post/CreatePost.js';
import { editPost } from './components/post/editPost.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': home,
  '/logIn': logIn,
  '/signUp': signUp,
  '/wall': wall,
  '/add': CreatePost,
  '/edit': editPost,
};
export const onNavigate = (pathname) => {
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

window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && ((window.location.pathname !== '/') || (window.location.pathname !== '/signUp') || (window.location.pathname !== '/logIn'))) {
      onNavigate('/');
    } else {
      onNavigate('/wall');
    }
  });
  rootDiv.appendChild(routes[window.location.pathname]());
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    onNavigate('/wall');
  } else {
    onNavigate('/');
  }
});
