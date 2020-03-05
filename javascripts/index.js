document.querySelector('.login-buttons').addEventListener('click', async event => {
  const button = event.target.closest('button');
  if (!button) return;

  Utils.disableLoginButtons();

  const provider = button.dataset.provider;
  await login(provider);

  Utils.enableLoginButtons();
  location.pathname = 'feed';
});

async function login(provider) {
  /**
   * TODO: Implement this login functiont using Firebase Authentication
   *
   * "provider" parameter will either be "google" or "twitter" depending on
   * which login button was clicked. We need to login using the given provider.
   */
}
