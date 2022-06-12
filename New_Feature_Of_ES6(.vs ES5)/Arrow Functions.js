// 1. Experssion Bodies: if a function only has a return function, can simply omit return
// -es6
odds  = evens.map(v => v + 1) 
pairs = evens.map(v => ({ even: v, odd: v + 1 }))
nums  = evens.map((v, i) => v + i)
// -es5
odds  = evens.map(function (v) { return v + 1; });
pairs = evens.map(function (v) { return { even: v, odd: v + 1 }; });
nums  = evens.map(function (v, i) { return v + i; });

// 2. Statement Bodies: More expressive closure syntax.
//-es6
nums.forEach(v => {
    if (v % 5 === 0)
        fives.push(v)
});
// -es5
nums.forEach(function (v) {
if (v % 5 === 0)
    fives.push(v);
});

// 3. Lexical(词汇) this: More intuitive(易懂的) handling of current object context.
// -es6
this.nums.forEach((v) => {
    if (v % 5 === 0)
        this.fives.push(v)
})

// -es5: need to bind this
//  variant 1
var self = this;
this.nums.forEach(function (v) {
    if (v % 5 === 0)
        self.fives.push(v);
});

//  variant 2
this.nums.forEach(function (v) {
    if (v % 5 === 0)
        this.fives.push(v);
}, this);

//  variant 3 (since ECMAScript 5.1 only)
this.nums.forEach(function (v) {
    if (v % 5 === 0)
        this.fives.push(v);
}.bind(this));