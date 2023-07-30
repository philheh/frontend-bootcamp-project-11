const renderErrors = (elements, error, preError, i18Instance) => {
  const { inputErrorP, input } = elements;
  input.classList.add('is-invalid');

  inputErrorP.classList.remove('text-info', 'text-success');
  inputErrorP.classList.add('text-danger');

  inputErrorP.textContent = i18Instance.t(`errors.${error}`);
};

export default renderErrors;
