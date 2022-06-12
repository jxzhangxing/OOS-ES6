/* 
    Classical inheritance: Dereived/Sub/Child object IS-A Base/SUper/Parent Class Object 
    Prototypical inheritnace: prototype objectBase is equal to parent object - __protp__ 
*/

//  -- prototype
let x = {};
let y = {};
Object.getPrototypeOf(x) === Object.getPrototypeOf(y); // a prototype is just a regular object, every object has prototype(parent) except root object

// -- multiple inheritance
// Objects created by a given constructor will have the same prototype

// --Property / Attributes
let person = {name: 'Mosh'};
let ObjectBase = Object.getPrototypeOf(person);
let descriptor = Object.getOwnPropertyDescriptor(ObjectBase);
console.log(descriptor); // configurable(Deletable: delete person.name), enumerable(Object.keys(person) can show name), writable(person.name = xing will change from Mosh to xing)
Object.keys(person); // enumerrable
person.name = 'xing'; // writable
delete person.name; // Configurable
Object.defineProperty(person, 'name', {
  writable: false,
  enumerable: false,
  configurable: false 
});

// -Constructor prototype
let arr2 = [];
arr2.__proto__ === Array.prototype;
let obj2 = {};
obj2.__proto__ === Object.prototype;

// - Prototype vs. Instance Members
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('draw');
    }
}
let c1 = new Circle(1); 
/* 
Circle {radius: 1, draw: ƒ}
    draw: ƒ ()
    radius: 1
    [[Prototype]]: Object 
*/
let c2= new Circle(2);
/* 
Circle {radius: 2, draw: ƒ}
    draw: ƒ ()
    radius: 2
    [[Prototype]]: Object 
*/
// -> Instance members all have draw method stored that will waste memory, 
// Solution - using prototype method:
function Circle(radius){
    this.radius = radius;
}
Circle.prototype.draw = function () {
    console.log('draw');
}
// overwrite toSting method in Circle object, Circle.toString is more accessible than Object.toString
Circle.prototype.toString = function () {
    return 'Circle with radius' + this.radius;
}

// protype method can be called in Object constructor function
function Circle(radius){
    this.radius = radius;
    this.move = function(){
        this.draw;
        console.log('move');
    }
}
Circle.prototype.draw = function () {
    console.log('draw');
}
c1 = new Circle(1);
Object.keys(1); // return only instance members: ["radius", "move"]
for (let key in c1) console.log(key); // return instance and prototype members] ["radius", "move", "draw"]
c1.hasOwnProperty('radius'); // true
c1.hasOwnProperty('draw'); // false

// avoid extending build-in object(array.map...), dont modify objects you dont own!

// -Object Inhetitance
// before Circle.prototype.constructor = Circle;
// ★ Object.create(Shape.prototype) will create a new empty object and set it as the prototype of new object to Shape.protope(No instance method of Shape!)
Circle.prototype = Object.create(Shape.prototype); 
// after Circle.prototype.constructor = Shape; should reset back to Circle:
Circle.prototype.constructor = Circle;

// if want to include Shape's instance method
Circle.prototype = new Shape();
