
function compose(middleware, next) {
    let index = -1
    return dispatch(0);

    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i];
      if (i === middleware.length) fn = next;

      function nextFun() {
        return dispatch(i + 1);
      }

      if (!fn) return Promise.resolve()

      try {
        return Promise.resolve(fn(null, nextFun))
      } catch (err) {
        return Promise.reject(err);
      }
    }
}

async function f1 (ctx, next) {
  console.log('f1');
  await next();
  console.log('f11');
}
async function f2 (ctx, next) {
  console.log('f2');
  await next();
  console.log('f22');
}
async function f3 (ctx, next) {
  console.log('f3');
  await next();
  console.log('f33');
}

compose([f1, f2, f3], () => {
  console.log('next');
}).then(() => {
  console.log('end');
});
