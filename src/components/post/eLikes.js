const db = firebase.firestore();
const userId = () => firebase.auth().currentUser;

export const UpdateLikes = (id) => {
  const likesUser = userId();
  const idstory = id;
  console.log(`este es mi usuario  ${likesUser.uid}`);
  console.log(`El id que estoy pasando es: ${idstory}`);
  return db.collection('stories').doc(id).update({
    likes: firebase.firestore.FieldValue.arrayUnion(likesUser.uid),
  })
    .then(() => {
      console.log('Story successfully updated! Increased');
      return db.collection('stories').doc(idstory)
        .get().then((doc) => {
          console.log(doc.data());
          return doc.data();
        });
    });
};

export const UpdateUnlikes = (id) => {
  const likesUser = userId();
  const idstory = id;
  console.log(`este es mi usuario  ${likesUser.uid}`);
  console.log(`El id que estoy pasando es: ${idstory}`);
  return db.collection('stories').doc(id).update({
    likes: firebase.firestore.FieldValue.arrayRemove(likesUser.uid),
  })
    .then(() => {
      console.log('imprimo');
      console.log(idstory);
      console.log('Story successfully updated! Increased');
      return db.collection('stories').doc(idstory)
        .get().then((doc) => {
          console.log('get story await a ver ');
          console.log(doc.data());
          return doc.data();
        });
    });
};

export function updatebuttons(divbtn) {
  const storyId = divbtn.getAttribute('id');
  const button = divbtn.querySelector('.like');
  const btnDislike = divbtn.querySelector('.dislike');
  const score = divbtn.querySelector('.score');
  // Remover los Listeners de Like
  const newBtnLike = button.cloneNode(true);
  button.parentNode.replaceChild(newBtnLike, button);
  // Remover listeners de Dislike
  const newBtnDislike = btnDislike.cloneNode(true);
  btnDislike.parentNode.replaceChild(newBtnDislike, btnDislike);
  // Agregar listener a boton nuevo
  newBtnLike.addEventListener('click', () => {
    const like = UpdateLikes(storyId);
    like.then((res) => {
      console.log('resultado de likes dentro del then');
      console.log(res);
      score.innerHTML = res.likes.length;
      const divActual = document.getElementById(storyId);
      updatebuttons(divActual);
    });
  });
  newBtnDislike.addEventListener('click', () => {
    const unLike = UpdateUnlikes(storyId);
    unLike.then((res) => {
      console.log('resultado de likes dentro del then');
      console.log(res);
      score.innerHTML = res.likes.length;
      const divActual = document.getElementById(storyId);
      updatebuttons(divActual);
    });
  });
}
