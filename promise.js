function fetDataPromise(url) {
  return new Promise((res, rej) => {
    console.log('promise', url);
    res(url);
  });
}

function fetchData(url, cb) {
  setTimeout(() => {
    console.log('cb', url);
    cb(url);
  });
}

fetchData('1', () => {
  fetchData('2', () => {
    fetchData('3', () => {});
  });
});

fetDataPromise(1)
  .then(() => {
    return fetDataPromise(2);
  })
  .then(() => {
    return fetDataPromise(3);
  });
