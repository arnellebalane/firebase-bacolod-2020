document.querySelector('.login-buttons').addEventListener('click', async event => {
  const button = event.target.closest('button');
  if (!button) return;

  Utils.disableLoginButtons();

  const provider = button.dataset.provider;

  try {
    await login(provider);
    Utils.redirectToFeed();
  } catch (error) {
    alert(error.message);
  }

  Utils.enableLoginButtons();
});

async function login(provider) {
  /**
   * TODO: Implement this login functiont using Firebase Authentication
   *
   * "provider" parameter will either be "google" or "twitter" depending on
   * which login button was clicked. We need to login using the given provider.
   */

  let providerObj;

  if (provider === 'google') {
    providerObj = new firebase.auth.GoogleAuthProvider();
  } else if (provider === 'twitter') {
    providerObj = new firebase.auth.TwitterAuthProvider();
  }

  await firebase.auth().signInWithPopup(providerObj);
}
