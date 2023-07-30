const renderVisitedLinks = (setID) => {
  const currentVisitedID = [...setID.values()].at(-1);
  const currentLink = document.querySelector(`a[data-id="${currentVisitedID}"]`);
  currentLink.classList.remove('fw-bold');

  currentLink.classList.add('fw-normal');
  currentLink.classList.add('link-secondary');
};

export default renderVisitedLinks;
