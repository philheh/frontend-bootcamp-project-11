import validate from './validator.js';
import i18next from 'i18next';
import resources from '../locales/index.js';
import renderStatus from './renderStatus.js';
import onChange from 'on-change';
import renderErrors from './renderErrors.js';
import getFeed from './getFeed.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderModal from './renderModal.js';
import renderVisitedLinks from './renderVisitedLinks.js';
const app = () => {
  const i18Instance = i18next.createInstance();
  i18Instance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const state = {
    feeds: [],
    posts: [],
    status: 'filling',
    error: null,
    visitedLinksIDs: new Set(),
    modalID: null,
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

  const watchedState = onChange(state, (path, value, preValue) => {
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
        return;
    }
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    validate(elements.input.value, state)
      .then((validURL) => {
        watchedState.status = 'sending';
        getFeed(validURL, watchedState, elements);
      })
      .catch((error) => {
        watchedState.error = error.message;
      });
  });

  elements.postsContainer.addEventListener('click', (e) => {
    e.preventDefault();
    if (Object.hasOwn(e.target.dataset, 'id')) {
      const { id } = e.target.dataset;
      watchedState.modalID = id;
      watchedState.visitedLinksIDs.add(id);
    }
  });
};

export default app;
