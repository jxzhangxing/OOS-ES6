/* 1.Array Matching */
//Intuitive and flexible destructuring of Arrays into individual variables during assignment.
// -es6
var list = [ 1, 2, 3 ]
var [ a, , b ] = list
[ b, a ] = [ a, b ]

// -es5
var list = [ 1, 2, 3 ];
var a = list[0], b = list[2];
var tmp = a; a = b; b = tmp;


/* 2.1 Object Matching, Shorthand Notation */
// Intuitive and flexible destructuring of Objects into individual variables during assignment.
// -es6
var { op, lhs, rhs } = getASTNode()

// -es5
var tmp = getASTNode();
var op  = tmp.op;
var lhs = tmp.lhs;
var rhs = tmp.rhs

/* 2.2 Object Matching, Deep Matching */
// Intuitive and flexible destructuring of Objects into individual variables during assignment.
// -es6
var { op: a, lhs: { op: b }, rhs: c } = getASTNode()

// -es5
var tmp = getASTNode();
var a = tmp.op;
var b = tmp.lhs.op;
var c = tmp.rhs;


/* 3.Object And Array Matching, Default Values */
// Simple and intuitive default values for destructuring of Objects and Arrays.
// -es6
var obj = { a: 1 }
var list = [ 1 ]
var { a, b = 2 } = obj
var [ x, y = 2 ] = list

// -es5
var obj = { a: 1 };
var list = [ 1 ];
var a = obj.a;
var b = obj.b === undefined ? 2 : obj.b;
var x = list[0];
var y = list[1] === undefined ? 2 : list[1];


/* 4.Parameter Context Matching */
// Intuitive and flexible destructuring of Arrays and Objects into individual parameters during function calls

// -es6
function f ([ name, val ]) {
    console.log(name, val)
}
function g ({ name: n, val: v }) {
    console.log(n, v)
}
function h ({ name, val }) {
    console.log(name, val)
}
f([ "James", 42 ])
g({ name: "Bob", val:  7 })
h({ name: "Ben", val: 42 })

/* 5.Fail-Soft Destructuring */
// Fail-soft destructuring, optionally with defaults.
// -es6
var list = [ 7, 42 ]
var [ a = 1, b = 2, c = 3, d ] = list
a === 7
b === 42
c === 3
d === undefined

// -es5
var list = [ 7, 42 ];
var a = typeof list[0] !== "undefined" ? list[0] : 1;
var b = typeof list[1] !== "undefined" ? list[1] : 2;
var c = typeof list[2] !== "undefined" ? list[2] : 3;
var d = typeof list[3] !== "undefined" ? list[3] : undefined;
a === 7;
b === 42;
c === 3;
d === undefined;