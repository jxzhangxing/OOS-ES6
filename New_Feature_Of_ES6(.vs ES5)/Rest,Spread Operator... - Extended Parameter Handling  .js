/* 1. Default Parameter Values */
// Simple and intuitive default values for function parameters.

// -es6
function f (x, y = 7, z = 42) {
    return x + y + z
}
f(1) === 50

//-es5
function f (x, y, z) {
    if (y === undefined)
        y = 7;
    if (z === undefined)
        z = 42;
    return x + y + z;
};
f(1) === 50;

/* 2. Rest Parameter */
// Aggregation of remaining arguments into single parameter of variadic functions.

// -es6
function f (x, y, ...a) {
    return (x + y) * a.length
}
f(1, 2, "hello", true, 7) === 9

//-es5
function f (x, y) {
    var a = Array.prototype.slice.call(arguments, 2);
    return (x + y) * a.length;
};
f(1, 2, "hello", true, 7) === 9;

/* 3.Spread Operator */
// Spreading of elements of an iterable collection (like an array or even a string) into both literal elements and individual function parameters.

// -es6
var params = [ "hello", true, 7 ]
var other = [ 1, 2, ...params ] // [ 1, 2, "hello", true, 7 ]

function f (x, y, ...a) {
    return (x + y) * a.length
}
f(1, 2, ...params) === 9

// -es5
var str = "foo"
var chars = [ ...str ] // [ "f", "o", "o" ]

var params = [ "hello", true, 7 ];
var other = [ 1, 2 ].concat(params); // [ 1, 2, "hello", true, 7 ]

function f (x, y) {
    var a = Array.prototype.slice.call(arguments, 2);
    return (x + y) * a.length;
};
f.apply(undefined, [ 1, 2 ].concat(params)) === 9;

var str = "foo";
var chars = str.split(""); // [ "f", "o", "o" ]