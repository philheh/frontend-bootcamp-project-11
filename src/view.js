import renderStatus from './renderStatus.js';
import renderErrors from './renderErrors.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderModal from './renderModal.js';
import renderVisitedLinks from './renderVisitedLinks.js';

const render = (elements, state, i18Instance) => (path, value, preValue) => {
  switch (path) {
    case 'error':
      if (value === null) return;
      renderErrors(elements, value, preValue, i18Instance);
      break;
    case 'status':
      renderStatus(elements, value, i18Instance);
      break;
    case 'feeds':
      renderFeeds(elements, state.feeds, i18Instance);
      break;
    case 'posts':
      renderPosts(elements, state, i18Instance);
      break;
    case 'modalID':
      renderModal(elements, state.posts, value);
      break;
    case 'visitedLinksIDs':
      renderVisitedLinks(value);
      break;
    default:
      throw new Error(`${path}invalid render was called`);
  }
};

const elements = {
  form: document.querySelector('form'),
  input: document.querySelector('#url-input'),
  inputErrorP: document.querySelector('.text-danger'),
  button: document.querySelector('[type="submit"]'),
  feedsContainer: document.querySelector('.feeds'),
  postsContainer: document.querySelector('.posts'),
  modal: {
    title: document.querySelector('.modal-title'),
    body: document.querySelector('.modal-body'),
    footer: document.querySelector('.modal-footer'),
  },
};

export { render, elements };
