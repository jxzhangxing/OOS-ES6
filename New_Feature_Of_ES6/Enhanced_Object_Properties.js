
//2. Computed property names (ES2015)
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

var param = 'size';
var config = {
  [param]: 12,
  ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
};

console.log(config); // {size: 12, mobileSize: 4}