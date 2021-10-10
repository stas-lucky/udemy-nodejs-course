// module.exports

const Calc = require("./test-module-1");
const calc1 = new Calc();
console.log(calc1.add(1, 2));
console.log(calc1.subtruct(1, 2));

// exports
//const calc2 = require("./test-module-2");
const { add, subtruct } = require("./test-module-2");
console.log(add(3, 4));
console.log(subtruct(10, 5));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
