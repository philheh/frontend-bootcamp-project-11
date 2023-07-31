const renderModal = (elements, posts, modalID) => {
  const post = posts.find(({ postId }) => modalID === postId);
  const { modal } = elements;
  modal.title.textContent = post.postTitle;
  modal.body.textContent = post.postDescription;
  modal.footer.firstElementChild.href = post.postLink;
};

export default renderModal;
