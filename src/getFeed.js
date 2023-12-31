import axios from 'axios';
import parse from './parse.js';
import formatFeed from './formatFeed.js';
import proxiedUrl from './proxy.js';

const getFeed = (url, watchedState) => axios
  .get(proxiedUrl(url))
  .then((res) => {
    parse(res)
      .then((parsed) => {
        const { feed, posts } = formatFeed(parsed, url);
        watchedState.feeds.unshift(feed);
        watchedState.posts.unshift(...posts);
        watchedState.error = null;
        watchedState.status = 'success';
      })
      .catch((error) => {
        watchedState.error = error.message;
        watchedState.status = 'filling';
      });
  })
  .catch((error) => {
    console.log(error);
    watchedState.error = error.name;
    watchedState.status = 'filling';
  });

export default getFeed;
