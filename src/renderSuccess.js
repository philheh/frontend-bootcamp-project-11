const renderSuccess = (elements, i18Instance) => {
  elements.input.classList.remove('is-invalid');
  elements.input.value = '';
  elements.inputErrorP.classList.remove('text-danger');
  elements.inputErrorP.classList.add('text-success');
  elements.inputErrorP.textContent = i18Instance.t('success');
  elements.input.focus();
  //test
};

export default renderSuccess;
