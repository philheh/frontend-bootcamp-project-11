import { uniqueId } from 'lodash';

const formatFeed = (doc, url) => {
  const feed = {
    title: doc.querySelector('rss > channel > title').textContent,
    description: doc.querySelector('rss > channel > description').textContent,
    id: uniqueId(),
    url,
  };

  const rawPosts = [...doc.querySelectorAll('item')];

  const posts = rawPosts.map((postDoc) => {
    const postTitle = postDoc.querySelector('title').textContent;
    const postDescription = postDoc.querySelector('description').textContent;
    const postLink = postDoc.querySelector('link').textContent;
    const feedId = feed.id;
    const postId = uniqueId();

    return { postTitle, postDescription, postLink, feedId, postId };
  });

  return { feed, posts };
};

export default formatFeed;
