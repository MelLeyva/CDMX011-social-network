let score = 0;
const db = firebase.firestore();

export const UpdateLikes = (id, likes) => {
  console.log(`El id que estoy pasando es: ${id}`);
  db.collection('stories').doc(id).update({
    likes,
  })
    .then(() => {
      console.log('Story successfully updated!');
    });
};

export const dislike = () => {
  score--;
  console.log(score);
};
