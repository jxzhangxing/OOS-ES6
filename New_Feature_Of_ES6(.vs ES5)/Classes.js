// 1. Class Definition
// 2. Class Inheritance
// -es6
class Shape {
  constructor(id, x, y) {
    this.id = id;
    this.move(x, y);
  }
  move(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Rectangle extends Shape {
  constructor(id, x, y, width, height) {
    super(id, x, y);
    this.width = width;
    this.height = height;
  }
}
class Circle extends Shape {
  constructor(id, x, y, radius) {
    super(id, x, y);
    this.radius = radius;
  }
}

// -es5
var Shape = function (id, x, y) {
  this.id = id;
  this.move(x, y);
};
Shape.prototype.move = function (x, y) {
  this.x = x;
  this.y = y;
};
var Rectangle = function (id, x, y, width, height) {
  Shape.call(this, id, x, y);
  this.width = width;
  this.height = height;
};
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
var Circle = function (id, x, y, radius) {
  Shape.call(this, id, x, y);
  this.radius = radius;
};
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

// 3. Getter and Setter
// Getter/Setter also directly within classes (and not just within object initializers, as it is possible since ECMAScript 5.1).

// -es6
//! this._<field_name> referes to the <field_name> variable added through the constructor.
class Rectangle {
  constructor(width, height) {
    this.width = width; // or this._width = width
    this.height = height; // or this._height = height
  }
  get width() {
    return this._width;
  }
  set width(width) {
    this._width = width;
  }
  get height() {
    return this._height;
  }
  set height(height) {
    this._height = height;
  }
  get area() {
    return this._width * this._height;
  }
}
var r = new Rectangle(50, 20);
r.area === 1000;

//* -es5
var Rectangle = function (width, height) {
  this._width  = width;
  this._height = height;
};
Rectangle.prototype = {
  set width  (width)  { this._width = width;               },
  get width  ()       { return this._width;                },
  set height (height) { this._height = height;             },
  get height ()       { return this._height;               },
  get area   ()       { return this._width * this._height; }
};
var r = new Rectangle(50, 20);
r.area === 1000;

// 6. Class Inheritance, From Experssions
// Support for mixin-style inheritance by extending from expressions yielding function objects.
//?  [Notice: the generic aggregation function is usually provided by a library like this one, of course]

//-es6
var aggregation = (baseClass, ...mixins) => {
  let base = class _Combined extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        mixin.prototype.initializer.call(this);
      });
    }
  };
  let copyProps = (target, source) => {
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (
          prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          return;
        Object.defineProperty(
          target,
          prop,
          Object.getOwnPropertyDescriptor(source, prop)
        );
      });
  };
  mixins.forEach((mixin) => {
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

class Colored {
  initializer() {
    this._color = "white";
  }
  get color() {
    return this._color;
  }
  set color(v) {
    this._color = v;
  }
}

class ZCoord {
  initializer() {
    this._z = 0;
  }
  get z() {
    return this._z;
  }
  set z(v) {
    this._z = v;
  }
}

class Shape {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  get x() {
    return this._x;
  }
  set x(v) {
    this._x = v;
  }
  get y() {
    return this._y;
  }
  set y(v) {
    this._y = v;
  }
}

class Rectangle extends aggregation(Shape, Colored, ZCoord) {}

let rect = new Rectangle(7, 42);
rect.z = 1000;
rect.color = "red";
console.log(rect.x, rect.y, rect.z, rect.color);

// -es5
var aggregation = function (baseClass, mixins) {
  var base = function () {
    baseClass.apply(this, arguments);
    mixins.forEach(
      function (mixin) {
        mixin.prototype.initializer.call(this);
      }.bind(this)
    );
  };
  base.prototype = Object.create(baseClass.prototype);
  base.prototype.constructor = base;
  var copyProps = function (target, source) {
    Object.getOwnPropertyNames(source).forEach(function (prop) {
      if (
        prop.match(
          /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
        )
      )
        return;
      Object.defineProperty(
        target,
        prop,
        Object.getOwnPropertyDescriptor(source, prop)
      );
    });
  };
  mixins.forEach(function (mixin) {
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

var Colored = function () {};
Colored.prototype = {
  initializer: function () {
    this._color = "white";
  },
  getColor: function () {
    return this._color;
  },
  setColor: function (v) {
    this._color = v;
  },
};

var ZCoord = function () {};
ZCoord.prototype = {
  initializer: function () {
    this._z = 0;
  },
  getZ: function () {
    return this._z;
  },
  setZ: function (v) {
    this._z = v;
  },
};

var Shape = function (x, y) {
  this._x = x;
  this._y = y;
};
Shape.prototype = {
  getX: function () {
    return this._x;
  },
  setX: function (v) {
    this._x = v;
  },
  getY: function () {
    return this._y;
  },
  setY: function (v) {
    this._y = v;
  },
};

var _Combined = aggregation(Shape, [Colored, ZCoord]);
var Rectangle = function (x, y) {
  _Combined.call(this, x, y);
};
Rectangle.prototype = Object.create(_Combined.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle(7, 42);
rect.setZ(1000);
rect.setColor("red");
console.log(rect.getX(), rect.getY(), rect.getZ(), rect.getColor());
