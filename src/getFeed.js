import axios from 'axios';
import { uniqueId } from 'lodash';
import parse from './parse.js';
import formatFeed from './formatFeed.js';
import proxiedUrl from './proxy.js';

import refreshFeeds from './refreshFeeds.js';
const getFeed = (url, watchedState, state) => axios
  .get(proxiedUrl(url))
  .then((res) => {
    parse(res)
      .then((parsed) => {
        const { feed, posts } = formatFeed(parsed, url);
        feed.id = uniqueId();
        const settledPosts = posts.map(({ postTitle, postDescription, postLink }) => {
          return {
            postTitle,
            postDescription,
            postLink,
            feedId: feed.id,
            postId: uniqueId(),
          };
        });
        watchedState.feeds.unshift(feed);
        watchedState.posts.unshift(...settledPosts);
        watchedState.error = null;
        watchedState.status = 'success';
        
      })
      .catch((oshibka) => {
        watchedState.error = oshibka.message;
        watchedState.status = 'filling';
      })
      .finally(() => {
        if (state.updatingStatus) return;
         refreshFeeds(state)});
  })
  .catch((error) => {
    console.log(error);
    watchedState.error = error.name;
    watchedState.status = 'filling';
  });

export default getFeed;
