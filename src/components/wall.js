/* eslint-disable import/no-cycle */
import { logOutUser } from '../lib/firebaseAuth.js';
import { updateButtons } from './post/eLikes.js';
import { onNavigate } from '../main.js';
import { prueba, userId, deletePost } from '../lib/firestore.js';

let idPostToEdit = '';
export const getIdPostToEdit = () => idPostToEdit;

export const wall = () => {
  document.body.style.backgroundImage = 'url(../images/post-background.jpg';
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
    <p id=idUser>Bienvenid@ ${crtUser.email}</p>
  </div>
    <button class='modalPost'>
      <img src='./images/outline_post_add_black_24dp.png' alt='addPost'>
      <p> 'Comparte tu historia' </p>
    </button>
  </section>
  `;

  container.innerHTML = header;

  container.querySelector('.log_out').addEventListener('click', (e) => {
    e.preventDefault();
    const logOut = window.confirm('Descansa...si es que puedes');
    if (logOut === true) {
      logOutUser(onNavigate);
    }
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
        post.id = doc.id;
        const htmlOfbtnEdit = `<a class='a-edit' data-id='${post.id}'>
                              <img  src='./images/edit.png' alt='edit'>
                              </a>`;
        const htmlOfbtndelete = `<a class='a-delete'>
        <img class='delete'data-id=${post.id} src='./images/delete.png' alt='delete'>
     </a>`;
        const likeBtn = `<a class='a-like'>
        <img class= 'like' src='./images/like.png' alt='like'>
      </a>`;
        const unLikeBtn = `<a class='a-disLike'>
        <img class= 'dislike' src='./images/disLike.png' alt='like'>
      </a>`;
        const templatePost = `
          <section id="container-post">
            <div class="data-user">
              <p class="name-user">${post.email}</p>
            </div>
            <div class="data-post">
              <h3 class="data-title">${post.title}</h3>
              <div class="data-history">${post.history}</div>
            </div>
            <div class="buttons">
              <div id="${post.id}" class="btn-post">
                ${post.likes.includes(crtUser.uid) ? unLikeBtn : likeBtn}
              <a class='a-like'hidden>
                <img class= 'like' src='./images/like.png' alt='like'>
              </a>
              <a class='a-disLike' hidden>
              <img class= 'dislike' src='./images/disLike.png' alt='like'>
              </a>
              <span id="${doc.id}" class='score'>${post.likes.length}</span>
              <span class="meAsusta">Me asusta</span>
              </div>
                ${post.email === crtUser.email ? htmlOfbtnEdit : ''}
                ${post.email === crtUser.email ? htmlOfbtndelete : ''}
            </div>
          </section>
          `;
        html += templatePost;
        newPost.innerHTML = html;
      });
      const btnsEdit = newPost.querySelectorAll('.a-edit');
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          idPostToEdit = e.currentTarget.dataset.id;
          onNavigate('/edit');
        });
      });

      const btnsDelete = newPost.querySelectorAll('.a-delete');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const result = window.confirm('¿Estás seguro de querer eliminar el post?');
          if (result === true) {
            await deletePost(e.target.dataset.id);
            onNavigate('/wall');
          }
        });
      });

      const btnsLike = newPost.querySelectorAll('.btn-post');
      btnsLike.forEach((btn) => {
        updateButtons(btn);
      });
    } else {
      newPost.innerHTML = '';
    }
    container.appendChild(newPost);
  };

  prueba(setupPosts);

  return container;
};
