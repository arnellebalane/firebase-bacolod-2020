document.querySelector('.logout-button').addEventListener('click', async () => {
  Utils.disableLogoutButton();
  await logout();

  location.pathname = '/';
});

async function logout() {
  /**
   * TODO: Implement this logout function using Firebase authentication.
   */
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
  console.log({ text, image });
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
}

const tweets = [
  {
    id: '12345',
    text:
      "Run outside as soon as door open tweeting a baseball. Meoooow russian blue ignore the squirrels, you'll never " +
      'catch them anyway or annoy the old grumpy cat, start a fight and then retreat to wash when i lose rub face on owner.',
    image: null,
    created_at: new Date().toISOString(),
    likes: 50,
    author: {
      id: 'abc123',
      name: 'Arnelle Balane',
      username: 'arnellebalane',
      image: 'images/avatar.jpg'
    }
  },
  {
    id: '67890',
    text: 'Sit and stare playing with balls of wool get scared by sudden appearance of cucumber for where is my slave?',
    image: 'images/image.jpg',
    created_at: new Date().toISOString(),
    likes: 20,
    author: {
      id: 'abc123',
      name: 'Arnelle Balane',
      username: 'arnellebalane',
      image: 'images/avatar.jpg'
    }
  }
];

tweets.forEach(Utils.renderTweet);

function fetchTweets() {
  /**
   * TODO: Implement this function that fetches tweets data from Firebase
   * Cloud Firestore.
   *
   * The tweets data should be rendered into the page using Utils.renderTweet.
   */
}

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
}

async function unlikeTweet(tweetId) {
  /**
   * TODO: Implement this function that unlikes a tweet.
   *
   * "tweetId" is a string representing the ID of the tweet to be unliked.
   */
}
