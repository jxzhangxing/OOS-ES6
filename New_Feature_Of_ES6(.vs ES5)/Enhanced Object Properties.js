// 1. Property Shorthand
// Shorter syntax for common object property definition idiom.
// -es6
var x = 0, y = 0
obj = { x, y }

// -es5
var x = 0, y = 0;
obj = { x: x, y: y };

//2. Computed Property Names
// Support for computed names in object property definitions.

// -es6
let obj = {
  foo: "bar",
  [ "baz" + quux() ]: 42
}

var i = 0;
var a = {
  ['foo' + ++i]: i,
  ['foo' + ++i]: i,
  ['foo' + ++i]: i
};
console.log('a:', a);
console.log('a.foo1: ', a.foo1); // 1
console.log('a.foo2: ', a.foo2); // 2
console.log('a.foo3: ', a.foo3); // 3

// ? Increment ++ / Decrement: --
// Postfix decrement
let x = 3;
y = x--;
// y = 3
// x = 2
 
// Prefix decrement
let a = 2;
b = --a;

// a = 1
// b = 1

var param = 'size';
var config = {
  [param]: 12,
  ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
};

console.log(config); // {size: 12, mobileSize: 4}

// -es5
var obj = {
  foo: "bar"
};
obj[ "baz" + quux() ] = 42;


// 3.Method Properties
// Support for method notation in object property definitions, for both regular functions and generator functions.
// -es6
obj = {
  foo (a, b) {
      …
  },
  bar (x, y) {
      …
  },
  *quux (x, y) {
      …
  }
}

// -es5
obj = {
  foo: function (a, b) {
      …
  },
  bar: function (x, y) {
      …
  },
  //  generator function quux: no equivalent in ES5
  …
};