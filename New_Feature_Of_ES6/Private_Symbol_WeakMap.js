'use strict';

const _sym = Symbol('_sym');
const _sym2 = Symbol('_sym');
const _wk = new WeakMap();
// const symObj = Object(sym);

class Shape {
    constructor(radius, sym, wk) {
        this.radius = radius;
        this[_sym] = sym;
        _wk.set(this, wk);
    };

    draw() {
        console.log("draw");
    }
}

const c = new Shape(1, "sym", "wk");
console.log('radius in c: ', 'radius' in c);
console.log('_sy in c: ', _sym in c);
console.log('_wk in c: ', _wk in c);
for (let k in c) console.log(k, c[k]);

let kSym = Object.getOwnPropertySymbols(c)[0];
console.log( kSym );
console.log(c[kSym]);
console.log(c[_wk]);
// console.log(c[Symbol(_sym)]);

// Symbol : programmatically private 
// WeakMap : technically compeletely private

