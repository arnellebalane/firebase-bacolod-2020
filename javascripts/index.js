// Run code whenever any of the login buttons are clicked
document.querySelector('.login-buttons').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;

  const provider = button.dataset.provider;
  console.log('Login with provider:', provider);

  setLoginButtonState(false);
  setTimeout(() => {
    setLoginButtonState(true);

    location.pathname = 'feed';
  }, 1000);
});

// Util function to enable/disable all the login buttons
function setLoginButtonState(enabled) {
  const buttons = document.querySelectorAll('.login-buttons button');

  buttons.forEach(button => {
    button.disabled = !enabled;
  });
}
