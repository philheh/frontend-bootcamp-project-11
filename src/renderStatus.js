import renderSuccess from './renderSuccess.js';

const renderStatus = (elements, value, i18Instance) => {
  const { button, input } = elements;

  if (value === 'sending') {
    button.disabled = true;
    input.disabled = true;
  }

  if (value === 'success') {
    button.disabled = false;
    input.disabled = false;
    renderSuccess(elements, i18Instance);
  }

  if (value === 'filling') {
    button.disabled = false;
    input.disabled = false;
  }
};

export default renderStatus;
