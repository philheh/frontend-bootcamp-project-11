import i18next from 'i18next';
import onChange from 'on-change';
import validate from './validator.js';
import resources from '../locales/index.js';
import { render, elements } from './view.js';
import getFeed from './getFeed.js';
import update from './update.js';

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
    isUpdating: false,
  };

  const watchedState = onChange(state, render(elements, state, i18Instance));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    validate(elements.input.value, state)
      .then((validURL) => {
        watchedState.status = 'sending';
        getFeed(validURL, watchedState);
      })
      .catch((error) => {
        watchedState.error = error.message;
      });
  });

  elements.postsContainer.addEventListener('click', (e) => {
    if (Object.hasOwn(e.target.dataset, 'id')) {
      const { id } = e.target.dataset;
      watchedState.modalID = id;
      watchedState.visitedLinksIDs.add(id);
    }
  });
  update(watchedState, state);
};

export default app;
