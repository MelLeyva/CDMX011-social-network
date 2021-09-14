/* eslint-disable import/no-cycle */
import { logOutUser } from '../lib/utils.js';
import { onNavigate } from '../main.js';
import { updatebuttons } from './post/eLikes.js';

const dbGlobal = firebase.firestore();
const userId = () => firebase.auth().currentUser;
export const wall = () => {
  document.body.style.backgroundImage = 'url(../images/post-background.jpg)';
  const wallBody = document.querySelector('body');
  wallBody.classList.add('wall-body');
  const container = document.createElement('div');
  const crtUser = userId();
  const header = `
  <header id='headerWall'>
    <nav class='navigation'>
      <span id='Boo!'>Boo!</span>
      <a href='#' class='log_out'>
        <img src='./images/outline_logout_black_24dp.png' alt='logOut'>
      </a>
    </nav>
  </header>
  <section id='publish'>
  <div id=curretUser>
    <img id=imgUser src="./images/avatar.png" >
    <p id=idUser>${crtUser.email}</p>
  </div>
    <button class= modalPost>
      <img src='./images/outline_post_add_black_24dp.png' alt='addPost'>
      <p> 'Comparte tu historia' </p>
    </button>
  </section>
`;

  container.innerHTML = header;

  container.querySelector('.log_out').addEventListener('click', (e) => {
    e.preventDefault();
    logOutUser();
  });
  container.querySelector('.modalPost').addEventListener('click', () => {
    onNavigate('/add');
  });

  const newPost = document.createElement('div');
  const setupPosts = (data) => {
    if (data.length) {
      let html = '';
      data.forEach((doc) => {
        const post = doc.data();
        // console.log(post);
        const templatePost = `
          <section id="container-post">
            <div class="data-user">
              <p class="name-user">${post.email}</p>
            </div>
            <div class="data-post">
              <h3 class="data-title">${post.title}</h3>
              <div class="data-history">${post.history}</div>
            </div>
            <div id="${doc.id}" class="btn-post">
              <a class='a-like'>
                <img class= 'like' src='./images/like.png' alt='like'>
              </a>
              <a class='a-disLike'>
                <img class= 'dislike' src='./images/dislike.png' alt='like'>
              </a>
              <span id="${`${doc.id}-likes`}" class='score'>${post.likes.length}</span>
              <span>Me asusta</span>
              <a href='#' class='a-edit'>
                <img class='edit' src='./images/edit.png' alt='edit'>
              </a>
              <a href='#' class='a-delete'>
                <img class='delete' src='./images/delete.png' alt='delete'>
             </a>
            </div>
          </section>
          `;
        // console.log();
        html += templatePost;
        newPost.innerHTML = html;
      });
    } else {
      newPost.innerHTML = '';
    }
    container.appendChild(newPost);
    /* función like */
    // Seleccionanos todos los botones
    const div = document.querySelectorAll('.btn-post');
    // eslint-disable-next-line max-len
    // Creamos un listener para cada botón, y ordenamos que cambie la clase cuando se le da clic al botón
    div.forEach((divbtn) => {
      updatebuttons(divbtn);
    });
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(` Name: ${user.displayName}`);
      console.log(` email: ${user.email}`);
      dbGlobal.collection('stories')
        .get()
        .then((snapshot) => {
          setupPosts(snapshot.docs);
        });
    } else {
      console.log('signout');
      setupPosts([]);
    }
  });

  return container;
};
