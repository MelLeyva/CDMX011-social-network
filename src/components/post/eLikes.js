import { dbGlobal, userId } from '../../lib/firestore.js';

const updateLikes = (id) => {
  const likesUser = userId();
  const idstory = id;
  console.log(`este es mi usuario  ${likesUser.uid}`);
  console.log(`El id que estoy pasando es: ${idstory}`);
  return dbGlobal.collection('stories').doc(id).update({
    likes: firebase.firestore.FieldValue.arrayUnion(likesUser.uid),
  })
    .then(() => dbGlobal.collection('stories').doc(id)
      .get().then((doc) => {
        console.log(doc.data());
        return doc.data();
      }));
};

const updateUnLikes = (id) => {
  const likesUser = userId();
  console.log(`este es mi usuario  ${likesUser.uid}`);
  console.log(`El id que estoy pasando es: ${id}`);
  return dbGlobal.collection('stories').doc(id).update({
    likes: firebase.firestore.FieldValue.arrayRemove(likesUser.uid),
  })
    .then(() => {
      console.log(id);
      return dbGlobal.collection('stories').doc(id)
        .get().then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
          } else {
          // doc.data() will be undefined in this case
            console.log('No such document!');
          } return doc.data();
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    });
};

export const updateButtons = (btn) => {
  const storyId = btn.getAttribute('id');
  const button = btn.querySelector('.like');
  const btnDislike = btn.querySelector('.dislike');
  const score = btn.querySelector('.score');
  const showLike = btn.querySelector('.a-like');
  const hideLike = btn.querySelector('.a-disLike');
  // Remover los Listeners de Like
  const newBtnLike = button.cloneNode(true);
  button.parentNode.replaceChild(newBtnLike, button);
  // Remover listeners de Dislike
  const newBtnDislike = btnDislike.cloneNode(true);
  btnDislike.parentNode.replaceChild(newBtnDislike, btnDislike);
  // Agregar listener a boton nuevo
  newBtnLike.addEventListener('click', () => {
    const like = updateLikes(storyId);
    like.then((resUnlike) => {
      score.innerHTML = resUnlike.likes.length;
      const divActual = document.getElementById(storyId);
      showLike.hidden = true;
      hideLike.hidden = false;
      updateButtons(divActual);
    });
  });
  newBtnDislike.addEventListener('click', () => {
    const unLike = updateUnLikes(storyId);
    unLike.then((res) => {
      console.log('resultado de likes dentro del then');
      console.log(res);
      score.innerHTML = res.likes.length;
      const divActual = document.getElementById(storyId);
      showLike.hidden = false;
      hideLike.hidden = true;
      updateButtons(divActual);
    });
  });
};
