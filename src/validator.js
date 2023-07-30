import * as yup from 'yup';

const validate = (url, state) => {
  const existingUrls = state.feeds.map(({ url }) => url);
  const urlSchema = yup
    .string()
    .url('ValidationError')
    .nonNullable()
    .notOneOf(existingUrls, 'Already')
    .required('This field is required');
  return urlSchema.validate(url);
};

export default validate;
