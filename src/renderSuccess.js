const renderSuccess = (elements, i18Instance) => {
  const { input, inputErrorP } = elements;
  elements.input.classList.remove('is-invalid');
  input.value = '';
  elements.inputErrorP.classList.remove('text-danger');
  elements.inputErrorP.classList.add('text-success');
  inputErrorP.textContent = i18Instance.t('success');
  elements.input.focus();
};

export default renderSuccess;
