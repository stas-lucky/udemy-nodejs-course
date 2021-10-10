//console.log(arguments);
//console.log(require("module").wrapper);

//exports.add = (a, b) => a + b;
//module.exports = () => console.log("Module export func");

// class Calculator {
//   add(a, b) {
//     return a + b;
//   }

//   subtruct(a, b) {
//     return a - b;
//   }
// }

//module.exports = Calculator;

module.exports = class {
  add(a, b) {
    return a + b;
  }

  subtruct(a, b) {
    return a - b;
  }
};
