const renderSuccess = (elements, i18Instance) => {
  const { input } = elements;
  elements.input.classList.remove('is-invalid');
  input.input.value = '';
  elements.inputErrorP.classList.remove('text-danger');
  elements.inputErrorP.classList.add('text-success');
  input.inputErrorP.textContent = i18Instance.t('success');
  elements.input.focus();
};

export default renderSuccess;
