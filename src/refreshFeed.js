import axios from 'axios';
import { proxiedUrl } from './getFeed.js';
import parse from './parse.js';
import formatFeed from './formatFeed.js';
import { difference } from 'lodash';

const refreshFeed = (feed, state, watchedState) => {
  const { url, id } = feed;
  console.log(url, id)
  setTimeout(() => {
    axios
      .get(proxiedUrl(url))
      .then((res) => parse(res))
      .then((parsed) => {
        const { posts } = formatFeed(parsed, url);
        const currentPosts = state.posts.filter(({ feedId }) => feedId === id)
        const refreshPosts = posts
        const diffPosts = difference(currentPosts, refreshPosts)
        watchedState.posts = diffPosts
        console.log('ssssxxxx', refreshPosts)

      })
      .finally(refreshFeed(feed, state, watchedState));

    
  }, 5000);
};

export default refreshFeed;
