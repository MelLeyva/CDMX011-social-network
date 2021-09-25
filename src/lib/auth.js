export const dbGlobal = firebase.firestore();

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
