/* 1.Iterator & For-Of Operator */
// ! Support "iterable" protocol to allow objects to customize their iteration behaviour.
// ! Additionally, support "iterator" protocol to produce sequence of values (either finite or infinite).
// ! Finally, provide convenient of operator to iterate over all values of an iterable object.
// -es6
// 斐波那契数列
let fibonacci = {
  [Symbol.iterator]() { //Interator without *
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur };
      },
    };
  },
};

for (let n of fibonacci) {
  if (n > 1000) break;
  console.log(n);
}

// -es5
var fibonacci = {
  next: (function () {
    var pre = 0,
      cur = 1;
    return function () {
      tmp = pre;
      pre = cur;
      cur += tmp;
      return cur;
    };
  })(),
};

var n;
for (;;) {
  n = fibonacci.next();
  if (n > 1000) break;
  console.log(n);
}

// ? for(;;){} equal to while(1){} : means infinite loop

/* 2. Generators */
/* 2.0 Support for generator methods, i.e., methods in classes and on objects, based on generator functions. */
// -es6
class Clz {
  * bar () {
      …
  }
}
let Obj = {
  * foo () {
      …
  }
}

// -es5
// ! no equivalent in ES5

/* 2.1 Generator Function, Iterator Protocol */
// ! Support for generators, a special case of Iterators containing a generator function, 
// ! where the control flow can be paused and resumed, in order to produce sequence of values (either finite or infinite).
// -es6
let fibonacci = {
  *[Symbol.iterator]() { //Generator with *
      let pre = 0, cur = 1;
      for (;;) { // infinite equivalt to While(True)
        [ pre, cur ] = [ cur, pre + cur ]
        yield cur
      }
  }
}

for (let n of fibonacci) {
  if (n > 1000)
      break
  console.log(n)
}

// -es5
var fibonacci = {
  next: (function () {
      var pre = 0, cur = 1;
      return function () {
          tmp = pre;
          pre = cur;
          cur += tmp;
          return cur;
      };
  })()
};

var n;
for (;;) {
  n = fibonacci.next();
  if (n > 1000)
      break;
  console.log(n);
}

/* 2.2 Generator Function, Direct Use */
// ! Support for generator functions, a special variant of functions 
// ! where the control flow can be paused and resumed, in order to produce sequence of values (either finite or infinite).
// -es6
// generator function with *
function* range (start, end, step) {
  while (start < end) { // finite
      yield start
      start += step
  }
}

for (let i of range(0, 10, 2)) {
  console.log(i) // 0, 2, 4, 6, 8
}

// -es5
// ! no equivalent in ES5

/* 2.3 Generator Function, Generator Matching */
// ! Support for generator functions, a special variant of functions 
// ! where the control flow can be paused and resumed, in order to produce sequence of values (either finite or infinite).
// es6
let fibonacci = function* (numbers) {
  let pre = 0, cur = 1
  while (numbers-- > 0) {
      [ pre, cur ] = [ cur, pre + cur ]
      yield cur
  }
}

for (let n of fibonacci(1000))
    console.log(n)

let numbers = [ ...fibonacci(1000) ];

let [ n1, n2, n3, ...others ] = fibonacci(1000);

// TODO /* 2.4 Generator Control-Flow */
// ! Support for generators, a special case of Iterators 
// ! where the control flow can be paused and resumed, 
// ! in order to support asynchronous programming in the style of "co-routines" in combination with Promises (see below). 
// ! [Notice: the generic async function usually is provided by a reusable library and given here just for better understanding. See co or Bluebird's coroutine in practice.]
// -es6
//  generic asynchronous control-flow driver
function async (proc, ...params) {
  let iterator = proc(...params)
  return new Promise((resolve, reject) => {
    let loop = (value) => {
      let result
      try {
        result = iterator.next(value)
      }
      catch (err) {
        reject(err)
      }
      if (result.done)
        resolve(result.value)
      else if (typeof result.value      === "object"
            && typeof result.value.then === "function")
        result.value.then((value) => {
          loop(value)
        }, (err) => {
          reject(err)
        })
      else
          loop(result.value)
    }
    loop()
  })
}

//  application-specific asynchronous builder
function makeAsync (text, after) {
  return new Promise((resolve, reject) => {
      setTimeout(() => resolve(text), after)
  })
}

//  application-specific asynchronous procedure
async(function* (greeting) {
  let foo = yield makeAsync("foo", 300)
  let bar = yield makeAsync("bar", 200)
  let baz = yield makeAsync("baz", 100)
  return `${greeting} ${foo} ${bar} ${baz}`
}, "Hello").then((msg) => {
  console.log("RESULT:", msg) // "Hello foo bar baz"
})

// -es5
// ! no equivalent in ES5
