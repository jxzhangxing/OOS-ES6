// Modularity benifits
1.Maintainablity
2.Reuse
3.Abstract Code

- Cohesion: things all highly related should go together

const _radius = new WeakMap();
class Circle {
    constructor(radius) {
        _radius.set(this, radius);
    }

    draw() {
        console.log('circle with raius' + _radius.get(this));
    }
}

we can accrss _radius by using :
const c = new Circle(10); 
_radius.get(c);
c.draw();
So we need to move codes to different file and only export Circle

// Module formats:
AMD: Async Module Definition - Browser (ES5) ×
CommonJS:  - Node.js (ES5/ES6) ✓
UMD: Universal Module Definition - Browser/Node.js (ES5) ×
ES6 Modules: JS Natively support Module format - Browser ✓

// 1. CommonJS
/*  circle.js */
const _radius = new WeakMap();  // Implementation Detail

class Circle { // Public Interface
    constructor(radius) {
        _radius.set(this, radius);
    }

    draw() {
        console.log('circle with raius' + _radius.get(this));
    }
}
module.exports = Circle;
// module.exports.Square = Square;

/* index.js */
require('./circle');

const c = new Circle(10);
c.draw();
// run: node index.js in terminal > circle with raius 10


// 2. ES6 modules 
/*  circle.js */
const _radius = new WeakMap();  // Implementation Detail

export class Circle { // Public Interface
    constructor(radius) {
        _radius.set(this, radius);
    }

    draw() {
        console.log('circle with raius' + _radius.get(this));
    }
}
module.exports = Circle;

/* index.js */
import {Circle} from './circle.js';
import {Circle} from './circle'; // do not need .js if using a bundle

const c = new Circle(10);
c.draw();

/* index.html */
<script type="module" src="nidex.js"></script>
