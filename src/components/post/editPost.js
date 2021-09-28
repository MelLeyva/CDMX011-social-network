/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import { onNavigate } from '../../main.js';
import { getIdPostToEdit } from '../wall.js';
import { userId, getPost, updatePost } from '../../lib/firestore.js';

let idPost = '';
let divEditPost = '';

// metodo para ir a traer la informacion que correspond a ese id que tenemos
const loadData = async () => {
  idPost = getIdPostToEdit();
  const doc = await getPost(idPost);
  console.log(doc);
  const post = doc.data();
  const postForm = document.getElementById('postForm');
  postForm.title.value = post.title;
  postForm.history.value = post.history;
};
// metodo para actualizar los registros
const updateData = async () => {
  const postForm = document.getElementById('postForm');
  const title = postForm.title.value;
  const history = postForm.history.value;
  // agregar la constante del user
  if (title.value === '' || history.value === '') {
    divEditPost.querySelector('.emptyPost').innerHTML = 'Todos los campos son obligatorios';
  } else {
    await updatePost(idPost, { title, history });
    postForm.reset();
    onNavigate('/wall');
  }
};

export const editPost = () => {
  divEditPost = document.createElement('div');
  const crtUser = userId();
  // template formulario
  const htmlTemplateFormEdit = `
  <nav class= "return">
    <a class="btn-return">
      <img src='./images/outline_return_black.png' alt='return'>
    </a>
  </nav>
  <div class="curret-User">
    <img id="img-User" class= "photo" src="./images/avatar.png">
    <p id="idUser">${crtUser.email}</p>
  </div>
  <div class="emptyPost"></div>
  <form id="postForm">
    <label for="title">Título</label>
    <input id="title"><label for="history">Cuenta tu historia</label>
    <textarea id="history" rows="22" cols="35" placeholder="Escribe sin límite"></textarea>
    <button class="btn-editPost">Actualizar</button>
  </form>
`;

  divEditPost.innerHTML = htmlTemplateFormEdit;
  loadData();

  divEditPost.querySelector('.btn-return').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/wall');
  });

  divEditPost.querySelector('.btn-editPost').addEventListener('click', async (e) => {
    e.preventDefault();
    updateData();
  });

  return divEditPost;
};
