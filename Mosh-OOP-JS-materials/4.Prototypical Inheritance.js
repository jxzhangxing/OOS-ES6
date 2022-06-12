/* 
1.Need a Square with same duplicate function as Circle 
function Circle(radius) {
    this.radius = radius;
}

Circle.prototype.draw = function(){
    console.log('draw');
}

Circle.prototype.duplicate = function(){
    console.log('duplicate');
}
*/

let c;

// 1. ==> define a Shape Ooject and Inheritance
function Shape() {}
Shape.prototype.duplicate = function () {
  console.log("duplicate");
}; // ---use prototype method to define not instance method

function Circle(radius) {
  this.radius = radius;
}

// Need to let Circle inheri from Shape
Circle.prototype = Object.create(Shape.prototype); // before it: Circle.prootype = Object.create(Object.prototype)
Circle.prototype.constructor = Circle; // before it: Circle.prototype.constructor == Shape;

Circle.prototype.draw = function () {
  console.log("draw");
};

// 2. Calling the super construstor
function Shape(color) {
  this.color = color;
  this.move = function(){
    console.log('move');
  }
}
Shape.prototype.duplicate = function () {
  console.log("duplicate");
};
function Circle(radius, color) {
  Shape.call(this, color); // ★ Calling the super construstor
  this.radius = radius;
}
// -Object Inhetitance
// before Circle.prototype.constructor = Circle;
// ★ Object.create(Shape.prototype) will create a new empty object and set it as the prototype of new object to Shape.protope
// Only has prototype method<duplicate()>, No instance method<move()> of Shape!
Circle.prototype = Object.create(Shape.prototype);
// after Circle.prototype.constructor = Shape; should reset back to Circle:
Circle.prototype.constructor = Circle;
Circle.prototype.draw = function () {
  console.log("draw");
};

// if want to include Shape's instance method<move()>
Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

// if want to include Shape's instance method
Circle.prototype = new Shape();

// 3. Intermediate Function Inheritance: extend()
function Square(size) {
  this.size = size;
}
Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;

// => extend()
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

// 4. Method Overriding
extend(Circle, Shape);
Circle.prototype.duplicate = function () {
  console.log("duplicate circle");
}; // duplicate cicle
Circle.prototype.duplicate = function () {
  Shape.prototype.duplicate.call(this); // ★ calling duplicate method of Shape
  console.log("duplicate circle");
}; // duplicate; duplicate cicle

c = new Circle();
c.duplicate();

// 5.Polymorphism ★★★ ~
function Square() {}
extend(Square, Shape);
Square.prototype.duplicate = function () {
  console.log("duplicate square");
}; // duplicate square

const shapes = [new Circle(), new Square()];
// if no Polymorphism:
for (let shape of shapes) {
  if (shapes.type === "circle") duplicateCircle();
  else if (shapes.type === "circle") duplicateSquare();
  else duplicateShape();
}
// Implement Polymorphism
for (let shape of shapes) {
  shape.duplicate();
}

/* *when to use Inheritance?* ---- AVOID Create Inheritance Hierarchies!! Favor Composition over Inheritance!!!

1.Stupid first
2.Problem of Inheritance:
  Animal:eat(), walk() -> Person, Dog, what if Goldfish???
  Bad Practice: Inheritance, too many hierarchies
  Change-->  Animal:eat() -> Mammal:eat(); Fish:swim() -> Person, DOg; Goldfish

  Good Practice: use Mixins
  canWalk(), canEat(), canSwim()
  Person: canWalk() + canEat; Goldfish: canEat() + canSwim()

*/

// 6.Mixins - Composition
/* 
    function mixin(target, ...sources) { // rest operator: ...
      Object.assign(target, ...sources); // spread operator: ... 
    } 
*/
const canEat = {
  eat: function () {
    this.hunger--;
    console.log('eatting');
  }
};

const canWalk = {
  walk: function () {
    console.log('walking');
  }
};

function Person() {
}
Object.assign(Person.prototype, canEat, canWalk);

const canSwim = {
  swim: function () {
    console.log('swimming');
  }
};
function Goldfish() {
}
Object.assign(Goldfish.prototype, canEat, canSwim);

// ★mixin()
function mixin(target, ...sources) { // rest operator: ...
  Object.assign(target, ...sources); // spread operator: ... 
}
mixin(Person.prototype, canEat, canWalk);
mixin(Goldfish.prototype, canEat, canSwim);