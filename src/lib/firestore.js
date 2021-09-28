export const dbGlobal = firebase.firestore();
// funcion para traer el post para ser editado
export const getPost = (id) => dbGlobal.collection('stories').doc(id).get();
// funcion para actualizar un post
export const updatePost = (id, updateObject) => dbGlobal.collection('stories').doc(id).update(updateObject);
// funcion para eliminar post
export const deletePost = (id) => dbGlobal.collection('stories').doc(id).delete();

export const userId = () => firebase.auth().currentUser;

export const prueba = (setupPosts) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dbGlobal
        .collection('stories')
        .orderBy('fecha', 'desc')
        .get()
        .then((snapshot) => {
          setupPosts(snapshot.docs);
        });
    } else {
      setupPosts([]);
    }
  });
};
