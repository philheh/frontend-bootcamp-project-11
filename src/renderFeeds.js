const renderFeeds = (elements, feeds, i18Instance) => {
  const { feedsContainer } = elements;

  const containerName = feedsContainer.querySelector('div > div > h2');
  const feedDescriptionContainer = feedsContainer.querySelector('div > ul');
  containerName.innerHTML = i18Instance.t('titles.feeds');

  feedDescriptionContainer.innerHTML = '';
  const feedsElements = feeds.map((feed) => {
    const { title, description } = feed;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3 = document.createElement('h2');
    h3.classList.add('h6', 'm-0');
    h3.innerHTML = title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.innerHTML = description;

    li.append(h3, p);
    return li;
  });

  feedDescriptionContainer.append(...feedsElements);
};

export default renderFeeds;
