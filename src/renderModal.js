const renderModal = (elements, posts, modalID) => {
  const post = posts.find(({ postId }) => modalID === postId);
  elements.modal.title.textContent = post.postTitle;
  elements.modal.body.textContent = post.postDescription;
  elements.modal.footer.firstElementChild.href = post.postLink;
};

export default renderModal;
