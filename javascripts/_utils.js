window.Utils = (() => {
  function setLoginButtonState(enabled) {
    const buttons = document.querySelectorAll('.login-buttons button');

    buttons.forEach(button => {
      button.disabled = !enabled;
    });
  }

  function disableLoginButtons() {
    setLoginButtonState(false);
  }

  function enableLoginButtons() {
    setLoginButtonState(true);
  }

  function disableLogoutButton() {
    const button = document.querySelector('.logout-button');
    button.disabled = true;
  }

  function setTweetFormState(enabled) {
    const elements = document.querySelectorAll('form textarea, form button, form input');

    elements.forEach(element => {
      element.disabled = !enabled;
    });
  }

  function disableTweetForm() {
    setTweetFormState(false);
  }

  function enableTweetForm() {
    setTweetFormState(true);
  }

  const tweetsContainer = document.querySelector('.tweets-container');

  // Util function to render a tweet item at the top of the feed
  function renderTweet(tweet) {
    const elem = document.createElement('article');
    elem.classList.add('tweet');

    const avatar = document.createElement('img');
    avatar.src = tweet.author.image;
    avatar.alt = tweet.author.username;
    elem.append(avatar);

    const content = document.createElement('div');
    elem.append(content);

    const header = document.createElement('header');
    content.append(header);

    const user = document.createElement('h1');
    user.textContent = tweet.author.name;
    header.append(user);

    const username = document.createElement('span');
    username.textContent = `@${tweet.author.username}`;
    user.append(username);

    const middot = document.createElement('span');
    middot.innerHTML = '&middot';
    header.append(middot);

    const time = document.createElement('time');
    time.dateTime = tweet.created_at;
    time.textContent = '4m';
    header.append(time);

    const body = document.createElement('main');
    content.append(body);

    if (tweet.text) {
      const text = document.createElement('p');
      text.textContent = tweet.text;
      body.append(text);
    }

    if (tweet.image) {
      const image = document.createElement('img');
      image.src = tweet.image;
      image.alt = tweet.text;
      body.append(image);
    }

    const footer = document.createElement('footer');
    body.append(footer);

    const like = document.createElement('button');
    footer.append(like);

    const xmlns = 'http://www.w3.org/2000/svg';

    const likeSvg = document.createElementNS(xmlns, 'svg');
    likeSvg.setAttributeNS(null, 'width', 18);
    likeSvg.setAttributeNS(null, 'height', 18);
    likeSvg.setAttributeNS(null, 'viewBox', '0 0 18 18');
    likeSvg.setAttributeNS(null, 'fill', 'none');
    like.append(likeSvg);

    const likeSvgPath = document.createElementNS(xmlns, 'path');
    likeSvgPath.setAttributeNS(
      null,
      'd',
      'M15.63 3.45753C15.247 3.07428 14.7921 2.77026 14.2915 2.56284C13.791 2.35542 13.2544 2.24866 12.7125 2.24866C12.1707 ' +
        '2.24866 11.6341 2.35542 11.1335 2.56284C10.6329 2.77026 10.1781 3.07428 9.79503 3.45753L9.00003 4.25253L8.20503 ' +
        '3.45753C7.43126 2.68376 6.3818 2.24906 5.28753 2.24906C4.19325 2.24906 3.1438 2.68376 2.37003 3.45753C1.59626 4.2313 ' +
        '1.16156 5.28075 1.16156 6.37503C1.16156 7.4693 1.59626 8.51876 2.37003 9.29253L3.16503 10.0875L9.00003 15.9225L14.835 ' +
        '10.0875L15.63 9.29253C16.0133 8.90946 16.3173 8.45464 16.5247 7.95404C16.7321 7.45345 16.8389 6.91689 16.8389 6.37503C16.8389 ' +
        '5.83316 16.7321 5.2966 16.5247 4.79601C16.3173 4.29542 16.0133 3.84059 15.63 3.45753V3.45753Z'
    );
    likeSvg.append(likeSvgPath);

    const likeCount = document.createTextNode(tweet.likes);
    like.append(likeCount);

    tweetsContainer.prepend(elem);
  }

  return {
    disableLoginButtons,
    enableLoginButtons,
    disableLogoutButton,
    disableTweetForm,
    enableTweetForm,
    renderTweet
  };
})();