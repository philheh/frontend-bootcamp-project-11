import axios from 'axios';
import { differenceWith } from 'lodash';
import proxiedUrl from './proxy.js';
import parse from './parse.js';
import formatFeed from './formatFeed.js';

const update = (watchedState, state) => {
  const comparePostTitles = (post1, post2) => post1.postTitle === post2.postTitle;
  const promises = state.feeds.map(({ url }) => axios.get(proxiedUrl(url))
    .then((response) => parse(response))
    .then((parsedData) => formatFeed(parsedData))
    .then(({ posts }) => {
      const newPosts = differenceWith(posts, state.posts, comparePostTitles);
      watchedState.posts.unshift(...newPosts);
    })
    .catch(() => null));

  Promise.all(promises)
    .then(() => setTimeout(() => update(watchedState, state), 5000));
};
export default update;
