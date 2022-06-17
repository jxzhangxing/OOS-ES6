/* 1.Constants */
// ! Support for constants (also known as "immutable variables"), i.e., variables which cannot be re-assigned new content.
// * Notice: this only makes the variable itself immutable, not its assigned content
// * (for instance, in case the content is an object, this means the object itself can still be altered).

// -es6
const PI = 3.141593;
PI > 3.0;

// -es5
//  only in ES5 through the help of object properties
//  and only in global context and not in a block scope
Object.defineProperty(typeof global === "object" ? global : window, "PI", {
  value: 3.141593,
  enumerable: true,
  writable: false,
  configurable: false,
});
PI > 3.0;



/* 2.Block-Scoped Variables */
// ! Block-scoped variables (and constants) without hoisting.
// ? hoisting(提升):
// ?   JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions
// ?   variables or classes to the top of their scope, prior to execution of the code. 
  
catName("Tiger");

// Function / class Declaration - can be hoisted
function catName(name) {
  console.log("My cat's name is " + name);
}
class Circle{}


// Function Expression - can not be hoisted
const catName2 = function catName2(name) {
  console.log("My cat's name is " + name);
};
const Square = class {
};


/*
The result of the code above is: "My cat's name is Tiger"
*/

// -es6
for (let i = 0; i < a.length; i++) {
  let x = a[i]
  …
}
for (let i = 0; i < b.length; i++) {
  let y = b[i]
  …
}

let callbacks = []
for (let i = 0; i <= 2; i++) {
  callbacks[i] = function () { return i * 2 }
}
callbacks[0]() === 0
callbacks[1]() === 2
callbacks[2]() === 4


// -es5
var i, x, y;
for (i = 0; i < a.length; i++) {
  x = a[i];
  …
}
for (i = 0; i < b.length; i++) {
  y = b[i];
  …
}

var callbacks = [];
for (var i = 0; i <= 2; i++) {
  (function (i) {
      callbacks[i] = function() { return i * 2; };
  })(i);
}
callbacks[0]() === 0;
callbacks[1]() === 2;
callbacks[2]() === 4;



/* 3.Block-Scoped Functions */
// Block-scoped function definitions.
// -es6
{
  function foo () { return 1 }
  foo() === 1
  {
      function foo () { return 2 }
      foo() === 2
  }
  foo() === 1
}


// -es5
//  only in ES5 with the help of block-scope emulating
//  function scopes and function expressions
(function () {
  var foo = function () { return 1; }
  foo() === 1;
  (function () {
      var foo = function () { return 2; }
      foo() === 2;
  })();
  foo() === 1;
})();