const parse = (res) => {
  return new Promise((resolve, reject) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(res.data.contents, 'application/xml');
    const errorNode = doc.querySelector('parsererror');

    if (errorNode) {
      reject(new Error('RSSError'));
    } else {
      resolve(doc);
    }
  });
};

export default parse;


