'use strict' //★prevent accidencly modify the global object
/* //! 1. class hoisting / static method */
// class Declaration - can be hoisted
class Circle{}
  
// class Expression - can not be hoisted
const Square = class {
};

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    // ★Instance Method
    draw(){
    }

    // ★Static Method : For Util Methods 
    static parse(str) {
        const radius = JSON.parse(str).radius;
        return new Circle(radius);
    }
}

const circle = new Circle(1);
console.log(circle);
const circle2 = Circle.parse('{ "radius": 1 }');
console.log(circle2);


// this of class
const Circle = function () {
    this.draw = function () {
        console.log(this);
    }
};

const c = new Circle(); // new: set this from Global/Window to Circle
// ★Method Call
c.draw(); // Circle {draw: f}...

const draw = c.draw; // Reference of function
console.log(draw); // f(){console.log(this);}
// ★Function Call - standalone function
draw(); // Window{....} ★ if 'use strict' will get undefined



/* //! 2.Private Property: _ / Symbol / WeakMap */
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


/* //! 3. Getter and Setter */
const _radius = new WeakMap();
class Circle {
    constructor(radius) {
        _radius.set(this, radius);
    }

    get radius() {
        return _radius.get(this);
    }

    set radius(value) {
        if(value <= 0) throw new Error('invalid radius');
        _radius.set(this, radius);
    }
}

const c = new Circle(1);
c.radius = -1; // invalid radius

/* //! 4. Inheritence */
class Shape {
    constructor(color) {
        this.color = color;
    }
    move() {
        console.log('move');
    }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color); // super: get access to the parent class
        this.radius = radius;
    }
    draw() {
        console.log('draw');
    }
    move() { // method overridding
        super.move();
        console.log('circle move');
    }
}

const c = new Circle('red', 2);