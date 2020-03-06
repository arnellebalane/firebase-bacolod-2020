function onAuthStateChanged() {
  /**
   * TODO: Subsribe to Firebase user state changes.
   *
   * Display user avatar in the tweet form once a user is logged in.
   */

  Utils.disableTweetForm();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      Utils.setCurrentUser(user);
      Utils.setUserAvatar(user.photoURL);
      Utils.enableTweetForm();
    } else {
      Utils.redirectToHome();
    }
  });
}

onAuthStateChanged();

document.querySelector('.logout-button').addEventListener('click', async () => {
  Utils.disableLogoutButton();
  await logout();
});

async function logout() {
  /**
   * TODO: Implement this logout function using Firebase authentication.
   */
  firebase.auth().signOut();
}

document.querySelector('form').addEventListener('submit', async event => {
  event.preventDefault();

  const form = event.target;
  const text = form.text.value || null;
  const image = form.image.files[0] || null;

  if (!text && !image) return;
  Utils.disableTweetForm();

  await createTweet(text, image);

  Utils.resetTweetForm();
  Utils.enableTweetForm();
});

async function createTweet(text, image) {
  /**
   * TODO: Implement this function that creates a new tweet and stores it in
   * Firebase Cloud Firestore.
   *
   * "text" is the string entered in the tweet box, and "image" is the image
   * file selected to be attached to the tweet.
   *
   * The "image" should be uplaoded to Firebase Cloud Storage first, then store
   * its URL in Firebase Cloud Firestore together with the rest of the tweet.
   *
   * Other tweet info, such as created date, author, etc. should be stored in
   * the tweet data as well.
   */
  const currentUser = firebase.auth().currentUser;
  const tweet = {
    text: text,
    image: null,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
    likes: 0,
    author: {
      id: currentUser.uid,
      name: currentUser.displayName,
      username: currentUser.uid,
      image: currentUser.photoURL
    }
  };

  if (image) {
    const path = `images/${currentUser.uid}/${Date.now()}.jpg`;
    tweet.image = await uploadFile(path, image);
  }

  await firebase
    .firestore()
    .collection('tweets')
    .add(tweet);
}

async function uploadFile(path, file) {
  /**
   * TODO: Implement this function that uploads files (images) to Firebase
   * Cloud Storage.
   *
   * "path" is the location in the storage where the "file" will be placed.
   *
   * This function should return the URL to the uploaded file.
   */

  const ref = firebase.storage().ref(path);
  const uploadTask = ref.put(file);
  uploadTask.on('state_changed', snapshot => {
    console.log(snapshot.bytesTransferred, snapshot.totalBytes);
  });
  await uploadTask;
  return ref.getDownloadURL();
}

function fetchTweets() {
  /**
   * TODO: Implement this function that fetches tweets data from Firebase
   * Cloud Firestore.
   *
   * The tweets data should be rendered into the page using Utils.renderTweet.
   */

  firebase
    .firestore()
    .collection('tweets')
    .orderBy('created_at')
    .onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const doc = change.doc;
          const tweet = doc.data();
          tweet.id = doc.id;
          Utils.renderTweet(tweet);
        } else if (change.type === 'removed') {
          const doc = change.doc;
          Utils.removeTweet(doc.id);
        }
      });
    });
}

fetchTweets();

document.addEventListener('click', async event => {
  const button = event.target.closest('.delete-tweet');
  if (!button) return;

  const tweetId = button.closest('.tweet').dataset.id;

  Utils.removeTweet(tweetId);
  await removeTweet(tweetId);
});

async function removeTweet(tweetId) {
  /**
   * TODO: Implement this function that deletes a tweet.
   *
   * "tweetId" is a string representing the ID of the tweet to be deleted.
   */
  await firebase
    .firestore()
    .collection('tweets')
    .doc(tweetId)
    .delete();
}

document.addEventListener('click', async event => {
  const button = event.target.closest('.like-tweet');
  if (!button) return;

  const tweetId = button.closest('.tweet').dataset.id;
  const isLiked = button.classList.contains('active');

  if (isLiked) {
    Utils.unlikeTweet(tweetId);
    await unlikeTweet(tweetId);
  } else {
    Utils.likeTweet(tweetId);
    await likeTweet(tweetId);
  }
});

async function likeTweet(tweetId) {
  /**
   * TODO: Implement this function that likes a tweet.
   *
   * "tweetId" is a string representing the ID of the tweet to be liked.
   */

  const currentUser = firebase.auth().currentUser;
  await firebase
    .firestore()
    .collection('users')
    .doc(currentUser.uid)
    .collection('likes')
    .doc(tweetId)
    .set({
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function unlikeTweet(tweetId) {
  /**
   * TODO: Implement this function that unlikes a tweet.
   *
   * "tweetId" is a string representing the ID of the tweet to be unliked.
   */
}
