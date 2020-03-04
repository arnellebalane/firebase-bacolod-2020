// Run code whenever any of the login buttons are clicked
document.querySelector('.LoginButtons').addEventListener('click', event => {
  const button = event.target.closest('.LoginButton');
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
  const buttons = document.querySelectorAll('.LoginButton');

  buttons.forEach(button => {
    button.disabled = !enabled;
  });
}
