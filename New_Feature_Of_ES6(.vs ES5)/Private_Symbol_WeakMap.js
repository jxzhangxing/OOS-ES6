'use strict'; // prevent accidencly modify the global object

// Symbol : programmatically private 
// WeakMap : 1. technically compeletely private 2. an object where key and value can be anything

// Symbol() === Symbol() : false
const _sym = Symbol('_sym');
const _sym2 = Symbol('_sym');
const _draw = Symbol();
const _wk = new WeakMap();
const _move = new WeakMap();
// const symObj = Object(sym);

class Shape {
    constructor(radius, sym, wk) {
        this.radius = radius;
        this[_sym] = sym;
        _wk.set(this, wk); // set - key: must be an object not a symbol;
        /*
        _move.set(this, function() { // define a weakmap private function 
            console.log('move', this); // this: undefined
        });  
        */   
        
        _move.set(this, () => { // define a weakmap private function 
            console.log('move', this); // this: Circle{}
        });     
    };

    draw() {
        console.log("draw");
        console.log(_wk.get(this)); // return the value of _wk property
        _move.get(this)();
    }

    [_draw]() { // define a symbol private function -  [...]: evaluated property

    }

}

const c = new Shape(1, "sym", "wk");
console.log('radius in c: ', 'radius' in c); // true
console.log('_sy in c: ', _sym in c); // true
console.log('_wk in c: ', _wk in c); // false
for (let k in c) {
    console.log(k, c[k]); // only: radius 1
}

let k = Object.getOwnPropertyNames(c)[0];
let kSym = Object.getOwnPropertySymbols(c)[0];
console.log( k ); // radius
console.log( kSym ); // Symbol(_sym)
console.log(c[kSym]); // sym
console.log(c[_wk]); // undefined

// console.log(c[Symbol(_sym)]);



