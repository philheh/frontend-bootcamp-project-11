const renderPosts = (elements, state, i18Instance) => {
  const { postsContainer } = elements;
  const containerName = postsContainer.querySelector('div > div > h2');
  const postsListContainer = postsContainer.querySelector('div > ul');
  containerName.innerHTML = i18Instance.t('titles.posts');

  postsListContainer.innerHTML = '';
  const postsElements = state.posts.map(({ postTitle, postLink, postId }) => {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    );
    const a = document.createElement('a');

    if (state.visitedLinksIDs.has(postId)) {
      a.classList.add('fw-normal', 'link-secondary');
    }

    a.classList.add('fw-bold');
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('data-id', postId);
    a.href = postLink;
    a.textContent = postTitle;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', postId);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18Instance.t('button');

    li.replaceChildren(a, button);
    return li;
  });

  postsListContainer.append(...postsElements);
};

export default renderPosts;
